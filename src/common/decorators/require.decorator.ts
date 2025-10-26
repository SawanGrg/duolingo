import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permissions';

export const RequiredPermissions = (...permissions: string[]) => {
  return SetMetadata(PERMISSION_KEY, permissions);
};
