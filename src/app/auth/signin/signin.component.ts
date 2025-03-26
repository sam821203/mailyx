import { Component } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { AuthService } from "../auth.service"
import { SharedModule } from "../../shared/shared.module"
import { ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

@Component({
  selector: "app-signin",
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: "./signin.component.html",
  styleUrl: "./signin.component.scss",
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  })

  get usernameControl() {
    return this.authForm.get("username") as FormControl
  }

  get passwordControl() {
    return this.authForm.get("password") as FormControl
  }

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authForm.invalid) return
    const credentials = {
      username: this.authForm.value.username || "",
      password: this.authForm.value.password || "",
    }
    this.authService.signin(credentials)?.subscribe({
      next: () => {
        this.router.navigateByUrl("/inbox")
      },
      error: ({ error }) => {
        if (error.username || error.password) {
          this.authForm.setErrors({ credentials: true })
        }
      },
    })
  }
}
