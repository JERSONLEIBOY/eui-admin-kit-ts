<!-- 用户编辑弹窗 -->
<template>
  <eui-modal
    form
    :width="680"
    :model-value="modelValue"
    :title="isUpdate ? '修改用户' : '新建用户'"
    @update:modelValue="updateModelValue"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      @submit.prevent=""
    >
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item label="所属机构">
            <org-select v-model="form.organizationId" />
          </el-form-item>
          <el-form-item label="用户账号" prop="username">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.username"
              placeholder="请输入用户账号"
              :disabled="isUpdate"
            />
          </el-form-item>
          <el-form-item label="用户名" prop="nickname">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.nickname"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <dict-data code="sex" v-model="form.sex" placeholder="请选择性别" />
          </el-form-item>
          <el-form-item label="角色" prop="roles">
            <role-select v-model="form.roles" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              clearable
              :maxlength="100"
              v-model="form.email"
              placeholder="请输入邮箱"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="手机号" prop="phone">
            <el-input
              clearable
              :maxlength="11"
              v-model="form.phone"
              placeholder="请输入手机号"
            />
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="form.birthday"
              value-format="YYYY-MM-DD"
              placeholder="请选择出生日期"
              class="eui-fluid"
            />
          </el-form-item>
          <el-form-item v-if="!isUpdate" label="登录密码" prop="password">
            <el-input
              show-password
              type="password"
              :maxlength="20"
              v-model="form.password"
              placeholder="请输入登录密码"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio :value="0" label="正常" />
              <el-radio :value="1" label="冻结" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input
              type="textarea"
              :rows="3"
              :maxlength="200"
              v-model="form.introduction"
              placeholder="请输入个人简介"
            />
          </el-form-item>
        </el-col>
      </el-row>
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
  import { EuiMessage, emailReg, phoneReg } from 'eui-admin-kit/es';
  import { useFormData } from '@/utils/use-form-data';
  import RoleSelect from './role-select.vue';
  import OrgSelect from '@/views/system/organization/components/org-select.vue';
  import { addUser, updateUser, checkExistence } from '@/api/system/user';
  import type { User } from '@/api/system/user/model';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:modelValue', modelValue: boolean): void;
  }>();

  const props = defineProps<{
    /** 弹窗是否打开 */
    modelValue: boolean;
    /** 修改回显的数据 */
    data?: User | null;
    /** 添加时机构id */
    organizationId?: string;
  }>();

  /** 是否是修改 */
  const isUpdate = ref(false);

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<User>({
    userId: '',
    username: '',
    nickname: '',
    sex: '',
    roles: [],
    email: '',
    phone: '',
    password: '',
    introduction: '',
    birthday: '',
    organizationId: '',
    status: 0
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    username: [
      {
        required: true,
        message: '请输入用户账号',
        type: 'string',
        trigger: 'blur'
      },
      {
        min: 4,
        message: '账号长度最少为4位',
        type: 'string',
        trigger: 'blur'
      },
      {
        type: 'string',
        trigger: 'blur',
        validator: (_rule: any, value: string, callback: any) => {
          if (isUpdate.value) {
            callback();
            return;
          }
          checkExistence('username', value)
            .then(() => {
              callback();
            })
            .catch(() => {
              callback(new Error('账号已经存在'));
            });
        }
      }
    ],
    nickname: [
      {
        required: true,
        message: '请输入用户名',
        type: 'string',
        trigger: 'blur'
      }
    ],
    sex: [
      {
        required: true,
        message: '请选择性别',
        type: 'string',
        trigger: 'blur'
      }
    ],
    roles: [
      {
        required: true,
        message: '请选择角色',
        type: 'array',
        trigger: 'blur'
      }
    ],
    email: [
      {
        pattern: emailReg,
        message: '邮箱格式不正确',
        type: 'string',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入登录密码',
        type: 'string',
        trigger: 'blur'
      },
      {
        type: 'string',
        trigger: 'blur',
        validator: (_rule: any, value: string, callback: any) => {
          if (isUpdate.value || /^[\S]{5,18}$/.test(value)) {
            return callback();
          }
          callback(new Error('密码必须为5-18位非空白字符'));
        }
      }
    ],
    phone: [
      {
        required: true,
        message: '请输入手机号',
        type: 'string',
        trigger: 'blur'
      },
      {
        pattern: phoneReg,
        message: '手机号格式不正确',
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
        ? updateUser(form, form.userId)
        : addUser(form);
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
          assignFields({ ...props.data, password: '' });
          isUpdate.value = true;
        } else {
          form.organizationId = props.organizationId;
          isUpdate.value = false;
        }
      } else {
        resetFields();
        formRef.value?.clearValidate?.();
      }
    }
  );
</script>
