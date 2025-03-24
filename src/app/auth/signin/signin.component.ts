import { Component } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { AuthService } from "../auth.service"
import { SharedModule } from "../../shared/shared.module"
import { ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"

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

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.authForm.invalid) return
    this.authService.signin(this.authForm)
  }
}
