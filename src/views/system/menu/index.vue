<template>
  <eui-page>
    <menu-search @search="reload" />
    <eui-card :body-style="{ paddingTop: '8px' }">
      <eui-pro-table
        sticky
        ref="tableRef"
        row-key="menuId"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        :highlight-current-row="true"
        :export-config="{ fileName: '菜单数据' }"
        :default-expand-all="false"
        :pagination="false"
        cache-key="systemMenuTable"
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
        <template #title="{ row }">
          <el-icon
            v-if="row.icon"
            :size="15"
            style="margin-right: 8px; vertical-align: -2px"
          >
            <component :is="row.icon" />
          </el-icon>
          <span>{{ row.title }}</span>
        </template>
        <template #menuType="{ row }">
          <el-tag
            v-if="isExternalLink(row.path)"
            size="small"
            type="danger"
            :disable-transitions="true"
          >
            外链
          </el-tag>
          <el-tag
            v-else-if="row.menuType === 0"
            size="small"
            :disable-transitions="true"
          >
            目录
          </el-tag>
          <el-tag
            v-else-if="row.menuType === 1"
            size="small"
            type="success"
            :disable-transitions="true"
          >
            菜单
          </el-tag>
          <el-tag
            v-else-if="row.menuType === 2"
            size="small"
            type="info"
            :disable-transitions="true"
          >
            按钮
          </el-tag>
        </template>
        <template #action="{ row }">
          <el-link
            type="primary"
            :underline="false"
            @click="openEdit(null, row.menuId)"
          >
            添加
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="primary" :underline="false" @click="openEdit(row)">
            修改
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)">
            删除
          </el-link>
        </template>
      </eui-pro-table>
    </eui-card>
    <menu-edit
      v-model="showEdit"
      :data="current"
      :parent-id="parentId"
      @done="reload"
    />
  </eui-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EuiMessage, isExternalLink, toTree } from 'eui-admin-kit/es';
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
  import MenuSearch from './components/menu-search.vue';
  import MenuEdit from './components/menu-edit.vue';
  import { listMenus, removeMenu } from '@/api/system/menu';
  import type { Menu, MenuParam } from '@/api/system/menu/model';

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
      prop: 'title',
      label: '菜单名称',
      slot: 'title',
      minWidth: 160
    },
    {
      prop: 'path',
      label: '路由地址',
      minWidth: 160
    },
    {
      prop: 'sortNumber',
      label: '排序',
      width: 100,
      align: 'center'
    },
    {
      prop: 'hide',
      label: '可见',
      width: 100,
      align: 'center',
      formatter: (row) => ['是', '否'][row.hide]
    },
    {
      prop: 'menuType',
      label: '类型',
      width: 100,
      align: 'center',
      slot: 'menuType',
      formatter: (row) => {
        if (isExternalLink(row.path)) {
          return '外链';
        }
        return ['目录', '菜单', '按钮'][row.menuType];
      }
    },
    {
      columnKey: 'action',
      label: '操作',
      fixed: 'right',
      width: 180,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 当前编辑数据 */
  const current = ref<Menu | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 上级菜单id */
  const parentId = ref<number>();

  /** 表格数据源 */
  const datasource: DatasourceFunction = async ({ where }) => {
    const data = await listMenus({ ...where });
    return toTree({
      data,
      idField: 'menuId',
      parentIdField: 'parentId'
    });
  };

  /** 刷新表格 */
  const reload = (where?: MenuParam) => {
    tableRef.value?.reload?.({ where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: Menu | null, id?: number) => {
    current.value = row ?? null;
    parentId.value = id;
    showEdit.value = true;
  };

  /** 删除单个 */
  const remove = (row: Menu) => {
    if (row.children?.length) {
      EuiMessage.error('请先删除子节点');
      return;
    }
    ElMessageBox.confirm('确定要删除“' + row.title + '”吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EuiMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeMenu(row.menuId)
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

<script lang="ts">
  import * as MenuIcons from '@/layout/menu-icons';

  export default {
    name: 'SystemMenu',
    components: MenuIcons
  };
</script>
