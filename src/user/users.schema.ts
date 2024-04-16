import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Employee } from './interfaces';

export type UserDocument = User & Document;

const minimumLength = 6;
const message = 'Password must have at least 6 characters';

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({
    type: String,
    required: true,
    length: {
      minimum: minimumLength,
      message: message,
    },
  })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: Date })
  attendance: Date;

  @Prop({ type: [{ name: String, lastname: String, email: String }] })
  following: Employee[];
}

export const UserSchema = SchemaFactory.createForClass(User);
