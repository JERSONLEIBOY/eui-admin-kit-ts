<script setup lang="ts">
  import { User } from '@element-plus/icons-vue';
</script>

<template>
  <eui-card header="文本组件">
    <div class="demo-grid">
      <!-- 类型 + icon（与上游一致） -->
      <EuiText :icon="User">常规文本</EuiText>
      <EuiText type="secondary" :icon="User">二级文本</EuiText>
      <EuiText type="placeholder" :icon="User">提示文本</EuiText>
      <EuiText type="heading" :icon="User">标题文本</EuiText>
      <EuiText type="primary" :icon="User">主色文本</EuiText>
      <EuiText type="success" :icon="User">成功文本</EuiText>
      <EuiText type="warning" :icon="User">警告文本</EuiText>
      <EuiText type="danger" :icon="User">危险文本</EuiText>
      <EuiText type="info" :icon="User">信息文本</EuiText>

      <!-- 装饰 -->
      <EuiText deleted>删除线</EuiText>
      <EuiText underline>下划线</EuiText>
      <EuiText deleted underline>删除线&下划线</EuiText>

      <!-- 字重/字形 -->
      <EuiText strong>加粗文本</EuiText>
      <EuiText italic>斜体文本</EuiText>

      <!-- 尺寸 -->
      <EuiText size="xs">超小型文本</EuiText>
      <EuiText size="sm">小型文本</EuiText>
      <EuiText>常规文本</EuiText>
      <EuiText size="md">中型文本</EuiText>
      <EuiText size="lg">大型文本</EuiText>
      <EuiText size="xl">特大型文本</EuiText>
      <EuiText size="xxl">超大型文本</EuiText>
    </div>
  </eui-card>
</template>

<style scoped>
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px 24px;
  }
</style>
