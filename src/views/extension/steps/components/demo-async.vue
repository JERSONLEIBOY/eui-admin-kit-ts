<template>
  <eui-card header="异步加载数据（自有扩展）">
    <div
      style="margin-bottom: 28px; display: flex; align-items: center; gap: 8px"
    >
      <el-button :loading="loading" @click="reload">重新加载</el-button>
      <span style="font-size: 13px; color: var(--el-text-color-secondary)">
        items 传入返回 Promise 的函数，组件挂载时自动加载，可调用 reloadOptions
        重新拉取
      </span>
    </div>
    <eui-steps
      ref="stepsRef"
      :active="2"
      finish-status="success"
      :items="loadItems"
    />
  </eui-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const stepsRef = ref();
  const loading = ref(false);

  /** 模拟异步拉取步骤数据 */
  const loadItems = () => {
    loading.value = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        loading.value = false;
        resolve([
          { title: '提交申请', description: '已提交' },
          { title: '部门审核', description: '已通过' },
          { title: '财务打款', description: '处理中' },
          { title: '完成', description: '待完成' }
        ]);
      }, 600);
    });
  };

  /** 重新加载 */
  const reload = () => {
    stepsRef.value?.reloadOptions?.();
  };
</script>
