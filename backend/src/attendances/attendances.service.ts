import { Injectable } from '@nestjs/common';
import { AttendanceDto } from '@shared/dto/attendance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './entities/attendance.entity';
import { ResponseApi } from '@shared/types/responseApi';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AttendancesService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<Attendance>
) {}
  async create(createAttendanceDto: AttendanceDto) : Promise<ResponseApi<AttendanceDto>> {
    const attendance = new this.attendanceModel(createAttendanceDto);
    try {
      await attendance.save();
      return {
            statusCode: HttpStatus.CREATED,
            message: 'Check-in realizada com sucesso',
            data: {},
          } as ResponseApi<AttendanceDto>;
    } catch (error) {
      return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Erro ao realizar check-in: ' + error,
            data: {},
          } as ResponseApi<AttendanceDto>;
    }
  }

  async findAll() : Promise<Attendance[]> {
    return await this.attendanceModel.find().exec();
  }

  async findOne(id: number) : Promise<Attendance | null> {
    return await this.attendanceModel.findById(id).exec();
  }
  
  async getList(meetingId: string) : Promise<ResponseApi<Attendance[]>> {
    try {
     const data = await this.attendanceModel.find({ meetingId }).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data,
     } as ResponseApi<Attendance[]>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar lista de presenças: ' + error,
        data: [],
      } as ResponseApi<Attendance[]>;
     }

  }

  async update(id: number, updateAttendanceDto: AttendanceDto) : Promise<Attendance | null> {
    const attendance = this.attendanceModel.findByIdAndUpdate(id, updateAttendanceDto, { new: true }).exec();
    return await attendance;
  }

  async remove(id: number) : Promise<Attendance | null> {
    return await this.attendanceModel.findByIdAndDelete(id).exec();
  }
}
