## 介绍

这是一个几乎完全兼容 V2Board API 的前端，相比原版 v2board-user 前端提供了更多的功能和自定义选项。  
我们使用 React + Redux + Material UI 构建了该项目，没有使用 `antd` 包，但遵循 Ant Design 的风格。  
作为一家主要面向中国大陆用户的服务提供商，我们需要尽可能使前端符合中国用户的使用习惯。

## 警告

本项目**不允许**删除任何版权声明，包括但不限于：

1. 页脚左侧的版权标志及其链接。
2. `index.html` 文件中的 `<meta name="copyright">` 和 `<meta name="author">` 标签。
3. 其他隐藏在页面中的版权声明。

如果我们发现您的网站直接或间接使用了我们的源代码，但篡改或删除了版权信息，我们将采取相应措施。

## 开发

首先，你需要注意：根据 AGPL-3.0 许可协议，只要你修改了我们的代码，无论你是发布该代码还是仅用于提供服务，你都需要开源你的代码。  
我们的开源行为是为了构建一个更好的开源生态系统。如果你不能尊重并遵守开源社区的规则，请不要使用我们的代码。  
如果你非法使用我们的代码，我们将积极收集证据，并对你及你的公司提起诉讼。

1. 安装
   - fork 本仓库，然后克隆到你的电脑。
   - 下载 pnpm。(https://pnpm.io/installation)
   - 在项目目录下运行 `pnpm install`。
2. 开发流程
   - 启动开发服务器，运行 `pnpm start`
   - 访问 http://localhost:3000 进行开发
3. 部署流程
   - 通过 `git commit` 和 `git push` 提交代码到 GitHub
   - 运行 `pnpm run build` 生成生产环境版本
   - 将 `dist` 目录中的文件上传到你的服务器
   - 访问 http://yourdomain.com 进入生产环境

## 部署

### Vercel

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FEmber-Moth%2Fgfwboard-user)

### 静态托管

1. 运行 `pnpm run build` 生成生产环境版本。
2. 将 `dist` 目录中的文件上传到你的服务器。
3. 访问 http://yourdomain.com 进入生产环境。

## 许可证扫描

[![FOSSA 状态](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAH-dark%2Fgfwboard-user.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FAH-dark%2Fgfwboard-user?ref=badge_large)
