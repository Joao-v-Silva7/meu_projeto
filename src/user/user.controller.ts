import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDto } from './user.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @UsePipes(new ValidationPipe()) // Ativa a validação dos decoradores do DTO
    async create(@Body() newUser: UserDto) {
     return await this.userService.create(newUser);
    }

}
