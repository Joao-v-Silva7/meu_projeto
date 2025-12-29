import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDto } from './user.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    create(@Body() user: UserDto) {
      this.userService.create(user);
    }

}
