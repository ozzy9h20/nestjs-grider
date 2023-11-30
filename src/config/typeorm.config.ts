import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { join } from 'path'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      synchronize: false,
      database: this.configService.get<string>('TYPEORM_SQLITE_PATH'),
      entities: [join(__dirname, '**', '*.entity.ts')],
      migrations: ['src/migrations/*.ts}'],
      autoLoadEntities: true,
    }
  }
}
