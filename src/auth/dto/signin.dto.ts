import { IsArray, IsBoolean, IsEmail, IsOptional } from "class-validator"
import { IsNotEmpty, IsString } from "class-validator"

export class SigninDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}