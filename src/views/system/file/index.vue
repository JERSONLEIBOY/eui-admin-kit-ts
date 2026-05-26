<template>
  <eui-page>
    <file-search @search="reload" />
    <eui-card :body-style="{ paddingTop: '8px' }">
      <eui-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        v-model:selections="selections"
        :highlight-current-row="true"
        :export-config="{ fileName: '文件数据' }"
        cache-key="systemFileTable"
      >
        <template #toolbar>
          <el-upload
            action=""
            :show-upload-list="false"
            :before-upload="onUpload"
            style="display: inline-block; vertical-align: middle"
          >
            <el-button
              type="primary"
              class="eui-btn-icon"
              :icon="UploadOutlined"
            >
              上传
            </el-button>
          </el-upload>
          <el-button
            type="danger"
            class="eui-btn-icon"
            :icon="DeleteOutlined"
            style="margin-left: 12px"
            @click="remove()"
          >
            删除
          </el-button>
        </template>
        <template #path="{ row }">
          <el-link
            type="primary"
            :href="row.url"
            target="_blank"
            :underline="false"
          >
            {{ row.path }}
          </el-link>
        </template>
        <template #action="{ row }">
          <el-link
            type="primary"
            :underline="false"
            :href="row.downloadUrl"
            target="_blank"
          >
            下载
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)">
            删除
          </el-link>
        </template>
      </eui-pro-table>
    </eui-card>
  </eui-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EuiMessage } from 'eui-admin-kit/es';
  import type { EuiProTable } from 'eui-admin-kit';
  import type {
    DatasourceFunction,
    Columns
  } from 'eui-admin-kit/es/ProTable/types';
  import { DeleteOutlined, UploadOutlined } from '@/components/icons';
  import FileSearch from './components/file-search.vue';
  import { pageFiles, removeFiles, uploadFile } from '@/api/system/file';
  import type { FileRecord, FileRecordParam } from '@/api/system/file/model';

  defineOptions({
    name: 'SystemFile'
  });

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EuiProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'selection',
      columnKey: 'selection',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '文件名称',
      sortable: 'custom',
      minWidth: 140
    },
    {
      prop: 'path',
      label: '文件路径',
      sortable: 'custom',
      minWidth: 140,
      slot: 'path'
    },
    {
      prop: 'length',
      label: '文件大小',
      width: 120,
      align: 'center',
      sortable: 'custom',
      formatter: (row) => {
        if (row.length < 1024) {
          return row.length + 'B';
        } else if (row.length < 1024 * 1024) {
          return (row.length / 1024).toFixed(1) + 'KB';
        } else if (row.length < 1024 * 1024 * 1024) {
          return (row.length / 1024 / 1024).toFixed(1) + 'M';
        } else {
          return (row.length / 1024 / 1024 / 1024).toFixed(1) + 'G';
        }
      }
    },
    {
      prop: 'createNickname',
      label: '上传人',
      width: 120,
      align: 'center',
      sortable: 'custom'
    },
    {
      prop: 'createTime',
      label: '上传时间',
      width: 180,
      align: 'center',
      sortable: 'custom'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 120,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<FileRecord[]>([]);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageFiles({ ...where, ...orders, ...pages });
  };

  /** 搜索 */
  const reload = (where?: FileRecordParam) => {
    selections.value = [];
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 删除 */
  const remove = (row?: FileRecord) => {
    const rows = row == null ? selections.value : [row];
    if (!rows.length) {
      EuiMessage.error('请至少选择一条数据');
      return;
    }
    ElMessageBox.confirm(
      '确定要删除“' + rows.map((d) => d.name).join(', ') + '”吗?',
      '系统提示',
      { type: 'warning', draggable: true }
    )
      .then(() => {
        const loading = EuiMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeFiles(rows.map((d) => d.id))
          .then((msg) => {
            loading.close();
            EuiMessage.success(msg);
            reload();
          })
          .catch((e) => {
            loading.close();
            EuiMessage.error(e.message);
          });
      })
      .catch(() => {});
  };

  /** 上传 */
  const onUpload = (file: File) => {
    if (file.size / 1024 / 1024 > 100) {
      EuiMessage.error('大小不能超过 100MB');
      return false;
    }
    const loading = EuiMessage.loading({
      message: '上传中..',
      plain: true,
      mask: true
    });
    uploadFile(file)
      .then(() => {
        loading.close();
        EuiMessage.success('上传成功');
        reload();
      })
      .catch((e) => {
        loading.close();
        EuiMessage.error(e.message);
      });
    return false;
  };
</script>
