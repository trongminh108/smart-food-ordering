import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { USER, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
