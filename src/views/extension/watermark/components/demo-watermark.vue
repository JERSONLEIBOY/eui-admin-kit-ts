<script setup lang="ts">
  import { ref, computed } from 'vue';

  // —— 基础控制 ——
  const content = ref<string | string[]>(['EUI 水印演示', 'Element Plus EUI']);
  const useArrayContent = ref(true);
  const disabled = ref(false);
  const svgRender = ref(false);

  // —— 样式控制 ——
  const fontSize = ref(16);
  const rotate = ref(-22);
  const gapX = ref(100);
  const gapY = ref(100);
  const offsetX = ref(0);
  const offsetY = ref(0);

  // 字体（验证 font prop 透传）
  const font = computed(() => ({
    color: 'rgba(122, 122, 122, 0.35)',
    fontSize: fontSize.value,
    fontWeight: 'normal' as const,
    fontFamily: 'sans-serif',
    fontStyle: 'normal' as const
  }));

  // 切换文本形态：字符串 vs 数组（验证 normalizeStringArray）
  const normalizedContent = computed(() =>
    useArrayContent.value
      ? Array.isArray(content.value)
        ? content.value
        : [content.value]
      : Array.isArray(content.value)
        ? content.value.join(' / ')
        : content.value
  );
</script>

<template>
  <!-- 1. 基础用法：canvas 模式 + 数组/字符串切换（验证 normalizeStringArray 路径 1） -->
  <eui-card header="基础用法（canvas）">
    <div class="demo-row">
      <ElSwitch
        v-model="useArrayContent"
        active-text="数组内容（多行）"
        inactive-text="字符串内容（单行）"
      />
      <ElSwitch v-model="disabled" active-text="禁用水印" />
    </div>

    <EuiWatermark
      :content="normalizedContent"
      :disabled="disabled"
      :font="font"
      :gap="[gapX, gapY]"
      :rotate="rotate"
      :offset="[offsetX, offsetY]"
      wrap-height="200px"
    >
      <div class="demo-content">
        <h4>受保护的内容（canvas 渲染）</h4>
        <p>
          切换上面的开关，验证 string / string[]
          归一化、禁用、字体、间距、旋转、offset。
        </p>
      </div>
    </EuiWatermark>
  </eui-card>

  <!-- 2. 参数面板（验证 watch 覆盖 offset/gap/rotate/font/lineGap 等所有字段） -->
  <eui-card header="参数面板（验证 watch 所有字段）">
    <div class="demo-grid">
      <label>
        字号 <span>{{ fontSize }}</span>
        <ElSlider v-model="fontSize" :min="10" :max="40" />
      </label>
      <label>
        旋转 <span>{{ rotate }}°</span>
        <ElSlider v-model="rotate" :min="-90" :max="90" />
      </label>
      <label>
        gapX <span>{{ gapX }}</span>
        <ElSlider v-model="gapX" :min="0" :max="300" />
      </label>
      <label>
        gapY <span>{{ gapY }}</span>
        <ElSlider v-model="gapY" :min="0" :max="300" />
      </label>
      <label>
        offsetX <span>{{ offsetX }}</span>
        <ElSlider v-model="offsetX" :min="0" :max="200" />
      </label>
      <label>
        offsetY <span>{{ offsetY }}</span>
        <ElSlider v-model="offsetY" :min="0" :max="200" />
      </label>
    </div>
    <EuiWatermark
      :content="normalizedContent"
      :font="font"
      :gap="[gapX, gapY]"
      :rotate="rotate"
      :offset="[offsetX, offsetY]"
      wrap-height="220px"
    >
      <div class="demo-content">
        <p>滑动上方控件可实时验证水印 watch 是否触发重绘。</p>
        <p>
          其中 <code>offset</code> 是本次对齐修复的属性，
          上游版本之前在本仓库声明但未消费，现在应能实时偏移。
        </p>
      </div>
    </EuiWatermark>
  </eui-card>

  <!-- 3. svgRender 模式（新增能力，Teleport 到 body） -->
  <eui-card header="svgRender 模式（新增）">
    <div class="demo-row">
      <ElSwitch
        v-model="svgRender"
        active-text="svgRender = true（SVG pattern 平铺到 body）"
        inactive-text="svgRender = false（canvas dataURL）"
      />
    </div>
    <EuiWatermark
      :content="normalizedContent"
      :svg-render="svgRender"
      :font="font"
      :gap="[gapX, gapY]"
      :rotate="rotate"
      :offset="[offsetX, offsetY]"
      fixed
    >
      <div class="demo-content">
        <p><b>fixed + svgRender</b>：水印铺满整个视口。</p>
        <p>切换 svgRender 开关，应看到水印渲染方式切换（canvas/svg）。</p>
        <p>
          svg 模式下打开 DevTools，能在 <code>body</code> 末尾看到
          <code>&lt;svg&gt;</code> 节点（Teleport 到了 body）。
        </p>
      </div>
    </EuiWatermark>
  </eui-card>

  <!-- 4. 图片水印（验证 crossorigin / referrerPolicy + 图片绘制路径） -->
  <eui-card header="图片水印（验证 crossorigin / referrer-policy）">
    <EuiWatermark
      image="https://element-plus.org/images/element-plus-logo.svg"
      :width="100"
      :height="40"
      :gap="[120, 80]"
      :rotate="-15"
      wrap-height="200px"
    >
      <div class="demo-content">
        <p>使用 SVG logo 作为水印图片。</p>
        <p>
          内部 <code>new Image()</code> 会设置
          <code>crossOrigin="anonymous"</code> /
          <code>referrerPolicy="no-referrer"</code>，避免 canvas 跨域污染。
        </p>
      </div>
    </EuiWatermark>
  </eui-card>

  <!-- 5. wrapHeight + customStyle（新增 prop） -->
  <eui-card header="wrapHeight（新增）+ customStyle">
    <div class="demo-row">
      <span>wrapHeight 接受 number 自动加 px：</span>
    </div>
    <EuiWatermark
      content="wrapHeight = 160"
      :wrap-height="160"
      :custom-style="{ opacity: 0.6 }"
    >
      <div class="demo-content" style="height: 100%">
        <p>容器高度由 <code>wrap-height</code> 控制。</p>
        <p>水印整体透明度由 <code>custom-style</code> 控制为 0.6。</p>
      </div>
    </EuiWatermark>
  </eui-card>
</template>

<style scoped>
  .demo-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px 24px;
    margin-bottom: 12px;
  }
  .demo-grid label {
    display: block;
    font-size: 13px;
    color: #606266;
  }
  .demo-grid label span {
    margin-left: 8px;
    color: #303133;
  }
  .demo-content {
    height: 100%;
    padding: 16px;
    background: #fafafa;
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }
  .demo-content h4 {
    margin: 0 0 8px;
  }
  .demo-content p {
    margin: 4px 0;
    color: #606266;
  }
  .demo-content code {
    padding: 0 4px;
    background: #f0f2f5;
    border-radius: 3px;
    font-family: Menlo, Consolas, monospace;
    font-size: 12px;
  }
  :deep(.eui-card) + :deep(.eui-card) {
    margin-top: 16px;
  }
</style>
