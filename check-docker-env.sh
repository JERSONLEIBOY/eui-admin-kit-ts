#!/bin/bash

# Docker 环境诊断脚本

echo "=========================================="
echo "Docker 环境诊断"
echo "=========================================="

echo -e "\n1. Docker 版本："
docker --version
docker version

echo -e "\n2. Docker Compose 版本："
docker-compose --version

echo -e "\n3. BuildKit 支持检查："
docker buildx version 2>&1

echo -e "\n4. 当前 BuildKit 环境变量："
env | grep DOCKER || echo "未设置 DOCKER 相关环境变量"

echo -e "\n5. Docker daemon 配置："
cat /etc/docker/daemon.json 2>/dev/null || echo "配置文件不存在"

echo -e "\n6. 测试简单构建（不使用 BuildKit）："
cd /tmp
cat > Dockerfile.test <<'EOF'
FROM alpine:latest
RUN echo "测试构建成功"
EOF

echo "开始测试构建..."
time docker build -t test:latest -f Dockerfile.test . 2>&1

echo -e "\n7. 测试 BuildKit 构建："
echo "开始 BuildKit 测试..."
time DOCKER_BUILDKIT=1 docker build -t test:buildkit -f Dockerfile.test . 2>&1

rm -f Dockerfile.test

echo -e "\n=========================================="
echo "诊断完成"
echo "=========================================="
