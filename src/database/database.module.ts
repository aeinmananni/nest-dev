// src/app/database/database.module.ts
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class DatabaseModule {
  static forRoot(options: {
    type: 'mysql' | 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useValue: options,
        },
      ],
      exports: ['DATABASE_OPTIONS'],
    };
  }
}
