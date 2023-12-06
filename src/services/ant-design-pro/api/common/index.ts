import type { MenuDataItem } from '@ant-design/pro-components';
import { request } from '@umijs/max';

interface menuResponse {
  success: boolean;
  data: MenuDataItem[];
}

export async function queryList(
  url: string,
  params?: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  sort?: { [key: string]: any },
  filter?: { [key: string]: any },
) {
  return request<Common.ResponseStructure<any>>(url, {
    method: 'GET',
    params: {
      ...params,
      sorter: sort,
      ...filter,
    },
  });
}
/** 新建规则 POST /api/rule */
export async function addItems(url: string, options?: { [key: string]: any }) {
  return request(url, {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
/** 新建规则 PUT /api/rule */
export async function updateItem(url: string, options?: { [key: string]: any }) {
  return request(url, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}
/** 删除规则 DELETE /api/rule */
export async function removeItem(url: string, options?: { [key: string]: any }) {
  return request(url, {
    method: 'DELETE',
    data: {
      ...(options || {}),
    },
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前用户的目录 GET /menu */
export async function fetchMenuData() {
  return request<menuResponse>('/menus/user', {
    method: 'GET',
  });
}
