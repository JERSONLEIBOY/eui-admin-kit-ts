/** 按需引入(生产环境) */
import type { App, Plugin } from 'vue';
// 引入 ProForm 的 div 的 tag 组件样式
import 'element-plus/es/components/collapse/style/index';
import 'element-plus/es/components/collapse-item/style/index';
// 引入表单构建模板库的 div 高级示例用到的组件样式
import 'element-plus/es/components/carousel/style/index';
import 'element-plus/es/components/carousel-item/style/index';
import 'eui-admin-kit/es/AdminLayout/style/index';
import 'eui-admin-kit/es/Steps/style/index';

const installer: Plugin = {
  install(_app: App) {}
};

export default installer;
