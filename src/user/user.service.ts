import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module'; // Importe a chave daqui
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../db/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private db: MySql2Database<typeof schema>
  ) {}

  async findAll() {
    return await this.db.query.usersTable.findMany();
  }
  async create(name: string, age: number, email: string, password: string) {
    return await this.db.insert(schema.usersTable).values({
        name,
        age,
        email,
        password,

    });
    }
}