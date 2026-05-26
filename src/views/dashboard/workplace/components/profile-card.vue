<!-- 用户信息 -->
<template>
  <eui-card :body-style="{ padding: '20px' }">
    <div class="profile-wrapper">
      <div class="profile-main">
        <el-avatar :size="68" :src="loginUser.avatar" class="profile-avatar" />
        <div class="profile-body">
          <eui-text size="xl" type="heading" style="font-weight: normal">
            早安, {{ loginUser.nickname }}, 又是为五斗米折腰的一天!
          </eui-text>
          <eui-text type="secondary" :icon="SunOutlined">
            只要我修 Bug 够快，孤独就追不上我。
          </eui-text>
        </div>
      </div>
      <div class="profile-count">
        <div class="profile-count-item">
          <div class="profile-count-header">
            <el-tag size="large" :disable-transitions="true">
              <el-icon>
                <briefcase />
              </el-icon>
            </el-tag>
            <span class="profile-count-name">剩余发量</span>
          </div>
          <eui-text size="xl" type="heading" style="font-weight: normal">
            3%
          </eui-text>
        </div>
        <div class="profile-count-item">
          <div class="profile-count-header">
            <el-tag size="large" type="warning" :disable-transitions="true">
              <el-icon>
                <checked />
              </el-icon>
            </el-tag>
            <span class="profile-count-name">未解之谜</span>
          </div>
          <eui-text size="xl" type="heading" style="font-weight: normal">
            99+
          </eui-text>
        </div>
        <div class="profile-count-item">
          <div class="profile-count-header">
            <el-tag size="large" type="success" :disable-transitions="true">
              <el-icon>
                <bell-filled />
              </el-icon>
            </el-tag>
            <span class="profile-count-name">心跳频率</span>
          </div>
          <eui-text size="xl" type="heading" style="font-weight: normal">
            140 bpm
          </eui-text>
        </div>
      </div>
    </div>
  </eui-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Briefcase, Checked, BellFilled } from '@element-plus/icons-vue';
  import { SunOutlined } from '@/components/icons';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();

  /** 当前登录用户信息 */
  const loginUser = computed(() => userStore.info ?? {});
</script>

<style lang="scss" scoped>
  .profile-wrapper {
    display: flex;
    align-items: center;

    .profile-main {
      flex: 1;
      display: flex;
      align-items: center;
      overflow: hidden;

      .profile-avatar {
        flex-shrink: 0;
      }

      .profile-body {
        flex: 1;
        padding-left: 12px;
        box-sizing: border-box;
      }

      h4 {
        margin-bottom: 6px;
      }
    }
  }

  .profile-count {
    flex-shrink: 0;
    text-align: right;
    white-space: nowrap;

    .profile-count-item {
      display: inline-block;
      margin: 0 4px 0 24px;

      .el-tag {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        line-height: 0;
        padding: 0;
      }

      .profile-count-name {
        margin-left: 8px;
      }

      .profile-count-header {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
      }
    }
  }

  @media screen and (max-width: 992px) {
    .profile-count .profile-count-item {
      margin: 0 2px 0 12px;
    }
  }

  @media screen and (max-width: 768px) {
    .profile-wrapper {
      display: block;

      .profile-count {
        margin-top: 14px;
      }
    }
  }
</style>
