import { Body, Controller, Get, Post, Param, Put, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService:TaskService){ }
    
    @Post()
   async create(@Body() task: TaskDto, @Request() req){
        const userId = req.user.sub;
        return await this.taskService.create(task, userId);
    }

    @Get('/:id')
    async findById(@Param('id') id:string){
        console.log('Buscando Id: ', id);
        //retorna a chamada do service para a excessão ser lançada
        return await this.taskService.findById(id);
    }

    @Get()
    async findAll(@Query() params: FindAllParameters){
        return await this.taskService.findAll(params);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() task: TaskDto) {
       return await this.taskService.update(id, task);
    }

    @Delete('/:id')
    async remove(@Param('id') id:string){
        return await this.taskService.remove(id);
    }
}