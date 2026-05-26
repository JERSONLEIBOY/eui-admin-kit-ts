<!-- 快捷方式 -->
<template>
  <el-row :gutter="16" ref="wrapRef">
    <el-col v-for="item in data" :key="item.url" :md="3" :sm="6" :xs="12">
      <eui-card shadow="hover" :body-style="{ padding: 0 }">
        <router-link :to="item.url" class="app-link">
          <el-icon class="app-link-icon" :style="{ color: item.color }">
            <component :is="item.icon" />
          </el-icon>
          <div class="app-link-title">{{ item.title }}</div>
        </router-link>
      </eui-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import SortableJs from 'sortablejs';
  import {
    UserOutlined,
    IdcardOutlined,
    AppstoreOutlined,
    CityOutlined,
    BookOutlined,
    FolderOutlined,
    CalendarOutlined,
    LogOutlined
  } from '@/components/icons';
  import type { ElRow } from 'element-plus';

  defineOptions({
    name: 'LinkCard',
    components: {
      UserOutlined,
      IdcardOutlined,
      AppstoreOutlined,
      CityOutlined,
      BookOutlined,
      FolderOutlined,
      CalendarOutlined,
      LogOutlined
    }
  });
  const CACHE_KEY = 'workplace-links';

  interface LinkItem {
    id: number;
    icon: string;
    title: string;
    url: string;
    color?: string;
  }

  /** 默认顺序 */
  const DEFAULT: LinkItem[] = [
    {
      id: 1,
      icon: 'UserOutlined',
      title: '用户',
      url: '/system/user'
    },
    {
      id: 2,
      icon: 'IdcardOutlined',
      title: '角色',
      url: '/system/role',
      color: '#95de64'
    },
    {
      id: 3,
      icon: 'AppstoreOutlined',
      title: '菜单',
      url: '/system/menu',
      color: '#ff9c6e'
    },
    {
      id: 4,
      icon: 'CityOutlined',
      title: '机构',
      url: '/system/organization',
      color: '#b37feb'
    },
    {
      id: 5,
      icon: 'BookOutlined',
      title: '字典',
      url: '/system/dictionary',
      color: '#ffd666'
    },
    {
      id: 6,
      icon: 'FolderOutlined',
      title: '文件',
      url: '/system/file',
      color: '#5cdbd3'
    },
    {
      id: 7,
      icon: 'CalendarOutlined',
      title: '登录',
      url: '/system/login-record',
      color: '#ff85c0'
    },
    {
      id: 8,
      icon: 'LogOutlined',
      title: '操作',
      url: '/system/operation-record',
      color: '#ffc069'
    }
  ];

  /** 数据 */
  const data = ref<LinkItem[]>(
    (() => {
      try {
        const str = localStorage.getItem(CACHE_KEY);
        const temp = str ? JSON.parse(str) : null;
        if (temp) {
          const result = [...DEFAULT];
          result.sort((a, b) => temp.indexOf(a.id) - temp.indexOf(b.id));
          return result;
        }
      } catch (_e) {
        //
      }
      return [...DEFAULT];
    })()
  );

  /** 根节点 */
  const wrapRef = ref<InstanceType<typeof ElRow> | null>(null);

  /** 排序实例 */
  let sortableIns: SortableJs | null = null;

  /** 重置布局 */
  const reset = () => {
    data.value = [...DEFAULT];
    localStorage.removeItem(CACHE_KEY);
  };

  /** 缓存布局 */
  const cacheData = () => {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify(data.value.map((d) => d.id))
    );
  };

  onMounted(() => {
    if ('ontouchstart' in document.documentElement) {
      return;
    }
    sortableIns = new SortableJs(wrapRef.value?.$el, {
      animation: 300,
      onUpdate: ({ oldIndex, newIndex }) => {
        if (typeof oldIndex === 'number' && typeof newIndex === 'number') {
          const temp = [...data.value];
          temp.splice(newIndex, 0, temp.splice(oldIndex, 1)[0]);
          data.value = temp;
          cacheData();
        }
      },
      setData: () => {}
    });
  });

  onBeforeUnmount(() => {
    if (sortableIns) {
      sortableIns.destroy();
      sortableIns = null;
    }
  });

  defineExpose({ reset });
</script>

<style lang="scss" scoped>
  .app-link {
    padding: 12px;
    display: block;
    text-align: center;
    text-decoration: none;
    color: inherit;

    :deep(.app-link-icon) {
      font-size: 30px;
      color: #69c0ff;
      margin: 6px 0 10px 0;

      & > svg {
        stroke-width: 3;
      }
    }
  }

  .el-col.sortable-ghost {
    opacity: 0;
  }
</style>
