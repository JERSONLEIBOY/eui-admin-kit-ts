<script setup lang="ts">
  import { ref } from 'vue';
  import { useMessageBox } from 'eui-admin-kit/es';

  const messageBox = useMessageBox();
  const inner = ref(false);

  const openConfirm = () => {
    messageBox
      .confirm('确认要删除吗? 删除后会在回收站保留30天', '删除确认', {
        type: 'error',
        inner: inner.value,
        draggable: true
      })
      .then(() => {
        console.log('点击了确定');
      })
      .catch(() => {});
  };

  const openPrompt = () => {
    messageBox
      .prompt('请输入新密码：', '重置密码', {
        inputPattern: /^[\S]{5,18}$/,
        inputErrorMessage: '密码必须为5-18位非空白字符',
        inner: inner.value,
        draggable: true
      })
      .then(({ value }) => {
        console.log(value);
      })
      .catch(() => {});
  };

  const openAlert = () => {
    messageBox
      .alert('内容内容内容内容内容内容内容', '标题', {
        inner: inner.value,
        draggable: true
      })
      .catch(() => {});
  };

  const openSuccess = () => {
    messageBox
      .alert(
        '导入完成，共新增 80 条数据，更新 20 条数据，失败 0 条数据。',
        '导入成功',
        {
          type: 'success',
          confirmButtonText: '太好了',
          inner: inner.value,
          draggable: true
        }
      )
      .catch(() => {});
  };

  const openWarning = () => {
    messageBox
      .confirm(
        '您的专业版会员还有 6 天到期，请及时续费，以免影响正常使用！',
        '到期提醒',
        {
          type: 'warning',
          cancelButtonText: '下次再说',
          confirmButtonText: '前往续费',
          closeOnClickModal: false,
          inner: inner.value,
          draggable: true
        }
      )
      .catch(() => {});
  };

  const openError = () => {
    messageBox
      .alert(
        '您的账号存在违规操作，已被系统强制下线并冻结，请联系管理员处理。',
        '异常提醒',
        {
          type: 'error',
          confirmButtonText: '查看详情',
          showClose: false,
          inner: inner.value,
          draggable: true
        }
      )
      .catch(() => {});
  };

  const openInfo = () => {
    messageBox
      .alert(
        '本周五 03:00 ~ 05:00 将进行网站升级，期间无法访问系统，请提前做好准备！',
        '系统通知',
        {
          type: 'info',
          confirmButtonText: '知道了',
          closeOnClickModal: true,
          inner: inner.value,
          draggable: true
        }
      )
      .catch(() => {});
  };
</script>

<template>
  <eui-card header="消息弹窗">
    <div class="demo-row">
      <span class="demo-label">限制在主体区域：</span>
      <el-switch v-model="inner" size="small" />
    </div>
    <div class="demo-row">
      <el-button @click="openConfirm">Confirm</el-button>
      <el-button @click="openPrompt">Prompt</el-button>
      <el-button @click="openAlert">Alert</el-button>
    </div>
    <div class="demo-row">
      <el-button @click="openSuccess">Success</el-button>
      <el-button @click="openWarning">Warning</el-button>
      <el-button @click="openError">Error</el-button>
      <el-button @click="openInfo">Info</el-button>
    </div>
  </eui-card>
</template>

<style scoped>
  .demo-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  .demo-label {
    font-size: 13px;
    color: var(--el-text-color-secondary);
    white-space: nowrap;
  }
</style>
