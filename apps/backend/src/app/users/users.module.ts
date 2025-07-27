import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/users.repository';
import { UserSchema, UserSchemaFactory } from './repository/user.schema';
import { USERS_REPOSITORY } from './repository/users-repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchemaFactory },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [
    UsersService,
    USERS_REPOSITORY,
  ],
})
export class UsersModule {}
