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
        user: 'raystyle32613@gmail.com',
        pass: 'ekdb ugpg elvt hqdb',
      },
    });

    await transporter.sendMail({
      from, // 使用前端傳來的發送者
      to, // 收件者
      subject, // 主題
      text, // 內容
    });

    // 存入 MongoDB
    const createdEmail = new this.emailModel(createEmailDto);
    return createdEmail.save();
  }
}
