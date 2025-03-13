import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms"
import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class MatchPassword implements Validator {
  validate: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get("password")?.value
    const passwordConfirmation = formGroup.get("passwordConfirmation")?.value

    return password === passwordConfirmation ? null : { passwordsDontMatch: true }
  }
}
