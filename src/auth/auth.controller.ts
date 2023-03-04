import { Controller, Post, Body, HttpCode, UseInterceptors, UploadedFile, Res, Get } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";
import { diskStorage } from 'multer'
import { Param } from "@nestjs/common/decorators";
import { GetUser } from "./decorator";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        
    }

    @Post('signup')
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto)
    } 

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto)
    }

    @Get('pictures/:filename')
    async getPicture(@Param('filename') filename, @Res() res) {
        res.sendFile(filename, { root: './uploads' })
    }

}