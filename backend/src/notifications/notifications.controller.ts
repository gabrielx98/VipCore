import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationDto } from '@shared/dto/notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':userId')
  findByRole(@Param('userId') userId: string) {
    return this.notificationsService.findByRole(userId);
  }

}
