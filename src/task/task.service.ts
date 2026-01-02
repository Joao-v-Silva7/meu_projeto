import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import {DRIZZLE} from '../database/database.module';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../db/schema';
import { eq, like, and, SQL } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
    constructor(
        @Inject(DRIZZLE) private readonly db: MySql2Database<typeof schema> 
    ) {}

    async create(task: TaskDto, userId: number) {
       const taskId = uuid();
        await this.db.insert(schema.questionsTable).values({
            id: taskId,
            title: task.tittle,
            body: task.description,
            userId: userId,
        })
        return { id: taskId }
    }

    async findById(id: string) {
        const result = await this.db
        .select()
        .from(schema.questionsTable)
        .where(eq(schema.questionsTable.id, id))
        .limit(1);

        if(!result.length){
            throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return result[0];
    }

    async findAll(params: FindAllParameters){
            const filters: SQL[] = []; 

            if(params.title){
                filters.push(like(schema.questionsTable.title, `%${params.title}`));
            }

            return await this.db
            .select()
            .from(schema.questionsTable)
            .where(and(...filters))

    }

    async update(id: string, task: Partial<TaskDto>){
        await this.findById(id); // Garante que existe
        
        await this.db
        .update(schema.questionsTable)
        .set({
            title: task.tittle,
            body: task.description,
            updatedAt: new Date(),
        })
        .where(eq(schema.questionsTable.id, id));

    }

    async remove(id: string){
        await this.findById(id);
        await this.db.delete(schema.questionsTable)
        .where(eq(schema.questionsTable.id, id));
}
}