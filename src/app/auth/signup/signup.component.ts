import { Component } from "@angular/core"
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms"
import { ReactiveFormsModule } from "@angular/forms"
import { CommonModule, JsonPipe } from "@angular/common"
import { MatchPassword } from "../validators/match-password"
import { UniqueUsername } from "../validators/unique-username"
import { SharedModule } from "../../shared/shared.module"

@Component({
  selector: "app-signup",
  imports: [ReactiveFormsModule, JsonPipe, SharedModule, CommonModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss",
})
export class SignupComponent {
  authForm: FormGroup
  usernameControl!: FormControl
  passwordControl!: FormControl
  passwordConfirmationControl!: FormControl

  constructor(private matchPassword: MatchPassword, private uniqueUsername: UniqueUsername) {
    this.authForm = new FormGroup(
      {
        username: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ]),
        password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
        passwordConfirmation: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ]),
      },
      { validators: [this.matchPassword.validate] }
    )
    this.authForm
      .get("username")
      ?.setAsyncValidators([(control: AbstractControl) => this.uniqueUsername.validate(control as FormControl)])
    this.usernameControl = this.authForm.get("username") as FormControl
    this.passwordControl = this.authForm.get("password") as FormControl
    this.passwordConfirmationControl = this.authForm.get("passwordConfirmation") as FormControl
  }
}
