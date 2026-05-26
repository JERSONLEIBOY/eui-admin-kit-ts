<!-- 项目进度 -->
<template>
  <eui-card :header="title" :body-style="{ padding: '10px', height: '370px' }">
    <template #extra>
      <more-icon @command="onCommand" />
    </template>
    <eui-pro-table
      :height="352"
      row-key="id"
      :columns="columns"
      :datasource="projectList"
      :show-overflow-tooltip="true"
      highlight-current-row
      :pagination="false"
      :toolbar="false"
      :bottom-line="false"
      size="large"
      class="project-table"
    >
      <template #projectName="{ row }">
        <el-link type="primary" :underline="false">
          {{ row.projectName }}
        </el-link>
      </template>
      <template #status="{ row }">
        <eui-text v-if="row.status === 0" type="success">进行中</eui-text>
        <eui-text v-else-if="row.status === 1" type="danger">已延期</eui-text>
        <eui-text v-else-if="row.status === 2" type="warning">
          未开始
        </eui-text>
        <eui-text v-else-if="row.status === 3" type="info">已结束</eui-text>
      </template>
      <template #progress="{ row }">
        <el-progress :percentage="row.progress" />
      </template>
    </eui-pro-table>
  </eui-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Columns } from 'eui-admin-kit/es/ProTable/types';
  import MoreIcon from './more-icon.vue';
  import type { Command } from '../model';

  defineProps<{
    title?: string;
  }>();

  const emit = defineEmits<{
    (e: 'command', command: Command): void;
  }>();

  interface Project {
    id: number;
    projectName: string;
    status: number;
    startDate: string;
    endDate: string;
    progress: number;
  }

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
      prop: 'projectName',
      label: '项目名称',
      slot: 'projectName',
      minWidth: 110
    },
    {
      prop: 'startDate',
      label: '开始时间',
      align: 'center',
      minWidth: 110
    },
    {
      prop: 'endDate',
      label: '结束时间',
      align: 'center',
      minWidth: 110
    },
    {
      prop: 'status',
      label: '状态',
      slot: 'status',
      align: 'center',
      width: 90
    },
    {
      prop: 'progress',
      label: '进度',
      width: 180,
      align: 'center',
      slot: 'progress',
      showOverflowTooltip: false
    }
  ]);

  /** 项目进度数据 */
  const projectList = ref<Project[]>([]);

  /** 查询项目进度 */
  const queryProjectList = () => {
    projectList.value = [
      {
        id: 1,
        projectName: '人类高质量代码重构计划',
        status: 0,
        startDate: '2026-01-01',
        endDate: '2099-12-31',
        progress: 1
      },
      {
        id: 2,
        projectName: '关于如何优雅地在会议上睡觉的研究',
        status: 0,
        startDate: '2026-05-20',
        endDate: '2026-06-20',
        progress: 80
      },
      {
        id: 3,
        projectName: '寻找丢失的 semicolon 探险之旅',
        status: 1,
        startDate: '2026-04-01',
        endDate: '2026-05-01',
        progress: 99
      },
      {
        id: 4,
        projectName: '给服务器降降温：尝试用意念散热',
        status: 1,
        startDate: '2026-05-01',
        endDate: '2026-05-10',
        progress: 0
      },
      {
        id: 5,
        projectName: '从入门到放弃：Vim 退出指南',
        status: 2,
        startDate: '2026-01-01',
        endDate: '2026-01-02',
        progress: 100
      },
      {
        id: 6,
        projectName: '摸鱼学概论：如何看起来很忙',
        status: 3,
        startDate: '2026-01-01',
        endDate: '2026-05-19',
        progress: 100
      }
    ];
  };

  const onCommand = (command: Command) => {
    emit('command', command);
  };

  queryProjectList();
</script>

<style lang="scss" scoped>
  .project-table :deep(.el-progress__text) {
    font-size: 12px !important;
  }
</style>
