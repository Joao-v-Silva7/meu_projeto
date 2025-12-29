import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module'; // Importe a chave daqui
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../db/schema';
import { UserDto } from './user.dto';
import {v4 as uuid} from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly user: UserDto[] = []
  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    this.user.push(newUser);
  }

  findByUserName(username:string): UserDto | null {
    return this.user.find(users => users.username === username);
  }
}