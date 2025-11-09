import { Injectable } from '@nestjs/common';
import { MeetingDto } from '@shared/dto/meeting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingsService {
  constructor(@InjectModel(Meeting.name) private meetingModel: Model<Meeting>
  ) {}

  async create(createMeetingDto: MeetingDto) : Promise<Meeting> {
    const meeting = new this.meetingModel(createMeetingDto);
    return await meeting.save();
  }

  async findAll() : Promise<Meeting[]> {
    return await this.meetingModel.find().exec();
  }

  async findOne(id: number) : Promise<Meeting | null> {
    return await this.meetingModel.findById(id).exec();
  }

  async update(id: number, updateMeetingDto: MeetingDto) : Promise<Meeting | null> {
    return await this.meetingModel.findByIdAndUpdate(id, updateMeetingDto, { new: true }).exec();
  }

  async remove(id: number) : Promise<Meeting | null> {
    return await this.meetingModel.findByIdAndDelete(id).exec();
  }
}
