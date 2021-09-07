import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const findUser = await this.userService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      const { password, ...result } = findUser;
      return result;
    }
    return null;
  }
}
