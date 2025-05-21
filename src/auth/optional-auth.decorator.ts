import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { OptionalAuthGuard } from './optional-auth.guard';

export const OPTIONAL_AUTH_KEY = 'isOptionalAuth';

export function OptionalAuth() {
  return applyDecorators(
    UseGuards(OptionalAuthGuard),
    SetMetadata(OPTIONAL_AUTH_KEY, true),
  );
}