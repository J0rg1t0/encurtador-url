import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { generateRandomString } from './url.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
    private config: ConfigService
  ) { }

  getBaseUrl(): string {
    const host = this.config.get<string>('HOST') || 'localhost';
    const port = this.config.get<string>('PORT') || '3000';
    return `http://${host}:${port}`;
  }

  async create(createUrlDto: CreateUrlDto, userId?: number) {
    try {
      createUrlDto.userId = userId ? userId : createUrlDto.userId;

      const existingUrl = await this.urlRepository.findOne({
        where: { originalUrl: createUrlDto.originalUrl },
      });

      if (!existingUrl) {
        do {
          createUrlDto.shortUrl = generateRandomString();
        } while (await this.findOneByShortUrl(createUrlDto.shortUrl));

        await this.urlRepository.save(createUrlDto);
      }

      return `${this.getBaseUrl()}/${existingUrl ? existingUrl.shortUrl : createUrlDto.shortUrl}`;

    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    return await this.urlRepository.find();
  }

  async findAllByUserId(userId: number) {
    return await this.urlRepository.find({ where: { userId } });
  }

  async findOneByShortUrl(shortUrl: string) {
    const originalUrl = await this.urlRepository.findOne({
      where: { shortUrl, deletedAt: IsNull() },
    });
    if (originalUrl) {
      originalUrl.clickCount += 1;
      await this.urlRepository.save(originalUrl);
      return originalUrl.originalUrl;
    } else{
      throw new Error('URL not found');
    }
  }

  async update(id: number, updateUrlDto: UpdateUrlDto, userId: number) {
    const url = await this.urlRepository.findOne({ where: { id, userId, deletedAt: IsNull() } });
    if (!url) {
      throw new Error('URL not found or you do not have permission to update it');
    }
    return await this.urlRepository.update(id, updateUrlDto);
  }

  async updateClickCount(id: number) {
    const url = await this.urlRepository.findOne({ where: { id } });
    if (url) {
      url.clickCount += 1;
      return await this.urlRepository.save(url);
    }
    throw new Error('URL not found');
  }


  async remove(id: number, userId: number) {
    const url = await this.urlRepository.findOne({ where: { id, userId, deletedAt: IsNull() } });
    if (!url) {
      throw new Error('URL not found or you do not have permission to update it');
    }
    return await this.urlRepository.update(id, {
      deletedAt: new Date(),
    });
  }

}
