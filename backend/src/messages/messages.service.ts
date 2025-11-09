import { Injectable } from '@nestjs/common';
import { MessageDto } from '@shared/dto/message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>
  ) {}

  async create(createMessageDto: MessageDto) : Promise<Message> {
    const message = new this.messageModel(createMessageDto);
    return await message.save();
  }

  async findAll() : Promise<Message[]> {
    return await this.messageModel.find().exec();
  }

  async findOne(id: number) : Promise<Message | null> {
    return this.messageModel.findById(id).exec();
  }

  async update(id: number, updateMessageDto: MessageDto) : Promise<Message | null> {
    return await this.messageModel.findByIdAndUpdate(id, updateMessageDto, { new: true }).exec();
  }

  async remove(id: number) : Promise<Message | null> {
    return await this.messageModel.findByIdAndDelete(id).exec();
  }
}
