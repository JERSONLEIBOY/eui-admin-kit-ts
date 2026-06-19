/** 全局安装(开发环境) */
import type { App, Plugin } from 'vue';
import ElementPlus from 'element-plus/es';
import EuiAdminPlus from 'eui-admin-kit/es';
import 'element-plus/theme-chalk/src/index.scss';
import 'eui-admin-kit/es/style/index.scss';
import 'xgplayer/dist/index.min.css';

const installer: Plugin = {
  install(app: App) {
    app.use(ElementPlus);
    app.use(EuiAdminPlus);
  }
};

export default installer;
