import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: ['dist/entities/*.entity{ .ts,.js}'],
        migrationsTableName: 'migrations_typeorm',
        migrations: [
          'dist/database/migrations/*{.js}',
          'dist/database/seeders/*{.js}',
        ],
        migrationsRun: true,
        autoLoadEntities: true,
        synchronize: configService.get('DATABASE_SYNC'),
        logging: ['query', 'error'],
      }),
    }),
  ],
})
export class DatabaseModule {}
