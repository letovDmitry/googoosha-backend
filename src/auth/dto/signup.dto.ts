import { IsArray, IsBoolean, IsEmail, IsOptional } from "class-validator"
import { IsNotEmpty, IsString } from "class-validator"

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    dateOfBirth: string

    @IsArray()
    @IsNotEmpty()
    pointOfDate: string[]

    @IsString()
    @IsNotEmpty()
    familyStatus: string

    @IsString()
    @IsNotEmpty()
    info: string

    @IsBoolean()
    @IsNotEmpty()
    children: boolean

    @IsBoolean()
    @IsNotEmpty()
    sex: boolean
}