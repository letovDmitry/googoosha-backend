import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditBookmarkDto {
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    link?: string
}