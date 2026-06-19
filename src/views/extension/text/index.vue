<script setup lang="ts">
  import DemoText from './components/demo-text.vue';
  import DemoEllipsis from './components/demo-ellipsis.vue';
  defineOptions({
    name: 'ExtensionText'
  });
</script>

<template>
  <eui-page>
    <DemoText />
    <DemoEllipsis />
  </eui-page>
</template>
