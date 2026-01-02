import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        APPLICATION_SCHEME: Joi.string().required(),
        APPLICATION_HOST: Joi.string().required(),
        APPLICATION_PORT: Joi.number().required(),
        DB_TYPE: Joi.string().valid('mysql').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SCHEMA: Joi.string().required(),
      }),
    }),
  ],
})
export class DotenvAdaptModule {}
