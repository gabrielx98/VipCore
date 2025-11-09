import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { MeetingsModule } from './meetings/meetings.module';
import { AttendancesModule } from './attendances/attendances.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { NotificationsModule } from './notifications/notifications.module';
import { InvoicesModule } from './invoices/invoices.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
      dbName: process.env.DB_NAME || 'vipcore'
    }),

    UsersModule,

    MessagesModule,

    MeetingsModule,

    AttendancesModule,

    OpportunitiesModule,

    NotificationsModule,

    InvoicesModule,

    SecurityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
