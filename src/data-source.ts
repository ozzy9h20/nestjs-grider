import { DataSource, DataSourceOptions } from 'typeorm'

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: '/home/endyar/sql/grider-nest-s7.sqlite',
  entities: ['**/*.entity{.js,.ts}'],
  migrations: [__dirname + 'src/migrations/*.js'],
} as DataSourceOptions)
