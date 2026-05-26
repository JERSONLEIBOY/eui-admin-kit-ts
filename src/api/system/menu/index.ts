import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { Menu, MenuParam } from './model';

/**
 * 分页查询菜单
 */
export async function pageMenus(params: MenuParam) {
  const res = await request.get<ApiResult<PageResult<Menu>>>('/menu/page', {
    params
  });
  if (res.data.code === 200) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询菜单列表
 */
export async function listMenus(params?: MenuParam) {
  const res = await request.get<ApiResult<Menu[]>>('/menus', {
    params
  });
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加菜单
 */
export async function addMenu(data: Menu) {
  const res = await request.post<ApiResult<unknown>>('/menus', data);
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改菜单
 */
export async function updateMenu(data: Menu, id?: number | string) {
  const res = await request.put<ApiResult<unknown>>('/menus/' + id, data);
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除菜单
 */
export async function removeMenu(id?: number) {
  const res = await request.delete<ApiResult<unknown>>('/menus/' + id);
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
