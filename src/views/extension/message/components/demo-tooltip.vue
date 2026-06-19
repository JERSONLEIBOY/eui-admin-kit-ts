<script setup lang="ts"></script>

<template>
  <eui-card header="文本提示 / 气泡">
    <div class="demo-row">
      <span class="demo-label">Tooltip：</span>
      <eui-tooltip content="EuiAdminKit" placement="top" :offset="8">
        <el-button>Dark</el-button>
      </eui-tooltip>
      <eui-tooltip
        content="EuiAdminKit"
        placement="top"
        effect="light"
        :offset="8"
      >
        <el-button>Light</el-button>
      </eui-tooltip>
      <eui-tooltip
        content="EuiAdminKit"
        placement="top"
        effect="danger"
        :offset="8"
      >
        <el-button>错误</el-button>
      </eui-tooltip>
      <eui-tooltip
        content="EuiAdminKit"
        placement="top"
        effect="warning"
        :offset="8"
      >
        <el-button>警告</el-button>
      </eui-tooltip>
      <eui-tooltip
        content="EuiAdminKit"
        placement="top"
        effect="success"
        :offset="8"
      >
        <el-button>成功</el-button>
      </eui-tooltip>
    </div>
    <div class="demo-row">
      <span class="demo-label">Popover：</span>
      <eui-popover :width="180" trigger="click" title="这是标题" :offset="8">
        <template #reference>
          <el-button>Popover</el-button>
        </template>
        <div>This is content.</div>
        <div>This is content.</div>
      </eui-popover>
    </div>
    <div class="demo-row">
      <span class="demo-label">Popconfirm：</span>
      <eui-popconfirm
        :width="190"
        :offset="8"
        title="确定要删除此用户吗?"
        :popper-options="{ strategy: 'fixed' }"
      >
        <template #reference>
          <el-button>基础</el-button>
        </template>
      </eui-popconfirm>
      <eui-popconfirm
        :width="258"
        :offset="8"
        title="用户满意度调研"
        content="您在使用中是否对本产品还满意?"
        cancel-button-text="关闭"
        confirm-button-text="满意"
        :cancel-button-props="{ style: { order: -1, margin: '0 auto 0 0' } }"
        :popper-options="{ strategy: 'fixed' }"
      >
        <template #reference>
          <el-button>自定义操作</el-button>
        </template>
        <template #action="{ cancel }">
          <el-button size="small" plain type="danger" @click="cancel()"
            >投诉</el-button
          >
        </template>
      </eui-popconfirm>
    </div>
  </eui-card>
</template>

<style scoped>
  .demo-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
  .demo-label {
    font-size: 13px;
    color: var(--el-text-color-secondary);
    white-space: nowrap;
  }
</style>
