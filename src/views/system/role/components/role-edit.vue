<!-- 角色编辑弹窗 -->
<template>
  <eui-modal
    form
    :width="460"
    :model-value="modelValue"
    :title="isUpdate ? '修改角色' : '添加角色'"
    @update:modelValue="updateModelValue"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      @submit.prevent=""
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          clearable
          :maxlength="20"
          v-model="form.roleName"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item label="角色标识" prop="roleCode">
        <el-input
          clearable
          :maxlength="20"
          v-model="form.roleCode"
          placeholder="请输入角色标识"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          :rows="4"
          type="textarea"
          v-model="form.comments"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="updateModelValue(false)">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </eui-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EuiMessage } from 'eui-admin-kit/es';
  import { useFormData } from '@/utils/use-form-data';
  import { addRole, updateRole } from '@/api/system/role';
  import type { Role } from '@/api/system/role/model';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:modelValue', modelValue: boolean): void;
  }>();

  const props = defineProps<{
    /** 弹窗是否打开 */
    modelValue: boolean;
    /** 修改回显的数据 */
    data?: Role | null;
  }>();

  /** 是否是修改 */
  const isUpdate = ref(false);

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<Role>({
    roleId: void 0,
    roleName: '',
    roleCode: '',
    comments: ''
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    roleName: [
      {
        required: true,
        message: '请输入角色名称',
        type: 'string',
        trigger: 'blur'
      }
    ],
    roleCode: [
      {
        required: true,
        message: '请输入角色标识',
        type: 'string',
        trigger: 'blur'
      }
    ]
  });

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      const saveOrUpdate = isUpdate.value
        ? updateRole(form, form.roleId)
        : addRole(form);
      saveOrUpdate
        .then((msg) => {
          loading.value = false;
          EuiMessage.success(msg);
          updateModelValue(false);
          emit('done');
        })
        .catch((e) => {
          loading.value = false;
          EuiMessage.error(e.message);
        });
    });
  };

  /** 更新modelValue */
  const updateModelValue = (value: boolean) => {
    emit('update:modelValue', value);
  };

  watch(
    () => props.modelValue,
    (modelValue) => {
      if (modelValue) {
        if (props.data) {
          assignFields(props.data);
          isUpdate.value = true;
        } else {
          isUpdate.value = false;
        }
      } else {
        resetFields();
        formRef.value?.clearValidate?.();
      }
    }
  );
</script>
