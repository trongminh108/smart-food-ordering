import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { USER, UserSchema } from './user.schema';
import { AgentModule } from 'src/agent/agent.module';
import { DeliverModule } from 'src/deliver/deliver.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER.name, schema: UserSchema }]),
    AgentModule,
    forwardRef(() => DeliverModule),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService, UserResolver],
})
export class UserModule {}
