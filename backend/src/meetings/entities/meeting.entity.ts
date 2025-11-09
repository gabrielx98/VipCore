import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MeetingStatus } from '@shared/dto/meeting.dto';

@Schema()
export class Meeting extends Document{
    @Prop({ required: true })
    _id: Types.ObjectId;
    
    @Prop({ required: true })
    title: string;
    
    @Prop({ required: true })
    description: string;
    
    @Prop({ required: true })
    date: Date;
    
    @Prop({ required: true, enum: MeetingStatus })
    status: string;
    
    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy?: Types.ObjectId;
    
    @Prop({ type: Types.ObjectId, ref: 'User' })
    updatedBy?: Types.ObjectId;
    
    @Prop({ default: Date.now })
    createdAt?: Date
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
