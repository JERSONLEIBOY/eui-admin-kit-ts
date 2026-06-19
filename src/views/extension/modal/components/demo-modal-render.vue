<script setup lang="ts">
  import { h, ref } from 'vue';
  import { ElButton, ElTag } from 'element-plus';
  import { useModal } from 'eui-admin-kit/es/ModalRender/use-modal';
  import UserFormModal from './user-form-modal.vue';
  import { EuiMessage } from 'eui-admin-kit/es';

  const { openModal, closeModal, ModalHolder } = useModal();

  // 1. 打开弹窗
  const openAdd = () => {
    openModal({
      type: 'modal',
      component: UserFormModal,
      props: {
        title: '添加用户',
        width: 460,
        maxable: true,
        appendToBody: true
      }
    });
  };

  // 2. 打开抽屉
  const openDrawer = () => {
    openModal({
      type: 'drawer',
      component: UserFormModal,
      props: { title: '添加用户', size: 460, appendToBody: true }
    });
  };

  // 3. 打开无遮罩层弹窗
  const openNoMask = () => {
    openModal({
      type: 'modal',
      component: UserFormModal,
      props: { title: '添加用户', width: 460, modal: false, appendToBody: true }
    });
  };

  // 4. 传递数据及监听保存成功事件
  const savedData = ref<Record<string, any> | null>(null);
  const openWithData = () => {
    savedData.value = null;
    openModal({
      type: 'modal',
      component: UserFormModal,
      props: {
        title: '修改用户',
        width: 460,
        maxable: true,
        appendToBody: true
      },
      componentProps: {
        data: {
          nickname: '管理员',
          sex: '男',
          phone: '12345678901',
          email: 'admin@eleadmin.com',
          introduction: '这家伙很懒，什么都不说~'
        },
        onSaved: (data: Record<string, any>) => {
          savedData.value = data;
          EuiMessage.success('监听到保存成功事件');
        }
      }
    });
  };

  // 5. 页面关闭后仍然保持弹窗打开
  const openKeepAlive = () => {
    openModal({
      type: 'modal',
      component: UserFormModal,
      props: {
        title: '添加用户',
        width: 460,
        maxable: true,
        appendToBody: true
      },
      keepAlive: true
    });
  };

  // 6. 自定义弹窗的顶栏、底栏
  const openCustomSlots = () => {
    let modalId: any;
    modalId = openModal({
      type: 'modal',
      component: UserFormModal,
      props: { width: 460, appendToBody: true },
      componentProps: { hideFooter: true },
      slots: {
        header: () =>
          h('div', { style: 'display:flex;align-items:center;gap:8px' }, [
            h('span', {}, '自定义顶栏'),
            h(ElTag, { type: 'success', size: 'small' }, () => 'New')
          ]),
        footer: () =>
          h(
            'div',
            {
              style:
                'display:flex;justify-content:space-between;align-items:center;width:100%'
            },
            [
              h(
                'span',
                {
                  style: 'font-size:12px;color:var(--el-text-color-secondary)'
                },
                '这是自定义底栏左侧内容'
              ),
              h('div', { style: 'display:flex;gap:8px' }, [
                h(
                  ElButton,
                  { onClick: () => closeModal(modalId) },
                  () => '关闭'
                ),
                h(
                  ElButton,
                  { type: 'primary', onClick: () => closeModal(modalId) },
                  () => '确定'
                )
              ])
            ]
          )
      }
    });
  };
</script>

<template>
  <eui-card header="useModal 函数式操作弹窗">
    <eui-text block type="secondary" style="margin-bottom: 16px">
      useModal 可直接传递组件纯 js
      方法打开弹窗，并且对上下文、生命周期都做了完美处理。
    </eui-text>

    <div class="demo-row">
      <el-button type="primary" @click="openAdd">打开弹窗</el-button>
      <el-button @click="openDrawer">打开抽屉</el-button>
      <el-button @click="openNoMask">打开无遮罩层弹窗</el-button>
      <el-button @click="openWithData">传递数据及监听保存成功事件</el-button>
      <el-button @click="openKeepAlive">页面关闭后仍然保持弹窗打开</el-button>
      <el-button @click="openCustomSlots">自定义弹窗的顶栏、底栏</el-button>
    </div>

    <div
      v-if="savedData"
      style="
        margin-top: 12px;
        padding: 12px;
        background: var(--el-fill-color-light);
        border-radius: 4px;
        font-size: 13px;
      "
    >
      <div style="margin-bottom: 4px; color: var(--el-text-color-secondary)"
        >监听到保存数据：</div
      >
      <pre style="margin: 0">{{ JSON.stringify(savedData, null, 2) }}</pre>
    </div>

    <ModalHolder />
  </eui-card>
</template>

<style scoped>
  .demo-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
</style>
