import { Controller, Get, Post, UseGuards, ParseIntPipe, Param, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('chat')
  getChats(@GetUser('id', ParseIntPipe) userId: number) {
    return this.messagesService.getChats(userId)
  }

  @Get('messages/:id')
  getMessages(@Param('id', ParseIntPipe) chatId: number) {
    return this.messagesService.getMessages(chatId)
  }

  @Post('chat')
  createChat(@GetUser('id', ParseIntPipe) user1Id: number, @Body() dto: { id: number }) {
    return this.messagesService.createChat(user1Id, dto.id)
  }

}
