<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { EuiMessage } from 'eui-admin-kit/es';

  const visible = ref(false);
  const direction = ref<'rtl' | 'ltr' | 'btt' | 'ttb'>('rtl');
  const withHeader = ref(true);
  const withFooter = ref(true);
  const inner = ref(false);

  const formRef = ref<FormInstance | null>(null);
  const form = reactive({
    nickname: '',
    sex: undefined as string | undefined,
    phone: '',
    email: '',
    introduction: ''
  });

  const rules = reactive<FormRules>({
    nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
  });

  const cancelDrawer = () => {
    Object.assign(form, {
      nickname: '',
      sex: undefined,
      phone: '',
      email: '',
      introduction: ''
    });
    formRef.value?.clearValidate?.();
    visible.value = false;
  };

  const onSave = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) return;
      EuiMessage.success('保存成功');
    });
  };
</script>

<template>
  <eui-card header="抽屉组件">
    <div class="demo-row">
      <span class="demo-label">方向：</span>
      <el-radio-group v-model="direction">
        <el-radio value="rtl" label="右" />
        <el-radio value="ltr" label="左" />
        <el-radio value="btt" label="下" />
        <el-radio value="ttb" label="上" />
      </el-radio-group>
    </div>
    <div class="demo-row">
      <span class="demo-label">显示头部：</span>
      <el-switch v-model="withHeader" size="small" />
    </div>
    <div class="demo-row">
      <span class="demo-label">显示底部：</span>
      <el-switch v-model="withFooter" size="small" />
    </div>
    <div class="demo-row">
      <span class="demo-label">限制在主体区域：</span>
      <el-switch v-model="inner" size="small" />
    </div>
    <div class="demo-row">
      <el-button @click="visible = true">打开抽屉</el-button>
    </div>
  </eui-card>

  <eui-drawer
    :direction="direction"
    :with-header="withHeader"
    :inner="inner"
    :size="430"
    title="表单项配置"
    :append-to-body="true"
    style="max-width: 100%"
    v-model="visible"
    :body-style="{ paddingBottom: '8px' }"
    @closed="cancelDrawer"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="70px"
      @submit.prevent=""
    >
      <el-form-item label="用户名" prop="nickname">
        <el-input
          clearable
          v-model="form.nickname"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select
          clearable
          v-model="form.sex"
          placeholder="请选择性别"
          class="ele-fluid"
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
    </el-form>
    <template v-if="withFooter" #footer>
      <el-button @click="cancelDrawer">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </template>
  </eui-drawer>
</template>

<style scoped>
  .demo-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  .demo-label {
    font-size: 13px;
    color: var(--el-text-color-secondary);
    white-space: nowrap;
  }
</style>
