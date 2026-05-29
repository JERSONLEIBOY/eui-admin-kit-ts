<!-- 全局页脚 -->
<template>
  <eui-text
    type="placeholder"
    class="eui-footer"
    style="padding: 16px 0; text-align: center"
  >
    <el-space
      :size="24"
      style="--el-text-color-regular: var(--el-text-color-placeholder)"
    >
      <el-link
        underline="never"
        href="https://github.com/JERSONLEIBOY"
        target="_blank"
      >
        {{ t('layout.footer.website') }}
      </el-link>
      <el-link
        underline="never"
        href="https://github.com/JERSONLEIBOY/express-mongodb-backend-api"
        target="_blank"
      >
        {{ t('layout.footer.document') }}
      </el-link>
    </el-space>
    <div style="margin-top: 8px">
      {{ t('layout.footer.copyright') }}
    </div>
  </eui-text>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>
