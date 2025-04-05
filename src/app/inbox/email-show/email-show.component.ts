import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
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

  constructor(private route: ActivatedRoute) {
    // 初始化
    this.email = this.route.snapshot.data["email"]
    this.route.data.subscribe(({ email }) => {
      this.email = email
    })
  }

  ngOnInit() {}
}
