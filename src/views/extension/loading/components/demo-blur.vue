<script setup lang="ts">
  import { ref } from 'vue';

  const blur = ref(true);
</script>

<template>
  <eui-card header="背景模糊">
    <div class="demo-row">
      <span class="demo-label">blur：</span>
      <el-switch v-model="blur" size="small" />
    </div>
    <eui-loading
      :loading="true"
      :blur="blur"
      text="正在加载"
      style="padding: 20px 16px; max-width: 520px; position: relative"
    >
      <div style="font-size: 17px">Alert message title</div>
      <div style="word-break: break-all; margin-top: 4px">
        <span
          >开启后蒙层背后内容会被虚化（依赖浏览器 backdrop-filter 支持）。</span
        >
        <span>Further details about the context of this alert.</span>
        <span>Further details about the context of this alert.</span>
        <span>Further details about the context of this alert.</span>
      </div>
    </eui-loading>
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
