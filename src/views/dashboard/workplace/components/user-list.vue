<!-- 小组成员 -->
<template>
  <eui-card
    :header="title"
    :body-style="{ padding: '8px 0px', height: '370px' }"
  >
    <template #extra>
      <more-icon @command="onCommand" />
    </template>
    <div v-for="item in userList" :key="item.id" class="user-list-item">
      <el-avatar :size="46" :src="item.avatar" style="flex-shrink: 0" />
      <div class="user-list-item-body">
        <div>{{ item.name }}</div>
        <eui-ellipsis type="placeholder" size="sm">
          {{ item.introduction }}
        </eui-ellipsis>
      </div>
      <div style="flex-shrink: 0">
        <el-tag
          v-if="item.status === 0"
          size="small"
          type="success"
          :disable-transitions="true"
        >
          在线
        </el-tag>
        <el-tag v-else size="small" type="danger" :disable-transitions="true">
          离线
        </el-tag>
      </div>
    </div>
  </eui-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import MoreIcon from './more-icon.vue';
  import type { Command } from '../model';

  defineProps<{
    title?: string;
  }>();

  const emit = defineEmits<{
    (e: 'command', command: Command): void;
  }>();

  interface User {
    id: number;
    name: string;
    introduction: string;
    status: number;
    avatar: string;
  }

  /** 小组成员数据 */
  const userList = ref<User[]>([]);

  /** 查询小组成员 */
  const queryUserList = () => {
    userList.value = [
      {
        id: 1,
        name: '齐天大圣',
        introduction: '擅长降妖除魔（指修复 Bug），经常大闹天宫（指重构代码）',
        status: 0,
        avatar:
          'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg'
      },
      {
        id: 2,
        name: '二师兄',
        introduction: '首席摸鱼官，精通 36 种优雅的偷懒姿势',
        status: 0,
        avatar:
          'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg'
      },
      {
        id: 3,
        name: '扫地僧',
        introduction: '平时不显山露水，关键时刻一掌拍死所有死锁',
        status: 0,
        avatar:
          'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'
      },
      {
        id: 4,
        name: '背锅侠',
        introduction: '项目经理，职业替死鬼，拥有钢铁般的意志和厚实的脊梁',
        status: 1,
        avatar:
          'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg'
      },
      {
        id: 5,
        name: '终极 BOSS',
        introduction: '由于过于强大（指甲方爸爸），目前处于隐身状态',
        status: 1,
        avatar:
          'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg'
      }
    ];
  };

  const onCommand = (command: Command) => {
    emit('command', command);
  };

  queryUserList();
</script>

<style lang="scss" scoped>
  .user-list-item {
    display: flex;
    align-items: center;
    padding: 12px 18px;
    transition: background-color 0.2s;
    cursor: pointer;

    .user-list-item-body {
      flex: 1;
      overflow: hidden;
      padding-left: 12px;
      box-sizing: border-box;
    }

    & + .user-list-item {
      border-top: 1px solid hsla(0, 0%, 60%, 0.2);
    }

    &:hover {
      background: hsla(0, 0%, 60%, 0.08);
    }
  }
</style>
