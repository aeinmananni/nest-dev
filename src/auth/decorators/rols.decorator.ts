import { SetMetadata } from '@nestjs/common';
import { Rols } from 'src/common/enum/role.enum';

export const ROLS_KEY = 'rols';
export const Roles = (...roles: Rols[]) => SetMetadata(ROLS_KEY, roles);
