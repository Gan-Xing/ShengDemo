declare namespace Auth {
  type Token = {
    accessToken: string; // 访问令牌
    refreshToken: string; // 刷新令牌
    accessExpiresIn: number;
    refreshExpiresIn: number;
  };
  type RefreshTokenDto = {
    refreshToken: string;
  };
}
