<template>
  <eui-dropdown
    :items="[
      {
        title: '编辑',
        command: 'edit',
        icon: EditOutlined
      },
      {
        title: '删除',
        command: 'remove',
        icon: DeleteOutlined,
        danger: true
      }
    ]"
    :icon-props="{ size: 15 }"
    placement="bottom-end"
    style="cursor: pointer"
    :popper-options="{
      modifiers: [{ name: 'offset', options: { offset: [12, 12] } }]
    }"
    @command="onCommand"
  >
    <eui-text
      type="placeholder"
      :icon="MoreOutlined"
      style="transform: scale(1.1); outline: none"
    />
  </eui-dropdown>
</template>

<script lang="ts" setup>
  import {
    MoreOutlined,
    EditOutlined,
    DeleteOutlined
  } from '@/components/icons';
  import type { Command } from '../model';

  const emit = defineEmits<{
    (e: 'command', command: Command): void;
  }>();

  const onCommand = (command: Command) => {
    emit('command', command);
  };
</script>
