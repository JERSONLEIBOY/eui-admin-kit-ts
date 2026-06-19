<template>
  <eui-page
    flex-table
    :multi-card="false"
    hide-footer
    style="min-height: 420px"
  >
    <eui-card
      bordered
      flex-table="auto"
      :body-style="{ padding: '0px' }"
      style="overflow: hidden"
    >
      <eui-split-panel
        flex-table="auto"
        :space="0"
        :size="258"
        :min-size="120"
        :max-size="0.82"
        percentage
        resizable
        allow-collapse
        :collapse-btn-offset="2"
        :custom-style="{ borderWidth: '0 1px 0 0' }"
      >
        <template #sideHeader>
          <el-input
            clearable
            :maxlength="20"
            v-model="keywords"
            placeholder="输入机构名称搜索"
            :prefix-icon="SearchOutlined"
          />
        </template>
        <eui-loading
          :loading="loading"
          :style="{ flex: '1 1 60px', overflow: 'auto' }"
        >
          <el-tree
            ref="treeRef"
            :data="data"
            highlight-current
            node-key="organizationId"
            :props="{ label: 'organizationName' }"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :filter-node-method="filterNode"
            :style="{ '--eui-tree-item-height': '34px' }"
            @node-click="onNodeClick"
          >
            <template #default="{ data: d }">
              <span class="el-tree-node__label">
                <el-icon style="margin-right: 4px; vertical-align: -2px">
                  <CityOutlined />
                </el-icon>
                <span>{{ d.organizationName }}</span>
              </span>
            </template>
          </el-tree>
        </eui-loading>
        <template #bodyHeader>
          <user-search
            ref="searchRef"
            v-if="current && current.organizationId"
            @search="onSearch"
          />
        </template>
        <template #body>
          <user-list
            ref="userListRef"
            v-if="current && current.organizationId"
            :organization-id="current.organizationId"
            @reset-search="onResetSearch"
          />
        </template>
      </eui-split-panel>
    </eui-card>
  </eui-page>
</template>

<script lang="ts" setup>
  import { ref, nextTick, watch } from 'vue';
  import type { ElTree } from 'element-plus';
  import { EuiMessage, toTree } from 'eui-admin-kit/es';
  import type { EuiSplitPanel } from 'eui-admin-kit/es';
  import { SearchOutlined, CityOutlined } from '@/components/icons';
  import { useMobile } from '@/utils/use-mobile';
  import UserSearch from './components/user-search.vue';
  import UserList from './components/user-list.vue';
  import { listOrganizations } from '@/api/system/organization';
  import type { Organization } from '@/api/system/organization/model';
  import type { UserParam } from '@/api/system/user/model';

  defineOptions({
    name: 'SystemUser'
  });

  /** 是否是移动端 */
  const { mobile } = useMobile();

  /** 分割面板组件 */
  const splitRef = ref<InstanceType<typeof EuiSplitPanel> | null>(null);

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof UserSearch> | null>(null);

  /** 用户列表实例 */
  const userListRef = ref<InstanceType<typeof UserList> | null>(null);

  /** 树组件 */
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null);

  /** 加载状态 */
  const loading = ref(true);

  /** 树形数据 */
  const data = ref<Organization[]>([]);

  /** 选中数据 */
  const current = ref<Organization | null>(null);

  /** 机构搜索关键字 */
  const keywords = ref('');

  /** 查询 */
  const query = () => {
    loading.value = true;
    listOrganizations()
      .then((list) => {
        loading.value = false;
        data.value = toTree({
          data: list,
          idField: 'organizationId',
          parentIdField: 'parentId'
        });
        nextTick(() => {
          onNodeClick(data.value[0]);
        });
      })
      .catch((e) => {
        loading.value = false;
        EuiMessage.error(e.message);
      });
  };

  /** 选择数据 */
  const onNodeClick = (row?: Organization) => {
    // 移动端自动收起左侧
    if (current.value != null && mobile.value) {
      splitRef.value?.toggleCollapse?.(true);
    }
    if (row && row.organizationId) {
      current.value = row;
      treeRef.value?.setCurrentKey?.(row.organizationId);
    } else {
      current.value = null;
    }
  };

  /** 搜索 */
  const onSearch = (where?: UserParam) => {
    userListRef.value?.reload?.(where);
  };

  /** 机构切换时重置搜索条件 */
  const onResetSearch = () => {
    searchRef.value?.resetFields?.();
  };

  /** 树过滤方法 */
  const filterNode = (value: string, data: Organization) => {
    if (value) {
      return !!(data.organizationName && data.organizationName.includes(value));
    }
    return true;
  };

  /** 树过滤 */
  watch(keywords, (value) => {
    treeRef.value?.filter?.(value);
  });

  query();
</script>
