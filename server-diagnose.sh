#!/bin/bash

# 完整的服务器诊断和优化脚本
# 使用方法：在服务器上执行 bash server-diagnose.sh

set -e

echo "============================================"
echo "服务器 Docker 部署诊断工具"
echo "============================================"
echo ""

# 1. 基础环境检查
echo "【1/8】基础环境信息"
echo "-------------------------------------------"
echo "系统: $(uname -a)"
echo "时间: $(date)"
echo "磁盘: $(df -h / | tail -1)"
echo "内存: $(free -h | grep Mem)"
echo ""

# 2. Docker 版本检查
echo "【2/8】Docker 版本信息"
echo "-------------------------------------------"
docker --version
docker version | grep -E "Version|API version" || true
echo ""

# 3. Docker Compose 版本
echo "【3/8】Docker Compose 版本"
echo "-------------------------------------------"
docker-compose --version
echo ""

# 4. BuildKit 支持检查
echo "【4/8】BuildKit 支持检查"
echo "-------------------------------------------"
docker buildx version 2>&1 || echo "BuildKit 插件未安装"
echo "当前 DOCKER_BUILDKIT: ${DOCKER_BUILDKIT:-未设置}"
echo ""

# 5. Docker daemon 配置
echo "【5/8】Docker Daemon 配置"
echo "-------------------------------------------"
if [ -f /etc/docker/daemon.json ]; then
    cat /etc/docker/daemon.json
else
    echo "配置文件不存在"
fi
echo ""

# 6. 网络连接测试
echo "【6/8】网络连接测试"
echo "-------------------------------------------"
echo "测试腾讯云镜像源:"
timeout 5 curl -I https://ccr.ccs.tencentyun.com 2>&1 | head -5 || echo "无法连接"
echo ""
echo "测试淘宝 npm 镜像:"
timeout 5 curl -I https://registry.npmmirror.com 2>&1 | head -5 || echo "无法连接"
echo ""

# 7. 当前项目状态
echo "【7/8】项目状态"
echo "-------------------------------------------"
cd ~/eui-admin-kit 2>/dev/null || { echo "项目目录不存在"; exit 1; }
echo "当前分支: $(git branch --show-current)"
echo "最新提交: $(git log -1 --oneline)"
echo "工作目录状态:"
git status --short
echo ""

# 8. 测试构建（显示详细日志）
echo "【8/8】测试 Docker 构建"
echo "-------------------------------------------"
echo "开始时间: $(date '+%H:%M:%S')"
echo ""

# 测试构建并保存日志
DOCKER_BUILDKIT=1 docker build \
  --progress=plain \
  --no-cache \
  -t eui-admin-kit:test . 2>&1 | tee /tmp/docker-build-diagnose.log

BUILD_EXIT=$?

echo ""
echo "结束时间: $(date '+%H:%M:%S')"
echo "构建退出码: $BUILD_EXIT"
echo ""

# 总结
echo "============================================"
echo "诊断完成"
echo "============================================"
echo "完整构建日志: /tmp/docker-build-diagnose.log"
echo ""

if [ $BUILD_EXIT -eq 0 ]; then
    echo "✅ 构建成功！"
    echo ""
    echo "如果构建很慢，检查日志中的这些阶段："
    echo "  - 拉取镜像时间"
    echo "  - npm ci 安装时间"
    echo "  - npm run build 编译时间"
else
    echo "❌ 构建失败，请查看上面的错误信息"
fi
