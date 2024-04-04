import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MONGOOSE_URI } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AgentModule } from './agent/agent.module';
import { DeliverModule } from './deliver/deliver.module';
import { CommentModule } from './comment/comment.module';
import { OrderModule } from './order/order.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { VoucherModule } from './voucher/voucher.module';
import { PaymentDetailsModule } from './payment_details/payment_details.module';
import { FavoriteModule } from './favorite/favorite.module';
import { VouchersProductsModule } from './vouchers_products/vouchers_products.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGOOSE_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./src/**/*.graphql'],
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    AgentModule,
    DeliverModule,
    CommentModule,
    OrderModule,
    OrderDetailsModule,
    VoucherModule,
    PaymentDetailsModule,
    FavoriteModule,
    VouchersProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
