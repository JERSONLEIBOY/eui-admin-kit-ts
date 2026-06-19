<script setup lang="ts">
  import { ElNotification } from 'element-plus';
  import type { NotificationProps } from 'element-plus';

  const showNotification = (
    type?: NotificationProps['type'] | null,
    duration?: number | null,
    position?: NotificationProps['position'] | null
  ) => {
    ElNotification({
      title: 'Notification Title',
      message:
        'This is the content of the notification. This is the content of the notification.',
      type: type || undefined,
      duration: duration ?? 4500,
      position: position || 'top-right'
    });
  };
</script>

<template>
  <eui-card header="消息通知">
    <div class="demo-row">
      <span class="demo-label">使用：</span>
      <el-button @click="showNotification()">打开通知</el-button>
      <el-button @click="showNotification('success')">带图标</el-button>
      <el-button @click="showNotification('info', 0)">不自动关闭</el-button>
    </div>
    <div class="demo-row">
      <span class="demo-label">类型：</span>
      <el-button @click="showNotification('success')">成功</el-button>
      <el-button @click="showNotification('warning')">警告</el-button>
      <el-button @click="showNotification('error')">错误</el-button>
      <el-button @click="showNotification('info')">信息</el-button>
    </div>
    <div class="demo-row">
      <span class="demo-label">位置：</span>
      <el-button @click="showNotification('info', null, 'top-left')"
        >TopLeft</el-button
      >
      <el-button @click="showNotification('info', null, 'bottom-left')"
        >BottomLeft</el-button
      >
      <el-button @click="showNotification('info', null, 'bottom-right')"
        >BottomRight</el-button
      >
    </div>
  </eui-card>
</template>

<style scoped>
  .demo-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
  .demo-label {
    font-size: 13px;
    color: var(--el-text-color-secondary);
    white-space: nowrap;
  }
</style>
