import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './entities/attendance.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Attendance.name , schema: AttendanceSchema }])],
  controllers: [AttendancesController],
  providers: [AttendancesService],
  exports: [AttendancesService]
})
export class AttendancesModule {}
