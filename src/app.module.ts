import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = {
          type: 'postgres' as const,
          host: configService.get('POSTGRES_HOST') || 'host.docker.internal',
          port: +(configService.get('POSTGRES_PORT') || 5432),
          username: configService.get('POSTGRES_USER') || 'postgres',
          password: configService.get('POSTGRES_PASSWORD') || 'password',
          database: configService.get('POSTGRES_DB') || 'todo',
          entities: [__dirname + '/**/*.entity.{ts,js}'],
          synchronize: true,
        };

        return config;
      },
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
