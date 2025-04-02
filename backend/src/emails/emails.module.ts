import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { Email, EmailSchema } from './schemas/email.schema';
import { MailService } from '../mail/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Email.name, schema: EmailSchema }]),
    ConfigModule,
  ],
  controllers: [EmailsController],
  providers: [EmailsService, MailService],
  exports: [EmailsService, MailService],
})
export class EmailsModule {}
