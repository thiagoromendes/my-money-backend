import { Role } from 'src/auth/roles/role';

export class CreateUserDto {
  id: string;
  fullName: string;
  email: string;
  roles: Role;
  createdAt: Date;
  updatedAt: Date;
}
