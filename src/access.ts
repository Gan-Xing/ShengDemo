/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

const checkPermission = (currentUser: User.UsersEntity, name: string) => {
  return (
    currentUser &&
    currentUser.roles?.some(
      (role: any) => role.permissions && !!role.permissions.find((item: any) => item.name === name),
    )
  );
};
export default function access(initialState: { currentUser?: User.UsersEntity } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser?.isAdmin,
    canCreateRole:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '新增角色')),
    canDeleteRole:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '删除角色')),
    canEditRole: currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '编辑角色')),
    canShowRole: currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '查看角色')),
    canCreateUser:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '新增用户')),
    canDeleteUser:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '删除用户')),
    canEditUser: currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '编辑用户')),
    canShowUser: currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '查看用户')),

    canCreateMenu:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '新增菜单')),
    canDeleteMenu:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '删除菜单')),
    canEditMenu: currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '编辑菜单')),
    canShowMenu: currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '查看菜单')),

    canCreatePermission:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '新增权限')),
    canDeletePermission:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '删除权限')),
    canEditPermission:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '编辑权限')),
    canShowPermission:
      currentUser && (currentUser?.isAdmin || checkPermission(currentUser, '查看权限')),
  };
}
