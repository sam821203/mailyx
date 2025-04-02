import { Component } from "@angular/core"
import { EmailService } from "../email.service"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { EmailSummary } from "../email.model"

@Component({
  selector: "app-email-index",
  imports: [CommonModule, RouterModule],
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
