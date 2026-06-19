<script setup lang="ts">
  import DemoModal from './components/demo-modal.vue';
  import DemoDrawer from './components/demo-drawer.vue';
  import DemoMessageBox from './components/demo-message-box.vue';
  import DemoModalRender from './components/demo-modal-render.vue';
  defineOptions({ name: 'ExtensionModal' });
</script>

<template>
  <eui-page>
    <DemoModal />
    <DemoDrawer />
    <DemoModalRender />
    <DemoMessageBox />
  </eui-page>
</template>
