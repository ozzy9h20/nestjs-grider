import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { ConfigModule } from '@nestjs/config'
import { User } from './users/user.entity'
import { Report } from './reports/report.entity'
import { APP_PIPE } from '@nestjs/core'

const cookieSession = require('cookie-session')

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.SQLITE_PATH,
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['mySuperSecretKey123'],
        }),
      )
      .forRoutes('*')
  }
}
