import { Injectable } from "@angular/core"
import { AsyncValidator, FormControl } from "@angular/forms"
import { map } from "rxjs/operators"
import { AuthService } from "../auth.service"

@Injectable({ providedIn: "root" })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const { value } = control
    return this.authService.usernameAvailable(value).pipe(
      map((value) => {
        if (value.available) {
          return null
        } else {
          return { nonUniqueUsername: true }
        }
      })
    )
  }
}
