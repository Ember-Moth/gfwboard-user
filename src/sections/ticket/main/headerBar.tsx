import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Grid, IconButton, Menu, MenuItem, Skeleton, Stack, Typography } from "@mui/material";

// project imports
import { TicketLevelMap } from "@/model/ticket";
import { useTicketContext } from "@/sections/ticket/context";
import { makeStyles } from "@/themes/hooks";

// assets
import { DownloadOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MoreOutlined } from "@ant-design/icons";

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  infoMenu: {
    padding: 0,
    "& .MuiMenu-list": {
      padding: 0
    }
  }
}));

const HeaderBar: React.FC = () => {
  const { t } = useTranslation();
  const {
    drawerOpen,
    drawerActions: { toggle: toggleDrawer },
    currentId,
    ticketQuery: { data, isFetching }
  } = useTicketContext();

  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const { classes } = useStyles();

  return (
    <Grid container justifyContent="space-between" className={classes.root}>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => toggleDrawer()} color="secondary" size="large">
            {drawerOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </IconButton>
          <Stack>
            <Typography variant="subtitle1">
              {data && !isFetching ? (
                t("ticket.header.title", {
                  id: data.id,
                  subject: data.subject
                })
              ) : (
                <Skeleton variant={"text"} width={200} />
              )}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {data && !isFetching ? (
                t("ticket.header.ticket_level", {
                  context: TicketLevelMap[data.level]
                })
              ) : (
                <Skeleton variant={"text"} width={80} />
              )}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
          <IconButton
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
            size="large"
            color="secondary"
          >
            <MoreOutlined />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            className={classes.infoMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              <DownloadOutlined style={{ paddingRight: 8 }} />
              <Typography>Archive</Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HeaderBar;
