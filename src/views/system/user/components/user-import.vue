<!-- 用户导入弹窗 -->
<template>
  <eui-modal
    :width="460"
    title="导入用户"
    :model-value="modelValue"
    @update:modelValue="updateModelValue"
  >
    <div v-loading="loading" class="user-import-upload">
      <el-upload
        drag
        action=""
        accept=".xls,.xlsx"
        :show-upload-list="false"
        :before-upload="doUpload"
      >
        <eui-text
          type="primary"
          :icon="CloudUploadOutlined"
          :icon-props="{ size: 52 }"
          style="margin-bottom: 10px"
        />
        <eui-text type="placeholder">将文件拖到此处, 或点击上传</eui-text>
      </el-upload>
    </div>
    <div style="display: flex; align-items: center; justify-content: center">
      <span style="padding-right: 8px">只能上传 xls、xlsx 文件,</span>
      <el-link
        type="primary"
        :underline="false"
        href=""
        download="用户导入模板.xlsx"
      >
        下载模板
      </el-link>
    </div>
  </eui-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { EuiMessage } from 'eui-admin-kit/es';
  import { CloudUploadOutlined } from '@/components/icons';
  import { importUsers } from '@/api/system/user';

  const emit = defineEmits<{
    (e: 'done'): void;
    (e: 'update:modelValue', modelValue: boolean): void;
  }>();

  defineProps<{
    /** 是否打开弹窗 */
    modelValue: boolean;
  }>();

  /** 导入请求状态 */
  const loading = ref(false);

  /** 上传 */
  const doUpload = (file: File) => {
    if (
      ![
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ].includes(file.type)
    ) {
      EuiMessage.error('只能选择 excel 文件');
      return false;
    }
    if (file.size / 1024 / 1024 > 10) {
      EuiMessage.error('大小不能超过 10MB');
      return false;
    }
    loading.value = true;
    importUsers(file)
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
    return false;
  };

  /** 更新modelValue */
  const updateModelValue = (value: boolean) => {
    emit('update:modelValue', value);
  };
</script>

<style lang="scss" scoped>
  .user-import-upload {
    margin-bottom: 12px;

    :deep(.el-upload > .el-upload-dragger) {
      padding: 0;
      height: 168px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: (border-color 0.2s, background-color 0.2s);

      &:not(.is-dragover) {
        background: var(--el-fill-color-light);
      }
    }

    :deep(.el-upload-list) {
      display: none;
    }

    :deep(.el-icon > svg) {
      stroke-width: 3;
    }
  }
</style>
