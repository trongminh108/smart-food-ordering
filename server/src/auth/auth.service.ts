import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user.toObject();
      return result;
    }
    // throw new Error('Invalid username or password');
    return null;
  }

  async isUserExist(username: string, gmail: string) {
    const user = await this.userService.findByUsername(username);
    const userByGmail = await this.userService.findByGmail(gmail);
    if (user && userByGmail) return 0;
    if (user) return 1;
    if (userByGmail) return 2;
    return -1;
  }

  async generateToken(user: any) {
    const payload = { user: user, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async decodeJWT(token) {
    return await this.jwtService.decode(token);
  }

  async verifyJWT(token) {
    return await this.jwtService.verify(token);
  }
}
