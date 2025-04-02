import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { EmailService } from "../email.service"
import { switchMap } from "rxjs/operators"
import { Email } from "../email.model"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-email-show",
  imports: [CommonModule],
  templateUrl: "./email-show.component.html",
  styleUrl: "./email-show.component.scss",
})
export class EmailShowComponent implements OnInit {
  email!: Email

  constructor(private route: ActivatedRoute, private emailService: EmailService) {}

  ngOnInit() {
    this.route.params.pipe(switchMap(({ id }) => this.emailService.getEmail(id))).subscribe((email) => {
      this.email = email
    })
  }
}
