import { Controller, Get, UseGuards, ParseIntPipe, Query, Post, Body, Param } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Get('likesFrom')
  getLikesFrom(@GetUser('id', ParseIntPipe) userId: number) {
    return this.matchingService.getLikesFrom(userId)
  }
  
  @Get('likesTo')
  getLikesTo(@GetUser('id', ParseIntPipe) userId: number) {
    return this.matchingService.getLikesTo(userId)
  }
  
  @Get('friends')
  getFriends(@GetUser('id', ParseIntPipe) userId: number) {
    return this.matchingService.getFriends(userId)
  }
  
  @Get('guests')
  getGuests(@GetUser('id', ParseIntPipe) userId: number) {
    return this.matchingService.getGuests(userId)
  }
  
  @Get(':id')
  getUser(@GetUser('id', ParseIntPipe) userId: number, @Param('id', ParseIntPipe) userToFindId: number) {
    return this.matchingService.getUser(userId, userToFindId)
  }

  @Get()
  findPair(@GetUser('id', ParseIntPipe) userId: number, @Query() queryParams) {
    return this.matchingService.findPair(userId, queryParams)
  }

  @Post('like')
  sendLike(@GetUser('id', ParseIntPipe) userId: number, @Body() dto: { id: number }) {
    return this.matchingService.sendLike(userId, dto.id)
  }

  @Post('removeFromFriends')
  removeFromFriends(@GetUser('id', ParseIntPipe) userId: number, @Body() dto: { id: number }) {
    return this.matchingService.removeFromFriends(userId, dto.id)
  }
}
