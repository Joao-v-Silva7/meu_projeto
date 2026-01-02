import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module'; // Importe a chave daqui
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../db/schema';
import { UserDto } from './user.dto';
import {v4 as uuid} from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private readonly db: MySql2Database<typeof schema>
  ) { }
  async create(newUser: UserDto) {
    //verificando se o email já existe pra evitar duplicidade
    const userExists = await this.findByEmail(newUser.email);
    if(userExists){
      throw new ConflictException('E-mail já cadastrado');
    }

    const hashedPassword = bcryptHashSync(newUser.password, 10);

    await this.db.insert(schema.usersTable).values({
      name: newUser.name,
      age: newUser.age,
      email: newUser.email,
      password: hashedPassword
    })

    return { message: 'Usuário criado com sucesso'};
  }

  async findByEmail(email: string) {
    const results = await this.db
      .select()
      .from(schema.usersTable)
      .where(eq(schema.usersTable.email, email))
      .limit(1);
    
    return results[0]; // Retorna o usuário ou undefined
  }
}