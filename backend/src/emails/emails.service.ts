import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from './schemas/email.schema';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class EmailsService {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>,
    private readonly mailService: MailService,
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

    const html = `<p>${text.replace(/\n/g, '<br>')}</p>`;

    // 使用 mailService 來發送郵件
    await this.mailService.sendMail(from, to, subject, text, html);

    // 存儲郵件訊息到 MongoDB
    const createdEmail = new this.emailModel(createEmailDto);
    return createdEmail.save();
  }
}
