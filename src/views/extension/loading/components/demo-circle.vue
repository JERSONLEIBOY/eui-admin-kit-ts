<script setup lang="ts">
  import { ref, computed } from 'vue';

  const customSvg = ref(false);
  const background = ref('');
  const loadingKey = ref(0);

  const spinner = computed(() => {
    if (!customSvg.value) return undefined;
    return `<circle cx="25" cy="25" r="16" stroke="#e0e0e0" stroke-width="3" fill="none"/>
  <circle cx="25" cy="25" r="16" stroke="#4f46e5" stroke-width="3" fill="none"
          stroke-dasharray="75" stroke-dashoffset="52"
          stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate"
                      from="0 25 25" to="360 25 25" dur="1.2s" repeatCount="indefinite"/>
  </circle>`;
  });

  const refresh = () => loadingKey.value++;
</script>

<template>
  <eui-card header="圆圈模式与自定义 spinner">
    <div class="demo-row">
      <span class="demo-label">自定义 SVG：</span>
      <el-switch v-model="customSvg" size="small" @change="refresh" />
    </div>
    <div class="demo-row">
      <span class="demo-label">背景颜色：</span>
      <el-color-picker v-model="background" show-alpha @change="refresh" />
    </div>
    <eui-loading
      :key="loadingKey"
      :loading="true"
      type="circle"
      text="circle 模式"
      :spinner="spinner"
      :background="background || undefined"
      style="padding: 20px 16px; max-width: 520px; position: relative"
    >
      <div style="font-size: 17px">Alert message title</div>
      <div style="word-break: break-all; margin-top: 4px">
        <span
          >circle 模式底层走 element-plus v-loading，可通过 spinner / background
          进一步定制。</span
        >
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
