import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from 'src/constants/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' }, // Thời gian tồn tại của token
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
