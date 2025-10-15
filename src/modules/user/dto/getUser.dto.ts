export class GetUserDto {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
}
