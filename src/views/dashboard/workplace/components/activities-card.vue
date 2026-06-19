<!-- 最新动态 -->
<template>
  <eui-card :header="title" :body-style="{ padding: '6px 0', height: '370px' }">
    <template #extra>
      <more-icon @command="onCommand" />
    </template>
    <el-scrollbar :view-style="{ padding: '20px 20px 0 20px' }">
      <el-timeline :reverse="false" class="demo-timeline">
        <el-timeline-item
          v-for="item in activities"
          :key="item.id"
          :timestamp="item.time"
          :type="item.type"
          :hollow="true"
        >
          {{ item.title }}
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
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

  interface Activitie {
    id: number;
    title: string;
    time: string;
    type?: any;
  }

  /** 最新动态数据 */
  const activities = ref<Activitie[]>([]);

  /** 查询最新动态 */
  const queryActivities = () => {
    activities.value = [
      {
        id: 1,
        title: '宝，我今天去输液了，输的什么液，想你的夜。',
        time: '20:30',
        type: 'danger'
      },
      {
        id: 2,
        title: '你回个“嗯”，我都能琢磨半天，你一定是在夸我听话。',
        time: '19:30'
      },
      {
        id: 3,
        title: '只要你一个眼神，我连孩子名都想好了，这就是爱。',
        time: '18:30',
        type: 'primary'
      },
      {
        id: 4,
        title:
          '你发朋友圈说想吃火锅，我立马跑了十公里送过去，你说你吃饱了，我真为你胃口好感到高兴。',
        time: '17:30',
        type: 'primary'
      },
      {
        id: 5,
        title: '你不回我消息，一定是在忙着想我吧？',
        time: '16:30',
        type: 'primary'
      },
      {
        id: 6,
        title: '今天下雨了，你没带伞吗？没关系，我这就去给你当雨伞。',
        time: '15:30'
      },
      {
        id: 7,
        title: '你跟别人去逛街了没带我，说明你怕我累着，你真体贴。',
        time: '14:30'
      },
      {
        id: 8,
        title:
          '我给你发了520个红包你只收了一个，说明你不是贪钱的女孩，我更爱你了。',
        time: '12:30'
      },
      {
        id: 9,
        title:
          '你说你洗澡去了，已经洗了三天了，一定是想把自己洗得白白胖胖的再来见我。',
        time: '11:30',
        type: 'primary'
      },
      {
        id: 10,
        title: '你拉黑我了，一定是不小心手滑了，我这就换个号继续爱你。',
        time: '10:30'
      },
      {
        id: 11,
        title: '你终于回我了，虽然只是个“滚”字，但你一定是在关心我的出行安全。',
        time: '09:30',
        type: 'success'
      },
      {
        id: 12,
        title: '今天你对我笑了，虽然是冷笑，但那是你对我的独家回应。',
        time: '08:30',
        type: 'warning'
      }
    ];
  };

  const onCommand = (command: Command) => {
    emit('command', command);
  };

  queryActivities();
</script>

<style lang="scss" scoped>
  /* 时间轴 */
  .demo-timeline {
    padding-left: 0;

    :deep(.el-timeline-item__wrapper) {
      display: flex;

      .el-timeline-item__timestamp {
        order: 0;
        flex-shrink: 0;
        margin: 0 16px 0 0;
        height: 22px;
        line-height: 22px;
        font-size: 14px;
      }

      .el-timeline-item__content {
        order: 1;
        flex: 1;
      }
    }

    :deep(.el-timeline-item__node) {
      top: 3px;
      --el-color-white: var(--el-bg-color-overlay);
    }

    :deep(.el-timeline-item__tail) {
      top: 3px;
    }
  }
</style>
