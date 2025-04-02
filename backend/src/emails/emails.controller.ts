import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  // 獲取當前使用者的所有郵件
  @Get()
  async getAllEmails() {
    return await this.emailsService.getAllEmails();
  }

  // 根據 ID 獲取特定郵件
  @Get(':id')
  async getEmailById(@Param('id') id: string) {
    return await this.emailsService.getEmailById(id);
  }

  // 發送郵件
  @Post()
  async sendEmail(
    @Body()
    emailData: {
      subject: string;
      text: string;
      to: string;
      from: string;
      html: string;
    },
  ) {
    return await this.emailsService.sendEmail(emailData);
  }
}
