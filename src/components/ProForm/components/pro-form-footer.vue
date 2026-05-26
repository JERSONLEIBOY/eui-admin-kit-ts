<template>
  <ElFormItem v-bind="footerProps || {}">
    <template
      v-for="name in Object.keys(footerSlots || {}).filter(
        (k) =>
          k !== 'footer' &&
          !!(footerSlots && footerSlots[k] && $slots[footerSlots[k]])
      )"
      #[name]="slotProps"
    >
      <slot :name="footerSlots?.[name]" v-bind="slotProps || {}"></slot>
    </template>
    <div
      :style="{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        ...(footerStyle || {})
      }"
    >
      <slot name="footer">
        <ElButton
          type="primary"
          v-bind="submitButtonProps || {}"
          @click="submit"
        >
          {{ submitText }}
        </ElButton>
        <ElButton v-bind="resetButtonProps || {}" @click="reset">
          {{ resetText }}
        </ElButton>
      </slot>
      <slot name="footerExtra"></slot>
    </div>
  </ElFormItem>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from 'vue';
  import type { ElFormItemProps, ElButtonProps } from 'eui-admin-kit/es/App/el';

  defineProps<{
    /** 底栏ElFormItem属性 */
    footerProps?: ElFormItemProps;
    /** 底栏ElFormItem插槽 */
    footerSlots?: Record<string, string>;
    /** 底栏样式 */
    footerStyle?: CSSProperties;
    /** 提交按钮文本 */
    submitText?: string;
    /** 重置按钮文本 */
    resetText?: string;
    /** 提交按钮属性 */
    submitButtonProps?: ElButtonProps;
    /** 重置按钮属性 */
    resetButtonProps?: ElButtonProps;
  }>();

  const emit = defineEmits<{
    (e: 'submit'): void;
    (e: 'reset'): void;
  }>();

  /** 提交 */
  const submit = () => {
    emit('submit');
  };

  /** 重置 */
  const reset = () => {
    emit('reset');
  };
</script>
