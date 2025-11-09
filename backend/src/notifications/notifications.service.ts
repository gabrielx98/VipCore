import { Injectable } from '@nestjs/common';
import { NotificationDto } from '@shared/dto/notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>
  ) {}

  async create(createNotificationDto: NotificationDto) : Promise<Notification> {
    const notification = new this.notificationModel(createNotificationDto);
    return await notification.save();
  }

  async findAll() : Promise<Notification[]> {
    return await this.notificationModel.find().exec();
  }

  async findOne(id: number) : Promise<Notification | null> {
    return await this.notificationModel.findById(id).exec();
  }

  async update(id: number, updateNotificationDto: NotificationDto) : Promise<Notification | null> {
    return await this.notificationModel.findByIdAndUpdate(id, updateNotificationDto, { new: true }).exec();
  }

  async remove(id: number) : Promise<Notification | null> {
    return await this.notificationModel.findByIdAndDelete(id).exec();
  }
}
