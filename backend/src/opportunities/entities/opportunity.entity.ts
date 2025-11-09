import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OpportunityStatus } from '@shared/dto/opportunity.dto';

@Schema()
export class Opportunity extends Document{
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    toUser: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    fromUser: Types.ObjectId;

    @Prop({ required: true })
    description: string;

    @Prop({ enum: OpportunityStatus, default: 'ENVIADA' })
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

export const OpportunitySchema = SchemaFactory.createForClass(Opportunity);
