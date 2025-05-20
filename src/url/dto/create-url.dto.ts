import { IsNumber, IsString } from "class-validator";

export class CreateUrlDto {

    @IsString()
    originalUrl: string;

    @IsString()
    shortUrl: string;

    @IsNumber()
    userId: number;

    @IsNumber()
    clickCount: number;

}
