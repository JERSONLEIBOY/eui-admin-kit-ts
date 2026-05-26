import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { LoginRecord, LoginRecordParam } from './model';

/**
 * 分页查询登录日志
 */
export async function pageLoginRecords(params: LoginRecordParam) {
  const res = await request.get<ApiResult<PageResult<LoginRecord>>>(
    '/logs/login-logs/page',
    { params }
  );
  if (res.data.code === 200) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询登录日志列表
 */
export async function listLoginRecords(params?: LoginRecordParam) {
  const res = await request.get<ApiResult<LoginRecord[]>>('/logs/login-logs', {
    params
  });
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
