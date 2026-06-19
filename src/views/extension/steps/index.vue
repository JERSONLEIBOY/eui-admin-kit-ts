<script setup lang="ts">
  import DemoSteps from './components/demo-steps.vue';
  import DemoAsync from './components/demo-async.vue';
  import DemoTimeline from './components/demo-timeline.vue';
  defineOptions({ name: 'ExtensionSteps' });
</script>

<template>
  <eui-page>
    <DemoSteps />
    <DemoAsync />
    <DemoTimeline />
  </eui-page>
</template>
