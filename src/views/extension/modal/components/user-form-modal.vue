<script setup lang="ts">
  import { inject, ref, reactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EuiMessage } from 'eui-admin-kit/es';
  import { MODAL_HOLDER_KEY } from 'eui-admin-kit/es/ModalRender/util';

  defineOptions({ name: 'UserFormModal' });

  const { closeModal, setModalProps } = inject(MODAL_HOLDER_KEY)!;

  const props = defineProps<{
    data?: {
      nickname?: string;
      sex?: string;
      phone?: string;
      email?: string;
      introduction?: string;
    };
    /** 是否隐藏内置底部按钮(外部自定义底栏时传 true) */
    hideFooter?: boolean;
    onSaved?: (data: typeof form) => void;
  }>();

  const formRef = ref<FormInstance | null>(null);
  const form = reactive({
    nickname: props.data?.nickname ?? '',
    sex: props.data?.sex ?? (undefined as string | undefined),
    phone: props.data?.phone ?? '',
    email: props.data?.email ?? '',
    introduction: props.data?.introduction ?? ''
  });

  const rules = reactive<FormRules>({
    nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
  });

  const onSave = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) return;
      setModalProps({ loading: true });
      setTimeout(() => {
        setModalProps({ loading: false });
        EuiMessage.success('保存成功');
        props.onSaved?.({ ...form });
        closeModal();
      }, 600);
    });
  };
</script>

<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="70px"
    @submit.prevent=""
  >
    <el-form-item label="用户名" prop="nickname">
      <el-input clearable v-model="form.nickname" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select
        clearable
        v-model="form.sex"
        placeholder="请选择性别"
        style="width: 100%"
      >
        <el-option value="男">男</el-option>
        <el-option value="女">女</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input clearable v-model="form.phone" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input clearable v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="个人简介">
      <el-input
        :rows="4"
        type="textarea"
        v-model="form.introduction"
        placeholder="请输入个人简介"
      />
    </el-form-item>
    <div v-if="!hideFooter" class="user-form-footer">
      <el-button @click="closeModal">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
  </el-form>
</template>

<style scoped>
  .user-form-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }
</style>
