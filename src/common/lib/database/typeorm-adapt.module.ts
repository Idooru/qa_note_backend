import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TaskEntity } from '../../../model/task/entities/task.entity';

const isNodeEnvDev = (): boolean => process.env.NODE_ENV === 'dev';
const isNodeEnvProd = (): boolean => process.env.NODE_ENV === 'prod';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<string>('DB_TYPE') as 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_SCHEMA'),
        entities: [TaskEntity],
        synchronize: isNodeEnvDev(),
        migrationsRun: isNodeEnvProd(),
        logging: isNodeEnvDev(),
        dropSchema: false,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeormAdaptModule {}
