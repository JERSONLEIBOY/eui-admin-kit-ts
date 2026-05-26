<!-- 角色选择下拉框 -->
<template>
  <el-select
    multiple
    clearable
    :model-value="roleIds"
    :placeholder="placeholder"
    class="eui-fluid"
    @update:modelValue="updateValue"
  >
    <el-option
      v-for="item in data"
      :key="item.roleId"
      :value="(item as any).roleId"
      :label="item.roleName"
    />
  </el-select>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { EuiMessage } from 'eui-admin-kit/es';
  import { listRoles } from '@/api/system/role';
  import type { Role } from '@/api/system/role/model';

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Role[]): void;
  }>();

  const props = withDefaults(
    defineProps<{
      /** 选中的角色 */
      modelValue?: Role[];
      /** 提示文本 */
      placeholder?: string;
    }>(),
    {
      placeholder: '请选择角色'
    }
  );

  /** 选中的角色id */
  const roleIds = computed(() =>
    props.modelValue?.map?.((d) => d.roleId as string)
  );

  /** 角色数据 */
  const data = ref<Role[]>([]);

  /** 更新选中数据 */
  const updateValue = (value: string[]) => {
    emit(
      'update:modelValue',
      value.map((v) => ({ roleId: v }))
    );
  };

  /** 获取角色数据 */
  listRoles()
    .then((list) => {
      data.value = list;
    })
    .catch((e) => {
      EuiMessage.error(e.message);
    });
</script>
