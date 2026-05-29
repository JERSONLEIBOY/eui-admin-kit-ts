import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { EuiAdminResolver } from 'eui-admin-kit/es/utils/resolvers';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  const alias: Record<string, string> = {
    '@/': resolve('src') + '/',
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
  };
  const plugins = [vue(), tailwindcss()];
  if (isBuild) {
    // 组件按需引入
    plugins.push(
      Components({
        dts: false,
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          }),
          EuiAdminResolver({
            importStyle: 'sass'
          })
        ]
      })
    );
  } else {
    // 开发环境全局安装
    alias['./as-needed'] = './global-import';
  }
  return {
    resolve: {
      alias
    },
    plugins,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    build: {
      target: 'chrome63',
      chunkSizeWarningLimit: 2000
    }
  };
});
