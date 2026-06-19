<script setup lang="ts">
  import { Loading as LoadingIcon } from '@element-plus/icons-vue';
</script>

<template>
  <eui-card header="自定义 spinner 插槽">
    <eui-loading
      :loading="true"
      text="正在拉取数据"
      style="padding: 20px 16px; max-width: 520px; position: relative"
    >
      <template #spinner>
        <div class="custom-spinner">
          <el-icon :size="32" class="is-loading">
            <LoadingIcon />
          </el-icon>
          <span>自定义图标</span>
        </div>
      </template>
      <div style="font-size: 17px">Alert message title</div>
      <div style="word-break: break-all; margin-top: 4px">
        <span>使用 #spinner 插槽替换默认 dot 风格的加载动画。</span>
      </div>
    </eui-loading>
  </eui-card>
</template>

<style scoped>
  .custom-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: var(--el-color-primary);
    font-size: 13px;
  }
</style>
