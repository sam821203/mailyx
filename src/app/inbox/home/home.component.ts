import { Component } from "@angular/core"
import { EmailIndexComponent } from "../email-index/email-index.component"
import { RouterOutlet } from "@angular/router"

@Component({
  selector: "app-home",
  imports: [EmailIndexComponent, RouterOutlet],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
