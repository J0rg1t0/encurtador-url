import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @ApiProperty({ example: 'john_doe@mail.com' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'password123' })
    password: string;
    
}
