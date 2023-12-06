declare namespace User {
  interface UsersEntity {
    id: number;
    email: string;
    password: string;
    status: string;
    username: string;
    avatar: string;
    gender: string;
    isAdmin: boolean;
    departmentId: number;
    createdAt: Date;
    updatedAt: Date;
    roles: any;
    articles: any;
  }

  interface BaseCreateUserParams {
    email: string;
    password: string;
  }

  type CreateUserParams = BaseCreateUserParams & Partial<Omit<UsersEntity, 'email' | 'password'>>;

  type UpdateUserParams = Partial<UsersEntity>;
}
