import type { User } from '../../system/user/model';

/**
 * 登录参数
 */
export interface LoginParam {
  /** 账号 */
  username?: string;
  /** 密码 */
  password?: string;
  /** 验证码 */
  captchaCode?: string;
  /** 验证码id */
  captchaId?: string;
  /** 是否记住密码 */
  remember?: boolean;
}

/**
 * 登录返回结果
 */
export interface LoginResult {
  /** token */
  token?: string;
  /** 用户信息 */
  user?: User;
}

/**
 * 图形验证码返回结果
 */
export interface CaptchaResult {
  /** 图形验证码base64数据 */
  base64: string;
  /** 验证码id */
  captchaId: string;
}
