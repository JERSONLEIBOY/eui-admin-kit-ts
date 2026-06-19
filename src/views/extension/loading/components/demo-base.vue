<script setup lang="ts">
  import { ref } from 'vue';
  import type {
    LoadingSize,
    LoadingType
  } from 'eui-admin-kit/es/Loading/types';

  const loading = ref(false);
  const loadingSize = ref<LoadingSize>('default');
  const loadingType = ref<LoadingType>('dot');
  const loadingText = ref('');
  const loadingKey = ref(0);

  const onLoadingTextChange = () => {
    if (loadingType.value === 'circle' && loading.value) {
      loadingKey.value++;
    }
  };
</script>

<template>
  <eui-card header="基础用法">
    <div class="demo-row">
      <span class="demo-label">状态：</span>
      <el-switch v-model="loading" size="small" />
    </div>
    <div class="demo-row">
      <span class="demo-label">尺寸：</span>
      <el-radio-group
        v-model="loadingSize"
        :disabled="loadingType === 'circle'"
      >
        <el-radio value="small" label="小型" />
        <el-radio value="default" label="默认" />
        <el-radio value="large" label="大型" />
      </el-radio-group>
    </div>
    <div class="demo-row">
      <span class="demo-label">文本：</span>
      <el-radio-group v-model="loadingText" @change="onLoadingTextChange">
        <el-radio value="" label="不显示" />
        <el-radio value="Loading..." label="显示" />
      </el-radio-group>
    </div>
    <div class="demo-row">
      <span class="demo-label">类型：</span>
      <el-radio-group v-model="loadingType">
        <el-radio value="dot" label="圆点" />
        <el-radio value="circle" label="圆圈" />
      </el-radio-group>
    </div>
    <eui-loading
      :key="loadingKey"
      :loading="loading"
      :size="loadingSize"
      :type="loadingType"
      :text="loadingText"
      style="padding: 20px 16px; max-width: 520px; position: relative"
    >
      <div style="font-size: 17px">Alert message title</div>
      <div style="word-break: break-all; margin-top: 4px">
        <span>Further details about the context of this alert.</span>
        <span>Further details about the context of this alert.</span>
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
