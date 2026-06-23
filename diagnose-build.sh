#!/bin/bash

# 诊断脚本：查看服务器上 Docker 构建的详细情况

echo "=========================================="
echo "检查服务器 Docker 构建状态"
echo "=========================================="

# 1. 检查是否有正在运行的 docker build 进程
echo -e "\n1. 正在运行的 docker build 进程："
ps aux | grep "docker build" | grep -v grep || echo "没有找到"

# 2. 查看 Docker 构建历史
echo -e "\n2. 最近的 Docker 构建："
docker images | head -10

# 3. 检查 BuildKit 是否真正启用
echo -e "\n3. Docker 版本和 BuildKit 状态："
docker version --format '{{.Server.Version}}'
docker buildx version 2>/dev/null || echo "BuildKit 可能未安装"

# 4. 测试构建并显示详细日志（如果没有正在构建）
echo -e "\n4. 执行测试构建（显示详细日志）："
cd ~/eui-admin-kit || exit 1

# 使用 --progress=plain 显示详细输出
DOCKER_BUILDKIT=1 docker build --progress=plain -t eui-admin-kit:test . 2>&1 | tee /tmp/docker-build.log

echo -e "\n完整日志已保存到: /tmp/docker-build.log"
