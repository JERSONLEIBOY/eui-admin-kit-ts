#!/bin/bash

# 优化的部署脚本 - 带详细日志输出

set -e

echo "=========================================="
echo "开始部署 - $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="

cd ~/eui-admin-kit

# 1. 拉取最新代码
echo -e "\n📥 [1/5] 拉取最新代码..."
git pull origin main

# 2. 显示 Docker 信息
echo -e "\n🔍 [2/5] Docker 环境信息:"
docker version | grep Version || true
echo "BuildKit 状态: ${DOCKER_BUILDKIT:-未设置}"

# 3. 构建镜像（显示详细进度）
echo -e "\n🔨 [3/5] 开始构建 Docker 镜像..."
echo "构建开始时间: $(date '+%H:%M:%S')"

# 使用 --progress=plain 显示详细输出
DOCKER_BUILDKIT=1 docker build \
  --progress=plain \
  --no-cache \
  -t eui-admin-kit:latest . 2>&1 | tee /tmp/build.log

BUILD_EXIT_CODE=${PIPEFAIL[0]:-$?}
echo "构建结束时间: $(date '+%H:%M:%S')"
echo "构建退出码: $BUILD_EXIT_CODE"

if [ $BUILD_EXIT_CODE -ne 0 ]; then
    echo "❌ 构建失败，退出"
    exit 1
fi

# 4. 重启容器
echo -e "\n🚀 [4/5] 重启容器..."
docker-compose down
docker-compose up -d

# 5. 清理
echo -e "\n🧹 [5/5] 清理旧镜像..."
docker image prune -f

# 6. 显示状态
echo -e "\n=========================================="
echo "✅ 部署完成 - $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="
docker-compose ps

echo -e "\n📊 镜像信息:"
docker images | grep eui-admin-kit

echo -e "\n完整构建日志: /tmp/build.log"
