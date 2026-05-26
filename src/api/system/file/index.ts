import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { FileRecord, FileRecordParam } from './model';
import type { AxiosRequestConfig } from 'axios';

/**
 * 上传文件
 * @param file 文件
 */
export async function uploadFile(file: File, config?: AxiosRequestConfig) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.post<ApiResult<FileRecord>>(
    '/files/upload',
    formData,
    config
  );
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 上传base64文件
 * @param base64 base64数据
 * @param fileName 文件名称
 */
export async function uploadBase64File(base64: string, fileName?: string) {
  const formData = new FormData();
  formData.append('base64', base64);
  if (fileName) {
    formData.append('fileName', fileName);
  }
  const res = await request.post<ApiResult<FileRecord>>(
    '/files/upload/base64',
    formData
  );
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页查询文件上传记录
 */
export async function pageFiles(params: FileRecordParam) {
  const res = await request.get<ApiResult<PageResult<FileRecord>>>('/files', {
    params
  });
  if (res.data.code === 200) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除文件
 */
export async function removeFile(id?: string) {
  const res = await request.delete<ApiResult<unknown>>('/files/' + id);
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除文件
 */
export async function removeFiles(data: (string | undefined)[]) {
  const res = await request.delete<ApiResult<unknown>>('/files/batch-delete', {
    data
  });
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
