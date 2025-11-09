import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AttendanceStatus } from '@shared/dto/attendance.dto';

@Schema()
export class Attendance extends Document{
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Meeting' })
    meetingId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ required: true })
    checkInTime: Date;

    @Prop({ required: true, enum: AttendanceStatus })
    status: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    updatedBy?: Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt?: Date;

    @Prop({ default: Date.now })
    updatedAt?: Date;


}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
