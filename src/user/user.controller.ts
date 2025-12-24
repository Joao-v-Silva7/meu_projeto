import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async findAll(){
        return await this.userService.findAll();
    }

    @Post()
  async create(@Body() data: { name: string; age: number; email: string; password: string; }) {
    console.log('Dados recebidos no Controller:', data);
    return await this.userService.create(
      data.name, 
      data.age, 
      data.email,
      data.password
    );
  }
}
