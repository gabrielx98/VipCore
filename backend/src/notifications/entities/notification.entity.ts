import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NotificationType } from '@shared/dto/notification.dto';

@Schema()
export class Notification extends Document{
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ required: true, enum: NotificationType })
    type: NotificationType;

    @Prop({ required: true })
    message: string;

    @Prop({ default: Date.now })
    createdAt?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
