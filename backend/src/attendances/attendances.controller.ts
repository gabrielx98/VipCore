import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendanceDto } from '@shared/dto/attendance.dto';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  async create(@Body() createAttendanceDto: AttendanceDto) {
    return await this.attendancesService.create(createAttendanceDto);
  }

  @Get('/meetingList/:meetingId')
  async getList(@Param('meetingId') meetingId: string) {
    return await this.attendancesService.getList(meetingId);
  }

}
