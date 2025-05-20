import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly saltRounds: number = 10;
  
  async create(createUserDto: CreateUserDto) {
    const createUser = await this.userRepository.save({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, this.saltRounds),
    });
    const { password, ...result } = createUser;
    return result;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  } 

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
