// src/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from '../db/schema'; // Importe seu schema aqui

export const DRIZZLE = 'DRIZZLE';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: async () => {
        const url = process.env.DATABASE_URL;
        if (!url) {
        throw new Error('DATABASE_URL não encontrada no arquivo .env');
        }
        const connection = await mysql.createConnection(url);
         return drizzle(connection, { schema, mode: 'default' });
       },
     },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}