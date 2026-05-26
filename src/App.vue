<template>
  <el-config-provider :locale="elLocale">
    <eui-config-provider
      :locale="euiLocale"
      :table="tableConfig"
      :map-key="MAP_KEY"
    >
      <eui-app>
        <router-view />
      </eui-app>
    </eui-config-provider>
  </el-config-provider>
</template>

<script setup lang="ts">
  import { MAP_KEY } from '@/config/setting';
  import { useGlobalConfig } from '@/config/use-global-config';
  import { useThemeStore } from '@/store/modules/theme';
  import { useLocale } from '@/i18n/use-locale';

  /** 组件全局配置 */
  const { tableConfig } = useGlobalConfig();

  /** 恢复缓存主题 */
  const themeStore = useThemeStore();
  themeStore.recoverTheme();

  /** 国际化配置 */
  const { elLocale, euiLocale } = useLocale();
</script>

<style scoped></style>
