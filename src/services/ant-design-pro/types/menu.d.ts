declare namespace Menus {
  interface MenusType {
    id: number;
    name: string;
    parentId: number | null;
    path: string;
    createdAt: string;
    updatedAt: string;
    permissions: Permissions.Entity[];
    parent: MenusType | null;
    children: MenusType[] | null;
  }
}
