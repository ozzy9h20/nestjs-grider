import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { join } from 'path'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const defaultOption = {
      type: 'sqlite',
      synchronize: false,
      database: this.configService.get<string>('TYPEORM_SQLITE_PATH'),
      migrations: [join(__dirname, '../migrations/*.js')],
      autoLoadEntities: true,
    } as TypeOrmModuleOptions

    if (process.env.NODE_ENV === 'development') {
      return {
        ...defaultOption,
        entities: [join(__dirname, '..', '**', '*.entity.ts')],
      }
    } else if (process.env.NODE_ENV === 'test') {
      return {
        ...defaultOption,
        entities: [join(__dirname, '..', '**', '*.entity.js')],
        migrationsRun: true,
      }
    }
  }
}
