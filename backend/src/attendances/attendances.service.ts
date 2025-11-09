import { Injectable } from '@nestjs/common';
import { AttendanceDto } from '@shared/dto/attendance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendancesService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<Attendance>
) {}
  async create(createAttendanceDto: AttendanceDto) : Promise<Attendance> {
    const attendance = new this.attendanceModel(createAttendanceDto);
    return await attendance.save();
  }

  async findAll() : Promise<Attendance[]> {
    return await this.attendanceModel.find().exec();
  }

  async findOne(id: number) : Promise<Attendance | null> {
    return await this.attendanceModel.findById(id).exec();
  }

  async update(id: number, updateAttendanceDto: AttendanceDto) : Promise<Attendance | null> {
    const attendance = this.attendanceModel.findByIdAndUpdate(id, updateAttendanceDto, { new: true }).exec();
    return await attendance;
  }

  async remove(id: number) : Promise<Attendance | null> {
    return await this.attendanceModel.findByIdAndDelete(id).exec();
  }
}
