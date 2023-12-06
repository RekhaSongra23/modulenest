import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthenModule } from './authen/authen.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthenModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
 
})
export class AppModule {
  
}
