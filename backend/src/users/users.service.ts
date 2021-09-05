import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save(createUserDto);
      return {
        newUser,
        message: 'This action adds a new user',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logIn({
    name,
    email,
    password,
  }: {
    name?: string;
    email?: string;
    password?: string;
  }) {
    try {
      const findUser = await this.usersRepository.findOne({
        where: {
          email,
        },
        select: ['id', 'name', 'email', 'password'],
      });

      this.logger.log({ ...findUser });

      if (!findUser) {
        throw 'not found user';
      }

      console.log(password, findUser);
      if (password !== findUser.password) {
        throw 'mismatch pasword';
      }
      return findUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
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

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'name', 'email', 'password'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
