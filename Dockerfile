# 使用腾讯云镜像加速
FROM ccr.ccs.tencentyun.com/library/node:22-alpine AS builder
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 使用 npm ci 替代 npm install，更快且更可靠
# 使用构建缓存挂载加速依赖安装
# 使用淘宝镜像源加速国内下载
RUN --mount=type=cache,target=/root/.npm \
    npm ci --registry=https://registry.npmmirror.com --prefer-offline --no-audit

# 复制源码
COPY . .

# 构建项目
RUN npm run build

# 生产镜像 - 使用腾讯云镜像加速
FROM ccr.ccs.tencentyun.com/library/nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
