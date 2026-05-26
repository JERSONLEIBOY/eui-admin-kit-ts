<!-- 国际化语言切换 -->
<template>
  <eui-dropdown
    :items="[
      { title: '简体中文', command: 'zh_CN' },
      { title: '繁體中文', command: 'zh_TW' },
      { title: 'English', command: 'en' }
    ]"
    :model-value="locale"
    :placement="placement"
    :menu-style="{ minWidth: '108px' }"
    :popper-options="{
      modifiers: [{ name: 'offset', options: { offset: [0, 5] } }]
    }"
    style="line-height: inherit"
    @command="changeLanguage"
  >
    <div
      :style="{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        outline: 'none'
      }"
    >
      <slot>
        <el-icon>
          <GlobalOutlined :style="iconStyle" />
        </el-icon>
      </slot>
    </div>
  </eui-dropdown>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { ElTooltipProps } from 'element-plus';
  import { GlobalOutlined } from '@/components/icons';
  import { setCacheLang } from '@/i18n/use-locale';

  withDefaults(
    defineProps<{
      /** placement */
      placement?: ElTooltipProps['placement'];
      /** 自定义样式 */
      iconStyle?: CSSProperties;
    }>(),
    {
      placement: 'bottom'
    }
  );

  const { locale } = useI18n();

  /** 切换语言 */
  const changeLanguage = (command: string) => {
    locale.value = command;
    setCacheLang(command);
  };
</script>
