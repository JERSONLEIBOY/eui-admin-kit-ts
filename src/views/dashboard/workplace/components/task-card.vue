<!-- 我的任务 -->
<template>
  <eui-card
    :header="title"
    :body-style="{ height: '370px', padding: '7px 8px 6px 8px' }"
  >
    <template #extra>
      <more-icon @command="onCommand" />
    </template>
    <el-scrollbar :wrap-style="{ position: 'relative', zIndex: 1 }">
      <eui-table class="task-table" size="large">
        <thead style="position: sticky; top: 0; z-index: 2">
          <tr>
            <th style="position: sticky; left: 0; z-index: 1; width: 38px"></th>
            <th style="text-align: center; width: 78px">优先级</th>
            <th>任务名称</th>
            <th style="text-align: center; width: 80px">状态</th>
          </tr>
        </thead>
        <vue-draggable
          tag="tbody"
          item-key="id"
          v-model="taskList"
          handle=".sort-handle"
          :animation="300"
          :set-data="() => void 0"
          :force-fallback="true"
        >
          <template #item="{ element }">
            <tr>
              <td
                :style="{
                  textAlign: 'center',
                  paddingLeft: 0,
                  paddingRight: 0,
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  width: '38px'
                }"
              >
                <eui-text
                  :icon="DragOutlined"
                  :icon-style="{ transform: 'scale(1.15)' }"
                  type="placeholder"
                  class="sort-handle"
                />
              </td>
              <td style="text-align: center; width: 78px">
                <el-tag
                  v-if="element.priority === 1"
                  type="danger"
                  :disable-transitions="true"
                >
                  {{ element.priority }}
                </el-tag>
                <el-tag
                  v-else-if="element.priority === 2"
                  type="warning"
                  :disable-transitions="true"
                >
                  {{ element.priority }}
                </el-tag>
                <el-tag v-else :disable-transitions="true">
                  {{ element.priority }}
                </el-tag>
              </td>
              <td>
                <eui-ellipsis style="line-height: 20px">
                  <el-link type="primary" underline="never">
                    {{ element.taskName }}
                  </el-link>
                </eui-ellipsis>
              </td>
              <td style="text-align: center; width: 80px">
                <eui-text v-if="element.status === 0" type="warning">
                  未开始
                </eui-text>
                <eui-text v-else-if="element.status === 1" type="success">
                  进行中
                </eui-text>
                <eui-text v-else-if="element.status === 2" type="info" deleted>
                  已完成
                </eui-text>
              </td>
            </tr>
          </template>
        </vue-draggable>
      </eui-table>
    </el-scrollbar>
  </eui-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import VueDraggable from 'vuedraggable';
  import { DragOutlined } from '@/components/icons';
  import MoreIcon from './more-icon.vue';
  import type { Command } from '../model';

  defineProps<{
    title?: string;
  }>();

  const emit = defineEmits<{
    (e: 'command', command: Command): void;
  }>();

  interface Task {
    id: number;
    priority: number;
    taskName: string;
    status: number;
  }

  /** 我的任务数据 */
  const taskList = ref<Task[]>([]);

  /** 查询我的任务 */
  const queryTaskList = () => {
    taskList.value = [
      {
        id: 1,
        priority: 1,
        taskName: '给产品经理递刀子（物理）',
        status: 0
      },
      {
        id: 2,
        priority: 2,
        taskName: '修复一个 Bug，顺便附赠两个新 Bug',
        status: 0
      },
      {
        id: 3,
        priority: 2,
        taskName: '寻找是谁写的这坨屎山，发现原来是我自己',
        status: 1
      },
      {
        id: 4,
        priority: 3,
        taskName: '在代码里藏一个复活节彩蛋（指导致崩溃的那种）',
        status: 1
      },
      {
        id: 5,
        priority: 3,
        taskName: '优雅地摸鱼并假装在思考人生架构',
        status: 2
      },
      {
        id: 6,
        priority: 3,
        taskName: '重启电脑，尝试修复所有无法解释的玄学 Bug',
        status: 2
      }
    ];
  };

  const onCommand = (command: Command) => {
    emit('command', command);
  };

  queryTaskList();
</script>

<style lang="scss" scoped>
  .task-table {
    table-layout: fixed;
    min-width: 300px;

    .sort-handle {
      cursor: move;
    }

    .el-tag {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }

    td,
    th {
      box-sizing: border-box;
    }

    tr.sortable-ghost {
      opacity: 0;
    }

    tr.sortable-fallback {
      opacity: 1 !important;
      display: table !important;
      table-layout: fixed !important;

      td {
        background: var(--el-color-primary-light-8);
      }
    }
  }
</style>
