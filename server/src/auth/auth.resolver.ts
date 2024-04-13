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
      return { token: token, user: user };
    }

    return { token: '', user: user };
  }

  @ResolveField('user')
  async user(@Parent() auth) {
    return auth.user;
  }
}
