import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from './schemas/email.schema';
import { CreateEmailDto } from './dto/create-email.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailsService {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>,
  ) {}

  // 取得所有郵件
  async getAllEmails(): Promise<Email[]> {
    return this.emailModel.find().exec();
  }

  // 依 ID 取得特定郵件
  async getEmailById(id: string): Promise<Email | null> {
    return this.emailModel.findById(id).exec();
  }

  // 發送郵件並存入資料庫
  async sendEmail(createEmailDto: CreateEmailDto): Promise<Email> {
    const { subject, text, to, from } = createEmailDto;

    // 使用 Nodemailer 發送郵件
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // 你的 Gmail 帳號
        pass: process.env.EMAIL_PASS, // 你的 Gmail 密碼或應用程式密碼
      },
    });

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });

    // 存入 MongoDB
    const createdEmail = new this.emailModel(createEmailDto);
    return createdEmail.save();
  }
}
