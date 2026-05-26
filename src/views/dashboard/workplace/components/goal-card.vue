<!-- 本月目标 -->
<template>
  <eui-card :header="title" :body-style="{ height: '370px' }">
    <template #extra>
      <more-icon @command="onCommand" />
    </template>
    <div class="workplace-goal">
      <el-progress
        :width="180"
        :percentage="80"
        color="#1677ff"
        type="dashboard"
        :format="() => ''"
      />
      <div class="workplace-goal-body">
        <el-tag
          size="large"
          :disable-transitions="true"
          style="width: 36px; height: 36px; border-radius: 50%; line-height: 0"
        >
          <el-icon style="cursor: default; border-radius: 0">
            <watch />
          </el-icon>
        </el-tag>
        <div style="font-size: 40px">996</div>
      </div>
      <div>警告：本月发量余额已不足 20%!</div>
    </div>
  </eui-card>
</template>

<script lang="ts" setup>
  import { Watch } from '@element-plus/icons-vue';
  import MoreIcon from './more-icon.vue';
  import type { Command } from '../model';

  defineProps<{
    title?: string;
  }>();

  const emit = defineEmits<{
    (e: 'command', command: Command): void;
  }>();

  const onCommand = (command: Command) => {
    emit('command', command);
  };
</script>

<style lang="scss" scoped>
  .workplace-goal {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .workplace-goal-body {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 180px;
      margin: -48px 0 0 -90px;
      text-align: center;
    }
  }
</style>
