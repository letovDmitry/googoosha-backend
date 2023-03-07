import { Controller, Get, UseGuards, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GiftsService } from './gifts.service';
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from 'multer'
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  getGifts() {
    return this.giftsService.getGifts()
  }

  @Post()
  createGift(@Body() dto: { cost: number, name: string }) {
    return this.giftsService.createGift(dto)
  }
  @Post('uploadGiftImage')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const name = file.originalname.split('.')[0]
                const extension = file.originalname.split('.')[1]
                const newFileName = name.split(" ").join('_')+'_'+Date.now()+'.'+extension

                cb(null, newFileName)
            }
        })
    }))
    uploadFile(@UploadedFile() file, @Body() dto: { id: string }) {
        return this.giftsService.uploadGiftImage(parseInt(dto.id), file.filename)
    }

    @Post()
    sendGift(@Body() dto: { giftId: number, userToId: number }, @GetUser('id') userId: number) {
      return this.giftsService.sendGift(dto.giftId, userId, dto.userToId)
    }
}
