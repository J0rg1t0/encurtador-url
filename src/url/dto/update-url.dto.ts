import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {

    @IsNumber()
    @ApiProperty({ example: 1 })
    clickCount: number;
}