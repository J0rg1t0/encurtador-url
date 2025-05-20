import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generate } from 'rxjs';
import { generateRandomString } from './url.utils';
import { BASE_URL } from 'src/config/constants';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) { }



  async create(createUrlDto: CreateUrlDto, userId?: number) {
    try {
      createUrlDto.userId = userId ? userId : createUrlDto.userId;
  
      do {
        createUrlDto.shortUrl = generateRandomString();
      } while (this.findOneByShortUrl(createUrlDto.shortUrl));
  
      await this.urlRepository.save(createUrlDto);
      
      return `${BASE_URL}/${createUrlDto.shortUrl}`;
      
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
    return await this.urlRepository.findOne({ where: { shortUrl } });
  }

  async update(id: number, updateUrlDto: UpdateUrlDto) {
    return await this.urlRepository.update(id, updateUrlDto);
  }

  async remove(id: number) {
    return await this.urlRepository.update(id, {
      deletedAt: new Date(),
    });
  }

}
