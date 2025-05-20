import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { OptionalAuthGuard } from 'src/auth/optional-auth.guard';
import { User } from 'src/user/user.decorator';
import { Public } from 'src/auth/auth.guard';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @Public()
  @UseGuards(OptionalAuthGuard)
  create(@User() user, @Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto, user ? user.id : null);
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':shortUrl')
  findOne(@Param('shortUrl') shortUrl: string) {
    return this.urlService.findOneByShortUrl(shortUrl);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(+id, updateUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.remove(+id);
  }
}
