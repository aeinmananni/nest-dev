import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstance } from './constance';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: jwtConstance.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ], // استفاده کنیمusersModule  میتوانیم با این روش از سرویس های
  exports: [AuthService],
})
export class AuthModule {}
