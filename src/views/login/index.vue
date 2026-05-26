<template>
  <div class="login-wrapper">
    <eui-card shadow="always" class="login-card">
      <div class="login-cover">
        <h1 class="login-title">Eui Admin Kit</h1>
        <h4 class="login-subtitle">一款兼具设计美学与高效开发的后台系统</h4>
      </div>
      <div class="login-body">
        <eui-text type="heading" style="font-size: 24px; margin-bottom: 18px">
          {{ t('login.title') }}
        </eui-text>
        <eui-segmented
          v-model="tabActive"
          :items="[
            { label: t('login.passwordType'), value: 1 }
            // { label: t('login.qrcodeType'), value: 2 }
          ]"
          style="margin-bottom: 18px"
          @change="onTabChange"
        />
        <el-form
          v-if="tabActive == 1"
          ref="formRef"
          size="large"
          :model="form"
          :rules="rules"
          @keyup.enter="submit"
          @submit.prevent=""
        >
          <el-form-item prop="username">
            <el-input
              clearable
              v-model="form.username"
              :placeholder="t('login.username')"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              v-model="form.password"
              :placeholder="t('login.password')"
            />
          </el-form-item>
          <el-form-item prop="code">
            <div class="login-captcha-group">
              <el-input
                clearable
                v-model="form.captchaCode"
                :placeholder="t('login.code')"
              />
              <div class="login-captcha" @click="changeCaptcha">
                <img v-if="captcha" :src="captcha" />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.remember">
              {{ t('login.remember') }}
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              size="large"
              type="primary"
              :loading="loading"
              style="width: 100%"
              @click="submit"
            >
              {{ t('login.login') }}
            </el-button>
          </el-form-item>
        </el-form>
        <div v-else class="login-qrcode-group">
          <eui-qr-code-svg
            :size="180"
            :margin="2"
            :value="qrcode"
            class="login-qrcode"
          />
          <div style="margin-top: 16px; cursor: pointer" @click="refreshQrCode">
            <el-icon :size="15" style="vertical-align: -2px; margin-right: 6px">
              <ReloadOutlined />
            </el-icon>
            <span>{{ t('login.refreshQrcode') }}</span>
          </div>
        </div>
      </div>
    </eui-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, unref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { EuiMessage } from 'eui-admin-kit/es';
  import type { FormInstance, FormRules } from 'element-plus';
  import {
    // UserOutlined,
    // LockOutlined,
    // ProtectOutlined,
    ReloadOutlined
  } from '@/components/icons';
  import { getToken } from '@/utils/token-util';
  import { usePageTab } from '@/utils/use-page-tab';
  import { login, getCaptcha } from '@/api/login';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const { goHomeRoute, cleanPageTabs } = usePageTab();

  /** 页签选中 */
  const tabActive = ref(1);

  /** 表单 */
  const formRef = ref<FormInstance>();

  /** 加载状态 */
  const loading = ref(false);

  /** 表单数据 */
  const form = reactive({
    username: '',
    password: '',
    captchaCode: '',
    captchaId: '',
    remember: true
  });

  /** 表单验证规则 */
  const rules = computed<FormRules>(() => {
    return {
      username: [
        {
          required: true,
          message: t('login.username'),
          type: 'string',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: t('login.password'),
          type: 'string',
          trigger: 'blur'
        }
      ],
      captchaCode: [
        {
          required: true,
          message: t('login.code'),
          type: 'string',
          trigger: 'blur'
        }
      ]
    };
  });

  /** 图形验证码 */
  const captcha = ref('');

  /** 二维码 */
  const qrcode = ref('');

  /** 提交 */
  const submit = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      login(form)
        .then((msg) => {
          EuiMessage.success(msg);
          cleanPageTabs();
          goHome();
        })
        .catch((e: Error) => {
          loading.value = false;
          EuiMessage.error(e.message);
          changeCaptcha();
        });
    });
  };

  /** 获取图形验证码 */
  const changeCaptcha = () => {
    getCaptcha()
      .then((data) => {
        captcha.value = data.base64;
        // 自动回填验证码, 实际项目去掉
        form.captchaId = data.captchaId;
        formRef.value?.clearValidate?.();
      })
      .catch((e) => {
        EuiMessage.error(e.message);
      });
  };

  /** 刷新二维码 */
  const refreshQrCode = () => {
    qrcode.value = `https://api.eleadmin.com/v2/auth/login?code=${Date.now()}`;
  };

  /** 选项卡切换事件 */
  const onTabChange = (active: number) => {
    if (active === 2) {
      refreshQrCode();
    }
  };

  /** 跳转到首页 */
  const goHome = () => {
    const { query } = unref(currentRoute);
    goHomeRoute(query.from as string);
  };

  // 如果已登录直接进入首页
  if (getToken()) {
    goHome();
  } else {
    changeCaptcha();
  }
</script>

<style lang="scss" scoped>
  .login-wrapper {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('@/assets/img/login/login-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .login-card {
      width: 920px;
      max-width: 100%;
      overflow: hidden;

      :deep(.eui-card-body) {
        display: flex;
        padding: 0;
        height: 462px;
      }
    }
  }

  .login-cover {
    flex: 1;
    padding: 32px 8px;
    box-sizing: border-box;
    background-color: #1681fd;
    background-image: url('@/assets/img/login/login-img.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
    text-align: center;
  }

  .login-body {
    width: 400px;
    flex-shrink: 0;
    padding: 32px 48px 0 48px;
    box-sizing: border-box;

    :deep(.el-checkbox) {
      height: auto;

      .el-checkbox__label {
        color: inherit;
      }
    }

    :deep(.el-input__prefix-inner > .el-icon) {
      margin-right: 12px;
      transform: scale(1.16);
    }
  }

  /* 验证码 */
  .login-captcha-group {
    width: 100%;
    display: flex;
    align-items: center;

    :deep(.el-input) {
      flex: 1;
    }

    .login-captcha {
      flex-shrink: 0;
      width: 108px;
      height: 40px;
      margin-left: 8px;
      border-radius: var(--el-border-radius-base);
      border: 1px solid var(--el-border-color);
      transition: border 0.2s;
      box-sizing: border-box;
      background: #fff;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }

      &:hover {
        border-color: var(--el-color-primary);
      }
    }
  }

  /* 标题 */
  .login-title {
    color: rgba(255, 255, 255, 0.98);
    font-size: 28px;
    margin: 0 0 6px 0;
    font-weight: normal;
    letter-spacing: 1.2px;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', 'Noto Color Emoji';
  }

  .login-subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    margin: 0;
    font-weight: normal;
    letter-spacing: 4px;
  }

  /* 二维码 */
  .login-qrcode-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0;
  }

  .login-qrcode {
    font-size: 0;
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
  }

  /* 小屏幕适应 */
  @media screen and (max-width: 680px) {
    .login-wrapper {
      padding: 0;
      display: block;
      background: #fff;

      .login-card {
        width: 100%;
        background: none;
        box-shadow: none;
        border-radius: 0;

        :deep(.eui-card-body) {
          display: block;
          height: auto;
        }
      }
    }

    .login-cover {
      padding: 20px 12px 100px 12px;
      background-size: auto 100px;
    }

    .login-body {
      width: 100%;
    }
  }
</style>

<style lang="scss">
  html.dark .login-wrapper {
    background: #000;
  }
</style>
