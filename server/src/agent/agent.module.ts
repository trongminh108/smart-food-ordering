import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentResolver } from './agent.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AGENT, AgentSchema } from './agent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AGENT.name, schema: AgentSchema }]),
  ],
  providers: [AgentResolver, AgentService],
})
export class AgentModule {}
