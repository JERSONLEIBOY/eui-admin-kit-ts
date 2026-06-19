<script setup lang="ts">
  import { computed, ref } from 'vue';

  // —— 1) 上游：单行/多行文本省略（照抄上游） ——

  /** 提示风格 */
  const tooltip = ref(1);

  /** 最大行数（上游 demo） */
  const maxLineUpstream = ref(2);

  /** tooltip 属性 */
  const tooltipProps = computed(() => {
    if (tooltip.value === 3) {
      return false;
    }
    return {
      original: tooltip.value === 1,
      popperStyle: {
        width: '420px',
        maxWidth: 'calc(100vw - 32px)'
      }
    };
  });

  // —— 2) 自有 demo —— 较长的示例文本（用于触发省略） ——
  const longText =
    'EuiEllipsis 文本省略组件支持单行 / 多行省略，鼠标悬停时通过原生 title 或 EuiTooltip 提示完整内容。';

  // —— 3) tooltip 形态切换（自有 demo） ——
  type TipMode = 'tooltip' | 'native' | 'off';
  const tipMode = ref<TipMode>('tooltip');

  // 当前 tooltip prop 值（依据模式动态计算，避免 v-bind 残留）
  const tooltipBinding = computed(() => {
    if (tipMode.value === 'tooltip') {
      return { placement: 'top' as const, effect: 'dark' as const };
    }
    if (tipMode.value === 'native') {
      return { original: true };
    }
    return false;
  });

  // —— 4) 多行行数动态切换（自有 demo，slider） ——
  const maxLine = ref<number>(2);

  // —— 5) 自定义 tooltip 配置（独立于展示文本） ——
  const customTipContent =
    '这条文本是 tooltip 自定义内容，与展示文本可以完全不一样。';

  // —— 6) 列表场景：截断 + 提示 ——
  const tasks = ref([
    { id: 1, name: '产品需求文档：H5 推广页迭代 — 第二期专题落地与素材替换' },
    { id: 2, name: '后端联调：支付链路 / 退款回调 / 对账文件下载' },
    { id: 3, name: '设计走查：Web 端登录注册的视觉规范修订与适配' },
    { id: 4, name: '运营周会纪要：本周用户增长复盘与下周投放策略调整建议' }
  ]);
</script>

<template>
  <!-- 上游：单行文本省略 -->
  <eui-card header="单行文本省略">
    <div class="option-item">
      <label class="option-item-label">提示风格</label>
      <ElRadioGroup v-model="tooltip">
        <ElRadio :value="1" label="原生" />
        <ElRadio :value="2" label="Tooltip" />
        <ElRadio :value="3" label="关闭" />
      </ElRadioGroup>
    </div>
    <div class="upstream-box">
      <EuiEllipsis :tooltip="tooltipProps">
        文本省略组件 `eui-ellipsis` 支持单行和多行省略,
        当鼠标移入时会提示全部内容, 且支持使用 Tooltip 组件进行提示.
      </EuiEllipsis>
    </div>
  </eui-card>

  <!-- 上游：多行文本省略 -->
  <eui-card header="多行文本省略">
    <div class="option-item">
      <label class="option-item-label">最大行数</label>
      <ElRadioGroup v-model="maxLineUpstream">
        <ElRadio :value="2" label="2" />
        <ElRadio :value="3" label="3" />
        <ElRadio :value="4" label="4" />
      </ElRadioGroup>
    </div>
    <div class="upstream-box">
      <EuiEllipsis :tooltip="tooltipProps" :max-line="maxLineUpstream">
        文本省略组件 `eui-ellipsis` 支持单行和多行省略,
        当鼠标移入时会提示全部内容, 且支持使用 Tooltip 组件进行提示,
        并且支持设置 Tooltip 组件的其它属性, 如提示位置和主题等,
        还可以单独设置提示的内容与展示的内容完全不一样,
        默认会获取展示的文本内容为提示内容.
      </EuiEllipsis>
    </div>
  </eui-card>

  <!-- 自有：单行省略 tooltip 模式切换 -->
  <eui-card header="单行省略 · tooltip 模式切换">
    <div class="demo-row">
      <ElRadioGroup v-model="tipMode">
        <ElRadio value="tooltip">Tooltip 组件</ElRadio>
        <ElRadio value="native">原生 title</ElRadio>
        <ElRadio value="off">关闭提示</ElRadio>
      </ElRadioGroup>
    </div>

    <div class="demo-box">
      <EuiEllipsis :tooltip="tooltipBinding">
        {{ longText }}
      </EuiEllipsis>
    </div>
    <p class="demo-tip">
      切换上方模式，省略文本鼠标悬停时分别走：EuiTooltip 浮层、浏览器原生
      title、无提示。
    </p>
  </eui-card>

  <!-- 自有：多行省略 动态行数（slider） -->
  <eui-card header="多行省略 · 动态行数">
    <div class="demo-row">
      <span class="demo-label">最大行数</span>
      <ElSlider
        v-model="maxLine"
        :min="1"
        :max="5"
        :step="1"
        show-stops
        style="width: 280px"
      />
      <span class="demo-value">{{ maxLine }} 行</span>
    </div>

    <div class="demo-box">
      <EuiEllipsis :max-line="maxLine" tooltip>
        {{ longText.repeat(3) }}
      </EuiEllipsis>
    </div>
  </eui-card>

  <!-- 自有：lineHeight + tooltip 自定义内容 -->
  <eui-card header="自定义行高 · tooltip 内容与展示文本解耦">
    <div class="demo-box">
      <EuiEllipsis
        :max-line="2"
        :line-height="28"
        :tooltip="{
          content: customTipContent,
          effect: 'light',
          placement: 'right'
        }"
      >
        {{ longText }}
      </EuiEllipsis>
    </div>
    <p class="demo-tip">
      <code>lineHeight=28</code> 显式控制行高；
      <code>tooltip.content</code> 完全覆盖展示文本，提示出独立的提示语。
    </p>
  </eui-card>

  <!-- 自有：列表场景 -->
  <eui-card header="列表场景">
    <ul class="task-list">
      <li v-for="t in tasks" :key="t.id">
        <span class="task-id">#{{ t.id }}</span>
        <EuiEllipsis tooltip class="task-name">{{ t.name }}</EuiEllipsis>
      </li>
    </ul>
  </eui-card>
</template>

<style scoped>
  /* 上游 demo 风格 */
  .option-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .option-item-label {
    font-size: 13px;
    color: #606266;
  }
  .upstream-box {
    width: 520px;
    max-width: 100%;
    margin-top: 8px;
  }

  /* 自有 demo 风格 */
  .demo-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
  }
  .demo-label {
    font-size: 13px;
    color: #606266;
  }
  .demo-value {
    font-size: 13px;
    color: #303133;
    font-variant-numeric: tabular-nums;
  }
  .demo-box {
    max-width: 480px;
    padding: 12px 14px;
    background: #fafafa;
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }
  .demo-tip {
    margin: 8px 0 0;
    font-size: 12px;
    color: #909399;
  }
  .demo-tip code {
    padding: 0 4px;
    background: #f0f2f5;
    border-radius: 3px;
    font-family: Menlo, Consolas, monospace;
  }

  .task-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .task-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 4px;
    border-bottom: 1px solid #f2f3f5;
  }
  .task-list li:last-child {
    border-bottom: none;
  }
  .task-id {
    flex-shrink: 0;
    width: 36px;
    color: #909399;
    font-variant-numeric: tabular-nums;
  }
  .task-name {
    flex: 1;
    min-width: 0;
  }

  :deep(.eui-card) + :deep(.eui-card) {
    margin-top: 16px;
  }
</style>
