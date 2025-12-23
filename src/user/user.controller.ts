import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async findAll(){
        return await this.userService.findAll();
    }

    @Post()
  async create(@Body() data: { name: string; age: number; email: string }) {
    // Aqui chamamos o método que você acabou de adicionar no Service
    return await this.usersService.create(data.name, data.age, data.email);
  }
}
