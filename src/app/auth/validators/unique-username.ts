import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { AsyncValidator, FormControl } from "@angular/forms"
import { map } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate = (control: FormControl) => {
    const { value } = control
    return this.http
      .post<any>(
        "http://localhost:3000/auth/username",
        {
          username: value,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(
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
