<!-- 角色权限分配弹窗 -->
<template>
  <eui-modal
    :width="460"
    title="分配权限"
    position="center"
    :model-value="modelValue"
    :body-style="{ padding: '12px 0 12px 22px' }"
    @update:modelValue="updateModelValue"
  >
    <eui-loading
      :loading="authLoading"
      :spinner-style="{ background: 'transparent' }"
      :style="{
        height: '560px',
        paddingRight: '20px',
        maxHeight: 'calc(100vh - 192px)',
        minHeight: '100px',
        overflow: 'auto'
      }"
    >
      <el-tree
        ref="treeRef"
        show-checkbox
        :data="authData"
        node-key="menuId"
        :default-expand-all="true"
        :props="{ label: 'title' }"
        :default-checked-keys="checkedKeys"
        :style="{ '--eui-tree-item-height': '28px' }"
      >
        <template #default="scope">
          <div>
            <el-icon
              v-if="scope.data.icon"
              :size="16"
              style="margin-right: 6px; vertical-align: -5px"
            >
              <component :is="scope.data.icon" />
            </el-icon>
            <span style="vertical-align: -2px">{{ scope.data.title }}</span>
          </div>
        </template>
      </el-tree>
    </eui-loading>
    <template #footer>
      <el-button @click="updateModelValue(false)">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </eui-modal>
</template>

<script lang="ts" setup>
  import { ref, watch, nextTick } from 'vue';
  import type { ElTree } from 'element-plus';
  import { EuiMessage, toTree, eachTree } from 'eui-admin-kit/es';
  import { listRoleMenus, updateRoleMenus } from '@/api/system/role';
  import type { Role } from '@/api/system/role/model';
  import type { Menu } from '@/api/system/menu/model';

  const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: boolean): void;
  }>();

  const props = defineProps<{
    /** 弹窗是否打开 */
    modelValue: boolean;
    /** 当前角色数据 */
    data?: Role | null;
  }>();

  /** 树组件实例 */
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null);

  /** 权限数据 */
  const authData = ref<Menu[]>([]);

  /** 权限数据请求状态 */
  const authLoading = ref(false);

  /** 提交状态 */
  const loading = ref(false);

  /** 角色权限选中的keys */
  const checkedKeys = ref<number[]>([]);

  /** 查询权限数据 */
  const query = () => {
    authData.value = [];
    checkedKeys.value = [];
    if (!props.data) {
      return;
    }
    authLoading.value = true;
    listRoleMenus(props.data.roleId)
      .then((data) => {
        authLoading.value = false;
        // 转成树形结构的数据
        authData.value = toTree({
          data: data,
          idField: 'menuId',
          parentIdField: 'parentId'
        });
        // 回显选中的数据
        nextTick(() => {
          const cks: number[] = [];
          eachTree(authData.value, (d) => {
            if (d.menuId && d.checked && !d.children?.length) {
              cks.push(d.menuId);
            }
          });
          checkedKeys.value = cks;
        });
      })
      .catch((e) => {
        authLoading.value = false;
        EuiMessage.error(e.message);
      });
  };

  /** 保存权限分配 */
  const save = () => {
    loading.value = true;
    const ids =
      (treeRef.value?.getCheckedKeys?.() ?? []).concat(
        treeRef.value?.getHalfCheckedKeys?.() ?? []
      ) ?? [];
    updateRoleMenus(props.data?.roleId, ids as unknown as string[])
      .then((msg) => {
        loading.value = false;
        EuiMessage.success(msg);
        updateModelValue(false);
      })
      .catch((e) => {
        loading.value = false;
        EuiMessage.error(e.message);
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
        query();
      }
    }
  );
</script>

<script lang="ts">
  import * as MenuIcons from '@/layout/menu-icons';

  export default {
    components: MenuIcons
  };
</script>
