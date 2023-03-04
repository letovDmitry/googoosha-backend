import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MatchingModule } from './matching/matching.module';
import { MulterModule } from '@nestjs/platform-express';
import { MessagesModule } from './messages/messages.module';
import { AppGateway } from './app.gateway';
import { MessagesService } from './messages/messages.service';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, MulterModule.register({
    dest: './upload',
  }), ConfigModule.forRoot({ isGlobal: true }), MatchingModule, MessagesModule],
  providers: [AppGateway, MessagesService]
})
export class AppModule {}
