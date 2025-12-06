# Vercel 部署指南

本项目已优化并配置好，可以直接部署到 Vercel。

## 部署步骤

### 方法一：通过 Vercel CLI

1. 安装 Vercel CLI（如果尚未安装）：
```bash
npm i -g vercel
```

2. 在项目根目录运行：
```bash
vercel
```

3. 按照提示完成部署配置

### 方法二：通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. Vercel 会自动检测项目配置并部署

### 方法三：通过 Vercel Dashboard

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择 "Import Git Repository" 或直接上传项目
4. 配置项目设置（通常会自动检测）
5. 点击 "Deploy"

## 项目配置

项目已包含以下配置文件：

- `vercel.json` - Vercel 部署配置
- 优化的项目结构（组件分离）
- 更新的 `.gitignore` 文件

## 构建配置

- **构建命令**: `npm run build`
- **输出目录**: `build`
- **开发命令**: `npm start`
- **框架**: Create React App

## 环境变量

如果项目需要环境变量，可以在 Vercel Dashboard 的项目设置中添加。

## 注意事项

1. 确保所有依赖都已正确安装
2. 确保 `package.json` 中的构建脚本正确
3. 静态资源（图片等）应放在 `public` 目录下
4. 项目会自动处理客户端路由（通过 `vercel.json` 中的 rewrites 配置）

## 故障排除

如果部署遇到问题：

1. 检查构建日志中的错误信息
2. 确保 Node.js 版本兼容（建议使用 Node.js 18+）
3. 检查 `package.json` 中的依赖版本
4. 查看 Vercel 的构建日志获取详细错误信息

