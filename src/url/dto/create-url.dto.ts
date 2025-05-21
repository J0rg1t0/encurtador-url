import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUrlDto {

    @IsString()
    @ApiProperty({ example: 'https://www.example.com' })
    originalUrl: string;

    @IsString()
    @ApiProperty({ example: 'https://HOST:PORT/abc123' })
    shortUrl: string;

    @IsNumber()
    @ApiProperty({ example: 1 })
    userId: number;

}
