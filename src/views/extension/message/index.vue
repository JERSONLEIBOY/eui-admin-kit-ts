<script setup lang="ts">
  import DemoMessage from './components/demo-message.vue';
  import DemoNotice from './components/demo-notice.vue';
  import DemoTooltip from './components/demo-tooltip.vue';
  defineOptions({ name: 'ExtensionMessage' });
</script>

<template>
  <eui-page>
    <DemoMessage />
    <DemoNotice />
    <DemoTooltip />
  </eui-page>
</template>
