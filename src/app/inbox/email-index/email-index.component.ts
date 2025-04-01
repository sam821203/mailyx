import { Component } from "@angular/core"
import { EmailService } from "../email.service"

@Component({
  selector: "app-email-index",
  imports: [],
  templateUrl: "./email-index.component.html",
  styleUrl: "./email-index.component.scss",
})
export class EmailIndexComponent {
  constructor(private emailService: EmailService) {
    this.emailService.getEmails().subscribe(() => {})
  }
}
