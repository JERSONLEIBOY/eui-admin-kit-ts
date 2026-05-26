<!-- 图标选择下拉框 -->
<template>
  <eui-icon-select
    clearable
    filterable="popper"
    :data="iconData"
    :model-value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :popper-width="420"
    :popper-height="294"
    :grid-style="{ gridTemplateColumns: 'repeat(6, 1fr)' }"
    :item-style="{ height: '52px' }"
    :popper-options="{ strategy: 'fixed' }"
    @update:modelValue="updateValue"
  >
    <template #icon="{ icon }">
      <el-icon>
        <component :is="icon" />
      </el-icon>
    </template>
  </eui-icon-select>
</template>

<script lang="ts" setup>
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  withDefaults(
    defineProps<{
      /** 选中的图标 */
      modelValue?: string;
      /** 是否禁用 */
      disabled?: boolean;
      /** 提示信息 */
      placeholder?: string;
    }>(),
    {
      placeholder: '请选择菜单图标'
    }
  );

  /** 更新选中数据 */
  const updateValue = (value: string) => {
    emit('update:modelValue', value);
  };
</script>

<script lang="ts">
  import * as MenuIcons from '@/layout/menu-icons';

  export default {
    components: MenuIcons,
    data() {
      const iconNames = Object.keys(MenuIcons);
      return {
        iconData: [
          {
            title: '线框风格',
            icons: iconNames.filter((name) => !name.endsWith('Filled'))
          },
          {
            title: '实底风格',
            icons: iconNames.filter((name) => name.endsWith('Filled'))
          }
        ]
      };
    }
  };
</script>
