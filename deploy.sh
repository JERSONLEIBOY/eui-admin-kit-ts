#!/bin/bash

# 前端项目自动化部署脚本
# 使用方法: ./deploy.sh

set -e  # 遇到错误立即退出

echo "=========================================="
echo "开始部署前端项目"
echo "=========================================="

# 进入项目目录
cd "$(dirname "$0")"

# 1. 拉取最新代码
echo "📥 拉取最新代码..."
git stash  # 暂存本地修改
git pull origin main
git stash pop || true  # 恢复本地修改，如果有冲突就跳过

# 2. 构建 Docker 镜像（使用 BuildKit 加速）
echo "🔨 构建 Docker 镜像..."
DOCKER_BUILDKIT=1 docker build -t eui-admin-kit:latest .

# 3. 停止并删除旧容器
echo "🛑 停止旧容器..."
docker-compose down || true

# 4. 启动新容器
echo "🚀 启动新容器..."
docker-compose up -d

# 5. 等待健康检查通过
echo "⏳ 等待服务启动..."
sleep 5

# 6. 检查容器状态
if docker ps | grep -q eui_admin_frontend; then
    echo "✅ 容器启动成功"
else
    echo "❌ 容器启动失败"
    docker-compose logs
    exit 1
fi

# 7. 清理悬空镜像
echo "🧹 清理悬空镜像..."
docker image prune -f

# 8. 显示容器状态
echo ""
echo "=========================================="
echo "✅ 部署完成！"
echo "=========================================="
docker-compose ps
echo ""
echo "查看日志: docker-compose logs -f"
echo "访问地址: http://localhost"
