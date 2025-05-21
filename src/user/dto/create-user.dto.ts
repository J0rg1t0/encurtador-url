import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @ApiProperty({ example: 'john_doe@mail.com' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'password123' })
    password: string;
    

}
