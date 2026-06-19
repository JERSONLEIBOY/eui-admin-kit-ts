<script setup lang="ts">
  import { ref } from 'vue';
  import type { LoadingSize } from 'eui-admin-kit/es/Loading/types';

  const plain = ref(true);
  const size = ref<LoadingSize>('default');
</script>

<template>
  <eui-card header="纯加载器模式">
    <div class="demo-row">
      <span class="demo-label">plain：</span>
      <el-switch
        v-model="plain"
        size="small"
        active-text="独立小图标"
        inactive-text="容器模式"
      />
    </div>
    <div class="demo-row">
      <span class="demo-label">尺寸：</span>
      <el-radio-group v-model="size">
        <el-radio value="small" label="小型" />
        <el-radio value="default" label="默认" />
        <el-radio value="large" label="大型" />
      </el-radio-group>
    </div>
    <div class="plain-box">
      <eui-loading
        :plain="plain"
        :loading="true"
        :size="size"
        :spinner-style="{
          position: 'static',
          background: 'transparent',
          width: '40px',
          height: '40px'
        }"
      />
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
  .plain-box {
    padding: 16px;
    border: 1px dashed var(--el-border-color);
    border-radius: 4px;
    display: inline-block;
  }
</style>
