import { join } from 'path';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AgentModule } from './agent/agent.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { MONGOOSE_URI } from './constants';
import { DeliverModule } from './deliver/deliver.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FileUploadModule } from './file_upload/file_upload.module';
import { OrderModule } from './order/order.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { PaymentDetailsModule } from './payment_details/payment_details.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { VoucherModule } from './voucher/voucher.module';
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/files', // Prefix tương tự như trong đoạn mã của bạn
      serveStaticOptions: {
        index: false, // Tắt hiển thị tệp index.html
      },
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
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
