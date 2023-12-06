declare namespace Permissions {
  interface CreateParams {
    name: string;
    action: string;
    path: string;
    permissionGroupId: number;
  }
  interface Entity {
    id: number;
    name: string;
    action: string;
    path: string;
    createdAt: string;
    updatedAt: string;
    permissionGroup: Menus.MenusType;
    permissionGroupId: number;
  }
}
