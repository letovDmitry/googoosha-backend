import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController, UserController],
    providers: [AuthService],
})
export class UserModule {}
