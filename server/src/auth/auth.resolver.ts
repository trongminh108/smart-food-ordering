import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/constants';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation('login')
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username, password);

    if (user) {
      const token = await this.authService.generateToken(user);
      user['id'] = user._id;
      return { token: token, user: user };
    }

    return { token: '', user: null };
  }

  @Mutation('register')
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('gmail') gmail: string,
  ) {
    const isExist = await this.authService.isUserExist(username, gmail);
    if (isExist == 0) return { username: 'usernamegmail' };
    else if (isExist == 1) return { username: 'username' };
    else if (isExist == 2) return { username: 'gmail' };
    else {
      const hashPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);
      const res = await this.userService.create({
        username: username,
        password: hashPassword,
        gmail: gmail,
      });
      return res;
    }
  }

  @ResolveField('user')
  async user(@Parent() auth) {
    return auth.user;
  }
}
