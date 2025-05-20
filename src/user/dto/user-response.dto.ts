import { IsNumber, IsString } from "class-validator";

export class UserResponseDto {
    @IsNumber()
    id: number;

    @IsString()
    email: string;

    @IsString()
    createdAt: Date;
    
    @IsString()
    updatedAt: Date;
}