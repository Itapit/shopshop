import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { jwtConstants } from './jwt.constants';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '300000s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, RolesGuard],
    exports: [AuthGuard, RolesGuard],
})
export class AuthModule {}
