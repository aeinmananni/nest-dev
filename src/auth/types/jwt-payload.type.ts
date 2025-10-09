// src/auth/types/jwt-payload.type.ts
export type JwtPayloadType = {
  id: number;
  firstName?: string;
  iat?: number; // اختیاری، از طرف JWT اضافه میشه
  exp?: number;
};
