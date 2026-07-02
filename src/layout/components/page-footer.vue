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
    <div v-if="record" style="margin-top: 8px">
      <el-space
        :size="24"
        style="--el-text-color-regular: var(--el-text-color-placeholder)"
      >
        <el-link
          underline="never"
          href="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          >{{ t('layout.footer.record') }}</el-link
        >
        <el-link
          underline="never"
          href="https://beian.mps.gov.cn/#/query/webSearch?code=35021102002672"
          target="_blank"
        >
          {{ t('layout.footer.recordLink') }}
        </el-link>
      </el-space>
    </div>
    <div v-else style="margin-top: 8px">
      {{ t('layout.footer.copyright') }}
    </div>
  </eui-text>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  // 是否显示备案号
  defineProps({
    record: {
      type: Boolean,
      default: false
    }
  });
</script>
