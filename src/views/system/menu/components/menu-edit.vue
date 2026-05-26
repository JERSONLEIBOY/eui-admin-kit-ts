<!-- 编辑弹窗 -->
<template>
  <eui-modal
    form
    :width="740"
    :model-value="modelValue"
    :title="isUpdate ? '修改菜单' : '新建菜单'"
    @update:modelValue="updateModelValue"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="92px"
      @submit.prevent=""
    >
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item label="上级菜单" prop="parentId">
            <menu-select v-if="modelValue" v-model="form.parentId" />
          </el-form-item>
          <el-form-item label="菜单名称" prop="title">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.title"
              placeholder="请输入菜单名称"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="form.menuType" @change="onMenuTypeChange">
              <el-radio :value="0" label="目录" />
              <el-radio :value="1" label="菜单" />
              <el-radio :value="2" label="按钮" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="打开方式">
            <el-radio-group
              v-model="form.openType"
              :disabled="form.menuType === 0 || form.menuType === 2"
              @change="onOpenTypeChange"
            >
              <el-radio :value="0" label="组件" />
              <el-radio :value="1" label="内链" />
              <el-radio :value="2" label="外链" />
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider style="margin: 8px 0 22px 0; opacity: 0.6" />
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item label="菜单图标" prop="icon">
            <icon-select v-model="form.icon" :disabled="form.menuType === 2" />
          </el-form-item>
          <el-form-item prop="path">
            <template #label>
              <eui-tooltip
                v-if="form.openType === 2"
                content="需要以`http://`、`https://`、`//`开头"
              >
                <el-icon
                  :size="15"
                  style="align-self: center; margin-right: 4px; cursor: help"
                >
                  <QuestionCircleOutlined style="opacity: 0.6" />
                </el-icon>
              </eui-tooltip>
              <span>{{ form.openType === 2 ? '外链地址' : '路由地址' }}</span>
            </template>
            <el-input
              clearable
              :maxlength="100"
              v-model="form.path"
              :disabled="form.menuType === 2"
              :placeholder="
                form.openType === 2 ? '请输入外链地址' : '请输入路由地址'
              "
            />
          </el-form-item>
          <el-form-item prop="component">
            <template #label>
              <eui-tooltip
                v-if="form.openType === 1"
                content="需要以`http://`、`https://`、`//`开头"
              >
                <el-icon
                  :size="15"
                  style="align-self: center; margin-right: 4px; cursor: help"
                >
                  <QuestionCircleOutlined style="opacity: 0.6" />
                </el-icon>
              </eui-tooltip>
              <span>{{ form.openType === 1 ? '内链地址' : '组件路径' }}</span>
            </template>
            <el-input
              clearable
              :maxlength="100"
              v-model="form.component"
              :disabled="
                form.menuType === 0 ||
                form.menuType === 2 ||
                form.openType === 2
              "
              :placeholder="
                form.openType === 1 ? '请输入内链地址' : '请输入组件路径'
              "
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="权限标识" prop="authority">
            <el-input
              clearable
              v-model="form.authority"
              placeholder="请输入权限标识"
              :disabled="
                form.menuType === 0 ||
                (form.menuType === 1 && form.openType === 2)
              "
            />
          </el-form-item>
          <el-form-item label="排序号" prop="sortNumber">
            <el-input-number
              :min="0"
              :max="99999"
              v-model="form.sortNumber"
              placeholder="请输入排序号"
              controls-position="right"
              class="eui-fluid"
            />
          </el-form-item>
          <el-form-item label="是否展示">
            <el-switch
              inline-prompt
              active-text="是"
              inactive-text="否"
              :model-value="form.hide === 0"
              :disabled="form.menuType === 2"
              @change="updateHideValue"
            />
            <eui-tooltip
              content="选择不展示只注册路由不展示在侧边栏, 比如添加页面应该选择不展示"
              :popper-style="{ maxWidth: '240px' }"
            >
              <el-icon :size="15" style="margin-left: 16px; cursor: help">
                <QuestionCircleOutlined style="opacity: 0.6" />
              </el-icon>
            </eui-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="路由元数据" prop="meta">
        <el-input
          :rows="4"
          type="textarea"
          :maxlength="200"
          v-model="form.meta"
          placeholder="请输入JSON格式的路由元数据"
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
  import { QuestionCircleOutlined } from '@/components/icons';
  import { useFormData } from '@/utils/use-form-data';
  import MenuSelect from './menu-select.vue';
  import IconSelect from './icon-select.vue';
  import { addMenu, updateMenu } from '@/api/system/menu';
  import type { Menu } from '@/api/system/menu/model';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:modelValue', modelValue: boolean): void;
  }>();

  const props = defineProps<{
    /** 弹窗是否打开 */
    modelValue: boolean;
    /** 修改回显的数据 */
    data?: Menu | null;
    /** 添加时上级菜单id */
    parentId?: number | string;
  }>();

  /** 是否是修改 */
  const isUpdate = ref(false);

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<Menu>({
    menuId: void 0,
    parentId: void '0',
    title: '',
    menuType: 0,
    openType: 0,
    icon: '',
    path: '',
    component: '',
    authority: '',
    sortNumber: void 0,
    hide: 0,
    meta: ''
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    title: [
      {
        required: true,
        type: 'string',
        message: '请输入菜单名称',
        trigger: 'blur'
      }
    ],
    sortNumber: [
      {
        required: true,
        type: 'number',
        message: '请输入排序号',
        trigger: 'blur'
      }
    ],
    meta: [
      {
        type: 'string',
        validator: (_rule: any, value: string, callback: any) => {
          if (value) {
            const msg = '请输入正确的JSON格式';
            try {
              const obj = JSON.parse(value);
              if (obj == null || typeof obj !== 'object') {
                return callback(msg);
              }
            } catch (_e) {
              return callback(msg);
            }
          }
          callback();
        },
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
        ? updateMenu({ ...form }, form.menuId)
        : addMenu({ ...form });
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

  /** menuType选择改变 */
  const onMenuTypeChange = () => {
    if (form.menuType === 0) {
      form.authority = '';
      form.openType = 0;
      form.component = '';
    } else if (form.menuType === 1) {
      if (form.openType === 2) {
        form.authority = '';
      }
    } else {
      form.openType = 0;
      form.icon = '';
      form.path = '';
      form.component = '';
      form.hide = 0;
    }
  };

  /** openType选择改变 */
  const onOpenTypeChange = () => {
    if (form.openType === 2) {
      form.component = '';
      form.authority = '';
    }
  };

  /** hide选择改变 */
  const updateHideValue = (value: boolean) => {
    form.hide = value ? 0 : 1;
  };

  watch(
    () => props.modelValue,
    (modelValue) => {
      if (modelValue) {
        if (props.data) {
          assignFields({
            ...props.data,
            parentId:
              props.data.parentId === '0' ? void '0' : props.data.parentId
          });
          isUpdate.value = true;
        } else {
          form.parentId = props.parentId;
          isUpdate.value = false;
        }
      } else {
        resetFields();
        formRef.value?.clearValidate?.();
      }
    }
  );
</script>
