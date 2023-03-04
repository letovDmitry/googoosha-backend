import { Controller, Get, UseGuards, Req, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from 'multer'
import { Param } from "@nestjs/common/decorators";
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private userService: UserService) {
        
    }
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @Get('cities')
    getCities() {
        return this.userService.getCities()
    }

    @Post('uploadAvatar')
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
    uploadFile(@UploadedFile() file, @GetUser('id') id: number) {
        return this.userService.uploadAvatar(id, file.filename)
    }
}
