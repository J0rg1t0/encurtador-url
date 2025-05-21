import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @Public()
  login(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

}
