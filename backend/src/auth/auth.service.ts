import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const findUser = await this.userService.findByEmail(email);

    if (findUser?.password === password) {
      const { password, ...result } = findUser;
      return result;
    }
    return null;
  }
}
