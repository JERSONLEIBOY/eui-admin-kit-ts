<template>
  <eui-card>
    <div class="info-user">
      <div class="info-user-avatar" @click="openCropper">
        <el-avatar :size="100" :src="data.avatar" />
        <el-icon class="info-user-avatar-icon">
          <CloudUploadOutlined style="stroke-width: 3" />
        </el-icon>
      </div>
      <eui-text size="xxl" style="margin-top: 5px">
        {{ data.nickname }}
      </eui-text>
      <eui-text type="placeholder">
        {{ data.introduction || '此人已修仙，凡间琐事概不回复~' }}
      </eui-text>
    </div>
    <div class="info-list">
      <div class="info-item">
        <el-icon>
          <UserOutlined />
        </el-icon>
        <div class="info-item-text">资深像素搬运工 (Bug 制造机)</div>
      </div>
      <div class="info-item">
        <el-icon>
          <CityOutlined style="transform: translateY(-1px)" />
        </el-icon>
        <div class="info-item-text">宇宙搬砖总舵 - 头发消失部</div>
      </div>
      <div class="info-item">
        <el-icon>
          <EnvironmentOutlined />
        </el-icon>
        <div class="info-item-text">地球村 · 某个有 WiFi 的角落</div>
      </div>
      <div class="info-item">
        <el-icon>
          <TagOutlined style="transform: translateY(-1px)" />
        </el-icon>
        <div class="info-item-text">精通 Google 搜索与 Stack Overflow</div>
      </div>
    </div>
    <el-divider border-style="dashed" style="margin: 0" />
    <eui-text size="md" style="margin-top: 16px">江湖标签</eui-text>
    <div class="info-tags" style="margin-top: 12px">
      <el-tag type="info" size="small" :disable-transitions="true">
        脑洞比黑洞大
      </el-tag>
      <el-tag type="info" size="small" :disable-transitions="true">
        像素级强迫症
      </el-tag>
      <el-tag type="info" size="small" :disable-transitions="true">
        微辣也是辣
      </el-tag>
      <el-tag type="info" size="small" :disable-transitions="true">
        腿长一米八
      </el-tag>
      <el-tag type="info" size="small" :disable-transitions="true">
        火锅外交官
      </el-tag>
      <el-tag type="info" size="small" :disable-transitions="true">
        饭量海纳百川
      </el-tag>
    </div>
    <!-- 头像裁剪弹窗 -->
    <eui-cropper-modal
      v-model="visible"
      :src="data.avatar"
      :options="{
        aspectRatio: 1,
        autoCropArea: 1,
        viewMode: 1,
        dragMode: 'move'
      }"
      :modal-props="{ destroyOnClose: true }"
      @done="onCrop"
    />
  </eui-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    CloudUploadOutlined,
    UserOutlined,
    CityOutlined,
    EnvironmentOutlined,
    TagOutlined
  } from '@/components/icons';
  import { EuiMessage } from 'eui-admin-kit/es';
  import { updateUserInfo } from '@/api/layout';
  import type { User } from '@/api/system/user/model';

  defineProps<{
    data: User;
  }>();

  const emit = defineEmits<{
    (e: 'done', value: User): void;
  }>();

  /** 是否显示裁剪弹窗 */
  const visible = ref(false);

  /** 打开图片裁剪 */
  const openCropper = () => {
    visible.value = true;
  };

  /** 头像裁剪完成回调 */
  const onCrop = (result: string) => {
    const loading = EuiMessage.loading({
      message: '请求中..',
      plain: true
    });
    updateUserInfo({ avatar: result })
      .then((data) => {
        loading.close();
        visible.value = false;
        EuiMessage.success('修改成功');
        emit('done', data);
      })
      .catch((e) => {
        loading.close();
        EuiMessage.error(e.message);
      });
  };
</script>

<style lang="scss" scoped>
  .info-user {
    padding-top: 8px;
    box-sizing: border-box;
    text-align: center;

    .info-user-avatar {
      display: inline-block;
      position: relative;
      cursor: pointer;
      line-height: 0;

      .info-user-avatar-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 30px;
        display: none;
        z-index: 2;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: transparent;
        transition: background-color 0.3s;
      }

      &:hover {
        .info-user-avatar-icon {
          display: block;
        }

        &::after {
          background-color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  .info-list {
    margin: 35px 0 24px 0;

    .info-item {
      display: flex;
      align-items: center;

      & > .el-icon {
        font-size: 16px;
      }

      .info-item-text {
        flex: 1;
        padding-left: 8px;
        box-sizing: border-box;
      }

      & + .info-item {
        margin-top: 10px;
      }
    }
  }

  .info-tags .el-tag {
    margin: 0 12px 8px 0;
  }
</style>
