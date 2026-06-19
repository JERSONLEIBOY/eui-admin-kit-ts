<script setup lang="ts">
  import DemoBase from './components/demo-base.vue';
  import DemoBlur from './components/demo-blur.vue';
  import DemoCircle from './components/demo-circle.vue';
  import DemoSpinnerSlot from './components/demo-spinner-slot.vue';
  import DemoPlain from './components/demo-plain.vue';
  defineOptions({ name: 'ExtensionLoading' });
</script>

<template>
  <eui-page>
    <DemoBase />
    <DemoBlur />
    <DemoCircle />
    <DemoSpinnerSlot />
    <DemoPlain />
  </eui-page>
</template>
