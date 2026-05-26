<!-- 机构选择下拉框 -->
<template>
  <el-tree-select
    clearable
    filterable
    :data="data"
    check-strictly
    default-expand-all
    node-key="organizationId"
    :props="{ label: 'organizationName' }"
    :placeholder="placeholder"
    :model-value="modelValue"
    class="eui-fluid"
    :popper-options="{ strategy: 'fixed' }"
    @update:modelValue="updateValue"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { EuiMessage, toTree } from 'eui-admin-kit/es';
  import { listOrganizations } from '@/api/system/organization';
  import type { Organization } from '@/api/system/organization/model';

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number | string): void;
  }>();

  withDefaults(
    defineProps<{
      /** 选中的机构 */
      modelValue?: number | string;
      /** 提示信息 */
      placeholder?: string;
    }>(),
    {
      placeholder: '请选择所属机构'
    }
  );

  /** 机构数据 */
  const data = ref<Organization[]>([]);

  /** 更新选中数据 */
  const updateValue = (value: number | string) => {
    emit('update:modelValue', value);
  };

  /** 获取机构数据 */
  listOrganizations()
    .then((list) => {
      data.value = toTree({
        data: list,
        idField: 'organizationId',
        parentIdField: 'parentId'
      });
    })
    .catch((e) => {
      EuiMessage.error(e.message);
    });
</script>
