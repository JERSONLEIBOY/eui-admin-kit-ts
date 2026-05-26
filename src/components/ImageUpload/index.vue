<template>
  <eui-upload-list
    :limit="limit"
    :drag="true"
    v-model="data"
    :item-style="itemStyle"
    :button-style="buttonStyle"
    @upload="onUpload"
    @retry="(item: UploadItem) => onUpload(item, true)"
    @remove="onRemove"
  />
</template>

<script lang="ts" setup>
  import type { CSSProperties } from 'vue';
  import { ref, watch } from 'vue';
  import type { AxiosProgressEvent } from 'axios';
  import { EuiMessage } from 'eui-admin-kit/es';
  import type { UploadItem } from 'eui-admin-kit/es/UploadList/types';
  import { uploadFile } from '@/api/system/file';

  const props = withDefaults(
    defineProps<{
      /** 绑定值 */
      modelValue?: string;
      /** 选择数量限制 */
      limit?: number;
      /** 文件大小限制, 单位MB */
      fileLimit?: number;
      /** 自定义样式 */
      itemStyle?: CSSProperties;
      /** 自定义上传按钮样式 */
      buttonStyle?: CSSProperties;
    }>(),
    {
      fileLimit: 20
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value?: string): void;
    (e: 'change', value?: string): void;
  }>();

  /** 数据 */
  const data = ref<UploadItem[]>([]);

  /** 上传事件 */
  const onUpload = (d: UploadItem, retry?: boolean) => {
    if (!d.file) {
      return;
    }
    if (!d.file.type.startsWith('image')) {
      EuiMessage.error('只能选择图片');
      return;
    }
    if (d.file.size / 1024 / 1024 > props.fileLimit) {
      EuiMessage.error(`大小不能超过 ${props.fileLimit}MB`);
      return;
    }
    if (!retry) {
      data.value.push({ ...d });
    }
    const item = data.value.find((t) => t.key === d.key);
    if (!item) {
      return;
    }
    item.status = 'uploading';
    uploadFile(d.file, {
      onUploadProgress: (e: AxiosProgressEvent) => {
        if (e.total != null) {
          item.progress = (e.loaded / e.total) * 100;
        }
      }
    })
      .then((res) => {
        item.status = 'done';
        item.url = res.url;
      })
      .catch((e) => {
        item.status = 'exception';
        EuiMessage.error(e.message);
      });
  };

  /** 删除事件 */
  const onRemove = (item: UploadItem) => {
    data.value.splice(data.value.indexOf(item), 1);
  };

  /** 更新绑定值 */
  const updateModelValue = (value: string) => {
    if (props.modelValue !== value) {
      emit('update:modelValue', value);
      emit('change', value);
    }
  };

  /** 判断是否全部上传完成 */
  const isDone = () => {
    return !data.value.some((d) => d.status !== 'done');
  };

  /** 获取已上传的图片地址 */
  const getDataValue = () => {
    return data.value.map((d) => d.url);
  };

  // 同步绑定值
  watch(
    data,
    () => {
      const res = getDataValue();
      if (props.limit === 1) {
        updateModelValue(res.join());
        return;
      }
      updateModelValue(res.length ? JSON.stringify(res) : '');
    },
    { deep: true }
  );

  watch(
    () => props.modelValue,
    (value) => {
      if (!value) {
        if (data.value.length) {
          data.value = [];
        }
        return;
      }
      if (props.limit === 1) {
        if (
          data.value.length === 1 &&
          data.value[0].url === value /* &&
          data.value[0].status === 'done' */
        ) {
          return;
        }
        data.value = [{ key: `0-${value}`, url: value, status: 'done' }];
        return;
      }
      try {
        const temp = JSON.parse(value);
        if (
          temp.length === data.value.length &&
          JSON.stringify(getDataValue()) === value
        ) {
          return;
        }
        data.value = temp.map((t: any, i: number) => {
          return { key: `${i}-${t}`, url: t, status: 'done' };
        });
      } catch (e) {
        console.error(e);
        data.value = [];
      }
    },
    { immediate: true }
  );

  defineExpose({ isDone });
</script>
