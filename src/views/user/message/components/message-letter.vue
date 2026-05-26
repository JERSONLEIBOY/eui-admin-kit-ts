<template>
  <div>
    <eui-pro-table
      ref="tableRef"
      row-key="id"
      :columns="columns"
      :datasource="datasource"
      :show-overflow-tooltip="true"
      v-model:selections="selections"
      :highlight-current-row="true"
      :export-config="{ fileName: '用户私信数据' }"
    >
      <template #toolbar>
        <el-button type="primary" class="eui-btn-icon" @click="readBatch">
          标记已读
        </el-button>
        <el-button type="danger" class="eui-btn-icon" @click="remove()">
          删除消息
        </el-button>
      </template>
      <template #status="{ row }">
        <eui-text v-if="row.status === 0" type="warning">未读</eui-text>
        <eui-text v-else-if="row.status === 1" type="info">已读</eui-text>
      </template>
      <template #action="{ row }">
        <el-link type="primary" :underline="false" @click="reply(row)">
          回复
        </el-link>
        <el-divider direction="vertical" />
        <el-link type="danger" :underline="false" @click="remove(row)">
          删除
        </el-link>
      </template>
    </eui-pro-table>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useMessage } from 'eui-admin-kit/es';
  import type { EuiProTable } from 'eui-admin-kit';
  import type {
    DatasourceFunction,
    Columns
  } from 'eui-admin-kit/es/ProTable/types';
  import { pageLetters } from '@/api/example';
  import type { Message } from '@/api/example/model';

  const EuiMessage = useMessage({ inner: true });

  const emit = defineEmits<{
    (e: 'reload'): void;
  }>();

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
      prop: 'title',
      label: '私信内容',
      minWidth: 220
    },
    {
      prop: 'time',
      label: '发送时间',
      width: 180,
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      width: 100,
      align: 'center',
      slot: 'status',
      formatter: (row) => (row.status == 0 ? '未读' : '已读')
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

  /** 列表选中数据 */
  const selections = ref<Message[]>([]);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageLetters({ ...where, ...orders, ...pages });
  };

  /** 回复 */
  const reply = (row: Message) => {
    console.log(JSON.parse(JSON.stringify(row)));
    EuiMessage.success('点击了回复');
  };

  /** 删除 */
  const remove = (row?: Message) => {
    const rows = row == null ? selections.value : [row];
    if (!rows.length) {
      EuiMessage.error('请至少选择一条数据');
      return;
    }
    EuiMessage.error('点击了删除');
  };

  /** 标记已读 */
  const readBatch = () => {
    if (!selections.value.length) {
      EuiMessage.error('请至少选择一条数据');
      return;
    }
    EuiMessage.success('点击了标记已读');
    updateUnReadNum();
  };

  /** 触发更新未读数量事件 */
  const updateUnReadNum = () => {
    emit('reload');
  };
</script>
