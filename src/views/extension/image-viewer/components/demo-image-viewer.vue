<script setup lang="ts">
  import { ref } from 'vue';

  const images = [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812431e3a46bc6f80e177jpeg.jpeg'
  ];

  const visible1 = ref(false);
  const visible3 = ref(false);
  const providerRef = ref<any>(null);
</script>

<template>
  <el-space direction="vertical" :fill="true" :size="16" style="width: 100%">
    <!-- 1. 基础用法 -->
    <eui-card header="基础用法（modelValue 控制显隐）">
      <el-button type="primary" @click="visible1 = true">打开预览</el-button>
      <eui-image-viewer v-model="visible1" :url-list="images" />
    </eui-card>

    <!-- 2. Provider 模式 -->
    <eui-card header="Provider 模式（provide/inject）">
      <eui-image-viewer-provider ref="providerRef">
        <el-button @click="providerRef?.opemImageViewer({ urlList: images })">
          子组件内触发
        </el-button>
      </eui-image-viewer-provider>
      <el-button
        style="margin-top: 12px"
        @click="providerRef?.opemImageViewer({ urlList: images })"
      >
        外部通过 ref 打开
      </el-button>
    </eui-card>

    <!-- 3. 自定义过渡 -->
    <eui-card header="自定义 transitionName / customStyle">
      <el-button @click="visible3 = true">打开（无过渡动画）</el-button>
      <eui-image-viewer
        v-model="visible3"
        :url-list="images"
        transition-name=""
        :custom-style="{ opacity: 0.95 }"
      />
    </eui-card>
  </el-space>
</template>
