<template>
  <eui-page flexTable="auto" :multi-card="false" hide-footer>
    <eui-card flexTable="auto" :body-style="{ padding: '0px' }">
      <eui-split-panel
        ref="splitRef"
        flex-table="auto"
        :space="0"
        size="256px"
        :min-size="120"
        :max-size="0.82"
        allow-collapse
        percentage
        resizable
        :collapse-btn-offset="2"
        :custom-style="{ borderWidth: '0 1px 0 0' }"
      >
        <template #sideHeader>
          <el-input
            clearable
            :maxlength="20"
            v-model="keywords"
            placeholder="输入字典名称搜索"
            :prefix-icon="SearchOutlined"
          />
        </template>
        <div style="padding: 12px 0px 0px 12px">
          <el-button
            type="primary"
            class="eui-btn-icon"
            :icon="PlusOutlined"
            @click="openEdit()"
          >
            新建
          </el-button>
          <el-button
            type="warning"
            :disabled="!current"
            class="eui-btn-icon"
            :icon="EditOutlined"
            @click="openEdit(current)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            :disabled="!current"
            class="eui-btn-icon"
            :icon="DeleteOutlined"
            @click="remove"
          >
            删除
          </el-button>
        </div>
        <eui-loading
          :loading="loading"
          :style="{ flex: '1 1 60px', overflow: 'auto' }"
        >
          <el-tree
            ref="treeRef"
            :data="data"
            highlight-current
            node-key="dictId"
            :props="{ label: 'dictName' }"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :filter-node-method="filterNode"
            :style="{
              '--eui-tree-item-height': '34px',
              '--eui-tree-expand-padding': 0,
              '--eui-tree-expand-margin': 0
            }"
            @node-click="onNodeClick"
          >
            <template #default="{ data: d }">
              <div
                class="el-tree-node__label"
                style="display: flex; align-items: center"
              >
                <el-icon style="margin-right: 4px">
                  <BookOutlined />
                </el-icon>
                <div style="margin-right: 4px">{{ d.dictName }}</div>
                <div style="font-size: 12px; opacity: 0.8; font-weight: normal">
                  ({{ d.dictCode }})
                </div>
              </div>
            </template>
          </el-tree>
        </eui-loading>
        <template #bodyHeader>
          <dict-data-search
            ref="searchRef"
            v-if="current && current.dictId"
            @search="onSearch"
          />
        </template>
        <template #body>
          <dict-data-list
            ref="dictDataListRef"
            v-if="current && current.dictId"
            :dict-id="current.dictId"
            @reset-search="onResetSearch"
          />
        </template>
      </eui-split-panel>
    </eui-card>
    <dict-edit v-model="showEdit" :data="editData" @done="query" />
  </eui-page>
</template>

<script lang="ts" setup>
  import { ref, nextTick, watch } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import type { ElTree } from 'element-plus';
  import { EuiMessage } from 'eui-admin-kit/es';
  import type { EuiSplitPanel } from 'eui-admin-kit/es';
  import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    BookOutlined
  } from '@/components/icons';
  import { useMobile } from '@/utils/use-mobile';
  import DictDataList from './components/dict-data-list.vue';
  import DictDataSearch from './components/dict-data-search.vue';
  import DictEdit from './components/dict-edit.vue';
  import { listDictionaries, removeDictionary } from '@/api/system/dictionary';
  import type { Dictionary } from '@/api/system/dictionary/model';
  import type { DictionaryDataParam } from '@/api/system/dictionary-data/model';

  defineOptions({
    name: 'SystemDictionary'
  });

  /** 是否是移动端 */
  const { mobile } = useMobile();

  /** 分割面板组件 */
  const splitRef = ref<InstanceType<typeof EuiSplitPanel> | null>(null);

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof DictDataSearch> | null>(null);

  /** 字典数据列表实例 */
  const dictDataListRef = ref<InstanceType<typeof DictDataList> | null>(null);

  /** 树组件 */
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null);

  /** 加载状态 */
  const loading = ref(true);

  /** 树形数据 */
  const data = ref<Dictionary[]>([]);

  /** 选中数据 */
  const current = ref<Dictionary | null>(null);

  /** 机构搜索关键字 */
  const keywords = ref('');

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 编辑回显数据 */
  const editData = ref<Dictionary | null>(null);

  /** 查询 */
  const query = () => {
    loading.value = true;
    listDictionaries()
      .then((list) => {
        loading.value = false;
        data.value = list ?? [];
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
  const onNodeClick = (row?: Dictionary) => {
    // 移动端自动收起左侧
    if (current.value != null && mobile.value) {
      splitRef.value?.toggleCollapse?.(true);
    }
    if (row && row.dictId) {
      current.value = row;
      treeRef.value?.setCurrentKey?.(row.dictId);
    } else {
      current.value = null;
    }
  };

  /** 搜索 */
  const onSearch = (where?: DictionaryDataParam) => {
    dictDataListRef.value?.reload?.(where);
  };

  /** 字典切换时重置搜索条件 */
  const onResetSearch = () => {
    searchRef.value?.resetFields?.();
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: Dictionary | null) => {
    editData.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除 */
  const remove = () => {
    const row = current.value;
    if (!row) {
      return;
    }
    ElMessageBox.confirm(`确定要删除“${row.dictName}”吗?`, '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EuiMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeDictionary(row.dictId)
          .then((msg) => {
            loading.close();
            EuiMessage.success(msg);
            query();
          })
          .catch((e) => {
            loading.close();
            EuiMessage.error(e.message);
          });
      })
      .catch(() => {});
  };

  /** 树过滤方法 */
  const filterNode = (value: string, data: Dictionary) => {
    if (value) {
      return !!(data.dictName && data.dictName.includes(value));
    }
    return true;
  };

  /** 树过滤 */
  watch(keywords, (value) => {
    treeRef.value?.filter?.(value);
  });

  query();
</script>
