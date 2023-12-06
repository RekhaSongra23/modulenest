import { Module, Global } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersServices } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{name :User.name ,schema :UserSchema}])],
  controllers: [UsersController],
  providers: [usersServices],
//   exports: [usersServices],
})
export class UsersModule {}
