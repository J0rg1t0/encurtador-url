import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Public } from 'src/auth/auth.guard';
import { OptionalAuth } from 'src/auth/optional-auth.decorator';
import { Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('URLs')
@ApiBearerAuth()
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiOperation({ summary: 'Create URL' })
  @ApiResponse({ status: 201, description: 'URL created successfully.' })
  @Public()
  @OptionalAuth()
  create(@Body() createUrlDto: CreateUrlDto, @Request() req) {
    return this.urlService.create(createUrlDto, req.user ? req.user.sub : null);
  }

  @Get('url/get-all-by-user')
  @ApiOperation({ summary: 'Get All URLs by User' })
  @ApiResponse({ status: 200, description: 'List of all URLs by user.' })
  findAll(@Request() req) {
    return this.urlService.findAllByUserId(req.user.sub);
  }

  @Get('/:shortUrl')
  @ApiOperation({ summary: 'Get Original URL by Short URL' })
  @ApiResponse({ status: 200, description: 'Original URL found.' })
  @Public()
  findOne(@Param('shortUrl') shortUrl: string) {
    return this.urlService.findOneByShortUrl(shortUrl);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User URL' })
  @ApiResponse({ status: 200, description: 'URL updated successfully.' })
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto, @Request() req) {
    return this.urlService.update(+id, updateUrlDto, req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User URL' })
  @ApiResponse({ status: 200, description: 'URL deleted successfully.' })
  remove(@Param('id') id: string, @Request() req) {
    return this.urlService.remove(+id, req.user.sub);
  }
}
