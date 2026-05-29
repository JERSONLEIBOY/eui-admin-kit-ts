<template>
  <eui-page>
    <org-search @search="reload" />
    <eui-card :body-style="{ paddingTop: '8px' }">
      <eui-pro-table
        sticky
        ref="tableRef"
        row-key="organizationId"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        :highlight-current-row="true"
        :export-config="{ fileName: '机构数据' }"
        :default-expand-all="true"
        :pagination="false"
        cache-key="systemOrganizationTable"
      >
        <template #toolbar>
          <el-button
            type="primary"
            class="eui-btn-icon"
            :icon="PlusOutlined"
            @click="openEdit()"
          >
            新建
          </el-button>
          <el-button
            class="eui-btn-icon"
            :icon="ColumnHeightOutlined"
            @click="expandAll"
          >
            展开全部
          </el-button>
          <el-button
            class="eui-btn-icon"
            :icon="VerticalAlignMiddleOutlined"
            @click="foldAll"
          >
            折叠全部
          </el-button>
        </template>
        <template #action="{ row }">
          <el-link
            type="primary"
            underline="never"
            @click="openEdit(null, row.organizationId)"
          >
            添加
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="primary" underline="never" @click="openEdit(row)">
            修改
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" underline="never" @click="remove(row)">
            删除
          </el-link>
        </template>
      </eui-pro-table>
    </eui-card>
    <org-edit
      v-model="showEdit"
      :data="current"
      :organization-id="parentId"
      @done="reload"
    />
  </eui-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EuiMessage, toTree } from 'eui-admin-kit/es';
  import type { EuiProTable } from 'eui-admin-kit';
  import type {
    DatasourceFunction,
    Columns
  } from 'eui-admin-kit/es/ProTable/types';
  import {
    PlusOutlined,
    ColumnHeightOutlined,
    VerticalAlignMiddleOutlined
  } from '@/components/icons';
  import OrgSearch from './components/org-search.vue';
  import OrgEdit from './components/org-edit.vue';
  import {
    listOrganizations,
    removeOrganization
  } from '@/api/system/organization';
  import type {
    Organization,
    OrganizationParam
  } from '@/api/system/organization/model';

  defineOptions({
    name: 'SystemOrganization'
  });

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EuiProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'organizationName',
      label: '机构名称',
      sortable: 'custom',
      minWidth: 160
    },
    {
      prop: 'organizationTypeName',
      label: '机构类型',
      minWidth: 100,
      align: 'center'
    },
    {
      prop: 'sortNumber',
      label: '排序号',
      minWidth: 100,
      align: 'center'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      sortable: 'custom',
      width: 180,
      align: 'center'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 180,
      fixed: 'right',
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 当前编辑数据 */
  const current = ref<Organization | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 上级机构id */
  const parentId = ref<string | undefined>('');

  /** 表格数据源 */
  const datasource: DatasourceFunction = async ({ where, orders }) => {
    const data = await listOrganizations({ ...where, ...orders });
    return toTree({
      data,
      idField: 'organizationId',
      parentIdField: 'parentId'
    });
  };

  /** 刷新表格 */
  const reload = (where?: OrganizationParam) => {
    tableRef.value?.reload?.({ where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: Organization | null, id?: string) => {
    current.value = row ?? null;
    parentId.value = id;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: Organization) => {
    if (row.children?.length) {
      EuiMessage.error('请先删除子节点');
      return;
    }
    ElMessageBox.confirm(
      '确定要删除“' + row.organizationName + '”吗?',
      '系统提示',
      { type: 'warning', draggable: true }
    )
      .then(() => {
        const loading = EuiMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeOrganization(row.organizationId)
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

  /** 展开全部 */
  const expandAll = () => {
    tableRef.value?.toggleRowExpansionAll?.(true);
  };

  /** 折叠全部 */
  const foldAll = () => {
    tableRef.value?.toggleRowExpansionAll?.(false);
  };
</script>
