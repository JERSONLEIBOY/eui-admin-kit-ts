import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { Role, RoleParam } from './model';
import type { Menu } from '../menu/model';

/**
 * 分页查询角色
 */
export async function pageRoles(params: RoleParam) {
  const res = await request.get<ApiResult<PageResult<Role>>>('/roles/page', {
    params
  });
  if (res.data.code === 200) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询角色列表
 */
export async function listRoles(params?: RoleParam) {
  const res = await request.get<ApiResult<Role[]>>('/roles', {
    params
  });
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加角色
 */
export async function addRole(data: Role) {
  const res = await request.post<ApiResult<unknown>>('/roles', data);
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改角色
 */
export async function updateRole(data: Role, id?: string) {
  const res = await request.put<ApiResult<unknown>>('/roles/' + id, data);
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除角色
 */
export async function removeRole(id?: string) {
  const res = await request.delete<ApiResult<unknown>>('/roles/' + id);
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除角色
 */
export async function removeRoles(data: (string | undefined)[]) {
  const res = await request.delete<ApiResult<unknown>>('/roles/batch', {
    data
  });
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取角色分配的菜单
 */
export async function listRoleMenus(roleId?: string) {
  const res = await request.get<ApiResult<Menu[]>>(
    '/roles/' + roleId + '/menus'
  );
  if (res.data.code === 200) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改角色菜单
 */
export async function updateRoleMenus(roleId?: string, data?: string[]) {
  const res = await request.put<ApiResult<unknown>>(
    '/roles/' + roleId + '/menus',
    data
  );
  if (res.data.code === 200) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
