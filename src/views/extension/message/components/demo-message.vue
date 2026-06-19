<script setup lang="ts">
  import { ref } from 'vue';
  import { useMessage, useMessageBox, random } from 'eui-admin-kit/es';

  const message = useMessage();
  const messageBox = useMessageBox();

  const theme = ref(0);
  const inner = ref(false);

  const themeOptions = [
    { label: '默认', value: 0 },
    { label: '简约', value: 1 },
    { label: '多彩', value: 2 },
    { label: '多彩简约', value: 3 }
  ];

  const showMessage = (type: 'success' | 'warning' | 'error' | 'info') => {
    const messages = {
      success: '这是一条成功的提示',
      warning: '这是一条警告的提示',
      error: '这是一条错误的提示',
      info: '这是一条普通的提示'
    };
    message({
      type,
      message: messages[type],
      plain: theme.value === 1,
      original: theme.value === 3 ? 'plain' : theme.value === 2,
      inner: inner.value,
      showClose: true
    });
  };

  const showLoading = (mask?: boolean, centered?: boolean) => {
    const loading = message.loading({
      message: '正在加载中..',
      plain: theme.value === 1,
      original: theme.value === 3 ? 'plain' : theme.value === 2,
      inner: inner.value,
      showClose: true,
      mask,
      centered
    });
    setTimeout(() => loading.close(), 3000);
  };

  const progress = ref(0);

  const showReactiveLoading = () => {
    progress.value = 0;
    const loading = message.loading({
      message: () =>
        `正在导入用户......${String(progress.value).padStart(2, '0')}%` as any,
      plain: true,
      inner: inner.value,
      mask: true,
      centered: true
    });
    const timer = setInterval(() => {
      const num = progress.value + random(0, 5);
      progress.value = num > 100 ? 100 : num;
      if (progress.value === 100) {
        loading.close();
        clearInterval(timer);
        messageBox
          .alert(
            '导入完成，共新增 80 条数据，更新 20 条数据，失败 0 条数据。',
            '导入成功',
            {
              type: 'success',
              confirmButtonText: '完成',
              inner: inner.value,
              draggable: true
            }
          )
          .catch(() => {});
      }
    }, 100);
  };
</script>

<template>
  <eui-card header="消息提示">
    <div class="demo-row">
      <span class="demo-label">风格：</span>
      <el-radio-group v-model="theme">
        <el-radio-button
          v-for="o in themeOptions"
          :key="o.value"
          :value="o.value"
          :label="o.label"
        />
      </el-radio-group>
    </div>
    <div class="demo-row">
      <span class="demo-label">限制在主体区域：</span>
      <el-switch v-model="inner" size="small" />
    </div>
    <div class="demo-row">
      <span class="demo-label">类型：</span>
      <el-button @click="showMessage('success')">成功</el-button>
      <el-button @click="showMessage('warning')">警告</el-button>
      <el-button @click="showMessage('error')">错误</el-button>
      <el-button @click="showMessage('info')">信息</el-button>
    </div>
    <div class="demo-row">
      <span class="demo-label">加载：</span>
      <el-button @click="showLoading()">打开</el-button>
      <el-button @click="showLoading(true)">带遮罩层</el-button>
      <el-button @click="showLoading(true, true)">居中显示</el-button>
    </div>
    <div class="demo-row">
      <span class="demo-label">响应式：</span>
      <el-button @click="showReactiveLoading">打开加载框</el-button>
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
