import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  @ApiBearerAuth()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
