import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { DictionaryData, DictionaryDataParam } from './model';

/**
 * 分页查询字典数据
 */
export async function pageDictionaryData(params: DictionaryDataParam) {
  const res = await request.get<ApiResult<PageResult<DictionaryData>>>(
    '/dictionaries/data/page',
    { params }
  );
  if (res.data.code === 200) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询字典数据列表
 */
export async function listDictionaryData(params: DictionaryDataParam) {
  const res = await request.get<ApiResult<DictionaryData[]>>(
    '/dictionaries/data',
    {
      params
    }
  );
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加字典数据
 */
export async function addDictionaryData(data: DictionaryData) {
  const res = await request.post<ApiResult<unknown>>(
    '/dictionaries/data',
    data
  );
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改字典数据
 */
export async function updateDictionaryData(data: DictionaryData, id?: string) {
  const res = await request.put<ApiResult<unknown>>(
    '/dictionaries/data/' + id,
    data
  );
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除字典数据
 */
export async function removeDictionaryData(id?: string) {
  const res = await request.delete<ApiResult<unknown>>(
    '/dictionaries/data/' + id
  );
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除字典数据
 */
export async function removeDictionaryDataBatch(data: (string | undefined)[]) {
  const res = await request.delete<ApiResult<unknown>>('/dictionaries/data', {
    data
  });
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
