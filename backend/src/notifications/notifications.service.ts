import { Injectable } from '@nestjs/common';
import { NotificationDto } from '@shared/dto/notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './entities/notification.entity';
import { ResponseApi } from '@shared/types/responseApi';
import { HttpStatus } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>,
  private readonly userModel: Model<User>
  ) {}

  async findByRole(userId: string) : Promise<ResponseApi<Notification[]>> {
    try {
      const role = (await this.userModel.findById(userId).exec())?.role;
     const data =  await this.notificationModel.find({ role: role }).exec();
     return {
      statusCode: HttpStatus.OK,
      message: 'Operação realizada com sucesso',
      data: data,
     } as ResponseApi<Notification[]>;
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro ao buscar notificaçôes: ' + error,
        data: [],
      } as ResponseApi<Notification[]>;
     }
  }

  
}
