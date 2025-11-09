import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '@shared/dto/user.dto';
import { UserStatus } from '@shared/dto/user.dto';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ required: true, enum: UserRole })
    role: UserRole;

    @Prop({ required: true, enum: UserStatus })
    status: UserStatus;

    @Prop({ required: true })
    reason: string;

    @Prop()
    enterprise?: string;

    @Prop()
    CNPJ?: string;

    @Prop({ required: true, default: true })
    active: boolean;

    @Prop()
    appraiser?: string;

    @Prop({ default: Date.now })
    createdAt?: Date;

    @Prop({ default: Date.now })
    updatedAt?: Date;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    updatedBy?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);