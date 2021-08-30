import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, age } = createUserDto;
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;

    try {
      const newUser = await this.usersRepository.save(user);
      return {
        newUser,
        message: 'This action adds a new user',
      };
    } catch (error) {
      return {
        message: error,
      };
    }
  }

  async findAll() {
    const allUser = await this.usersRepository.find();
    return {
      users: allUser,
      message: `This action returns all users`,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
