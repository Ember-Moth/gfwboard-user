import React, { useMemo } from "react";
import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useShopContext } from "@/sections/subscription/buyPage/context";
import { useGetPlanListQuery } from "@/store/services/api";
import MainCard from "@/components/MainCard";
import Plan from "@/model/plan";
import lo from "lodash-es";
import { useTranslation } from "react-i18next";
import MuiMarkdown from "mui-markdown";
import { Masonry } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { getFirstPayment, getMode, getPrice, PaymentPeriod, PlanType } from "@/types/plan";

const ProductCardSkeleton: React.FC = () => {
  return (
    <MainCard title={<Skeleton variant={"text"} width={200} />}>
      <Skeleton variant={"rectangular"} width={"100%"} height={100} />
      <Skeleton variant={"text"} width={200} />
      <Skeleton variant={"text"} width={160} />
      <Skeleton variant={"text"} width={160} />
      <Skeleton variant={"text"} width={200} />
    </MainCard>
  );
};

const ProductCard: React.FC<{
  product: Plan;
}> = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const price = useMemo<{
    price: number;
    mode: string;
  }>(() => {
    const payment = getFirstPayment(product);
    if (!payment) {
      return {
        price: 0,
        mode: "null"
      };
    }

    const mode = t("subscription.product-card.price-mode", {
      context: payment
    }).toString();
    const price = getPrice(product, payment);

    return {
      price,
      mode
    };
  }, []);

  return (
    <MainCard
      title={product.name}
      secondary={
        <Typography variant={"caption"} color={"textSecondary"}>
          {t("subscription.product-card.price-mode", {
            context: price.mode,
            defaultValue: price.mode
          }).toString()}
        </Typography>
      }
    >
      <Stack direction={"column"} spacing={2}>
        <Typography variant={"h3"} component={"h2"} color={"textPrimary"}>
          {"￥ " + lo.ceil(price.price / 100, 2).toFixed(2)}
        </Typography>
        <MuiMarkdown>{product.content}</MuiMarkdown>
        <Button
          variant={"contained"}
          color={"primary"}
          href={`/subscription/buy/${product.id}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/subscription/buy/${product.id}`);
          }}
        >
          {t("subscription.product-card.buy-button").toString()}
        </Button>
      </Stack>
    </MainCard>
  );
};

const Products: React.FC = () => {
  const { drawerOpen, keyword, planType, paymentAllow } = useShopContext();
  const { data, isLoading } = useGetPlanListQuery();

  const products = useMemo(
    () =>
      data
        ?.filter((datum) => datum.show === 1)
        .filter((datum) => datum.name.includes(keyword) || datum.content.includes(keyword))
        .filter((datum) => {
          if (planType.has(PlanType.PERIOD)) {
            if (
              lo.isNumber(
                datum.month_price ||
                  datum.year_price ||
                  datum.quarter_price ||
                  datum.half_year_price ||
                  datum.two_year_price ||
                  datum.three_year_price
              )
            ) {
              return true;
            }
          }

          if (planType.has(PlanType.TRAFFIC)) {
            if (lo.isNumber(datum.onetime_price)) {
              return true;
            }
          }

          return false;
        })
        .filter(
          (datum) =>
            new Set(
              Array.from<PaymentPeriod>(Object.keys(getMode(datum)) as PaymentPeriod[]).filter((x) =>
                paymentAllow.has(x)
              )
            ).size > 0
        ) || [],
    [data, keyword, planType, paymentAllow]
  );

  return (
    <>
      {isLoading ||
        (products.length !== 0 && (
          <Masonry
            spacing={2}
            columns={{
              xs: 1,
              sm: drawerOpen ? 1 : 2,
              md: drawerOpen ? 2 : 3,
              lg: drawerOpen ? 3 : 4
            }}
          >
            {isLoading && Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)}
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </Masonry>
        ))}
      {!isLoading && products.length === 0 && (
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          my={4}
        >
          <Typography component={"span"} variant={"h4"} color={"textSecondary"}>
            No Product Found
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Products;
