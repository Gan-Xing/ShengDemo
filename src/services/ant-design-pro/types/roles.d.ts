declare namespace Roles {
  interface CreateParams {
    id: string;
    name: string;
    permissions: number[];
  }
  interface Entity {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    permissions: Permissions.Entity[];
    users: User.UsersEntity[];
  }
}
