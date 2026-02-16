export enum UserRole {
  ADMIN = 'admin',
  VETERINARIO = 'veterinario',
}

export interface JwtPayload {
  id: string;
  username: string;
  role: UserRole;
}
