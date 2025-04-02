import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema({ timestamps: true })
export class Email {
  @Prop({ required: true })
  subject!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ required: true })
  to!: string;

  @Prop({ required: true })
  from!: string;

  @Prop({ required: true })
  html!: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
