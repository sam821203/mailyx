import { Component } from "@angular/core"
import { EmailService } from "../email.service"
import { EmailSummary } from "../email.service"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-email-index",
  imports: [CommonModule],
  templateUrl: "./email-index.component.html",
  styleUrl: "./email-index.component.scss",
})
export class EmailIndexComponent {
  emails: EmailSummary[] = []

  constructor(private emailService: EmailService) {
    this.emailService.getEmails().subscribe((emails) => {
      this.emails = emails
    })
  }
}
