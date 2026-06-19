<template>
  <eui-card header="时间线(自动S形换行)">
    <eui-timeline :data="data" style="margin-top: 28px" />
  </eui-card>
</template>

<script lang="ts" setup>
  import type { TimelineItem } from '../../../../../components/Timeline/types';

  const data: TimelineItem[] = [
    { title: '1 签署输血同意书', type: 'primary' },
    { title: '2 申请单打印', type: 'primary' },
    { title: '3 医嘱复核', type: 'primary' },
    { title: '4 申请单送达', type: 'primary' },
    { title: '5 输血科核收', type: 'primary' },
    { title: '6 交叉配血', type: 'primary' },
    { title: '7 取血通知' },
    { title: '8 输血医嘱开立' },
    { title: '9 打印取血单' },
    { title: '10 血袋出库' },
    { title: '11 血袋接收' },
    { title: '12 输血单核对' },
    { title: '13 输血开始' }
  ];
</script>
