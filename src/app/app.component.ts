import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { AuthModule } from "./auth/auth.module"
import { AuthService } from "./auth/auth.service"
import { CommonModule } from "@angular/common"
import { BehaviorSubject } from "rxjs"
import { RouterModule } from "@angular/router"
import { HTTP_INTERCEPTORS } from "@angular/common/http"

@Component({
  selector: "app-root",
  imports: [RouterOutlet, AuthModule, CommonModule, RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }],
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean | null>

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {})
  }
}
