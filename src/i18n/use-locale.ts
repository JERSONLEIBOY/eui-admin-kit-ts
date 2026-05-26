/**
 * ElementPlus/EuiAdminKit/Dayjs国际化配置
 */
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import { I18N_CACHE_NAME } from '@/config/setting';
import { setPageTitle } from '@/utils/page-title-util';
import type { Language } from 'element-plus/es/locale';
import type { EuiLocale } from 'eui-admin-kit/es/ConfigProvider/types';
// ElementPlus
import zh_CN from 'element-plus/es/locale/lang/zh-cn';
import zh_TW from 'element-plus/es/locale/lang/zh-tw';
import en from 'element-plus/es/locale/lang/en';
// EuiAdminKit
import euiZh_CN from 'eui-admin-kit/es/lang/zh_CN';
import euiZh_TW from 'eui-admin-kit/es/lang/zh_TW';
import euiEn from 'eui-admin-kit/es/lang/en_US';
// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
const elLocales = { zh_CN, zh_TW, en };
const euiLocales = { zh_CN: euiZh_CN, zh_TW: euiZh_TW, en: euiEn };

export function useLocale() {
  const { currentRoute } = useRouter();
  const { locale } = useI18n();
  const elLocale = ref<Language>();
  const euiLocale = ref<EuiLocale>();

  watch(
    locale,
    () => {
      elLocale.value = elLocales[locale.value];
      euiLocale.value = euiLocales[locale.value];
      dayjs.locale(locale.value.toLowerCase().replace(/_/g, '-'));
      setPageTitle(getRouteTitle(currentRoute.value));
    },
    { immediate: true }
  );
  return { elLocale, euiLocale };
}

/**
 * 获取缓存的语言
 */
export function getCacheLang() {
  return localStorage.getItem(I18N_CACHE_NAME) || 'zh_CN';
}

/**
 * 获取缓存的语言
 */
export function setCacheLang(lang?: string) {
  if (!lang) {
    localStorage.removeItem(I18N_CACHE_NAME);
    return;
  }
  localStorage.setItem(I18N_CACHE_NAME, lang);
}

/**
 * 获取路由对应的标题
 * @param route 路由
 */
export function getRouteTitle(route: RouteLocationNormalized) {
  const lang = route.meta?.lang ?? {};
  return lang[getCacheLang()] ?? route.meta?.title;
}
