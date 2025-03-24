import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject } from "rxjs"
import { tap } from "rxjs/operators"
import { FormGroup } from "@angular/forms"

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupCredentials {
  username: string
  password: string
  passwordConfirmation: string
}

interface SignupResponse {
  username: string
  message: string
}

interface SignedInResponse {
  authenticated: boolean
  username: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  rootUrl = "http://localhost:3000"
  signedIn$ = new BehaviorSubject(false)

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username,
    })
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, {
        observe: "response",
      })
      .pipe(
        tap((response) => {
          this.signedIn$.next(true)
        })
      )
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedIn`).pipe(
      tap(({ authenticated }) => {
        this.signedIn$.next(authenticated)
      })
    )
  }

  signin(authForm: FormGroup) {
    if (authForm.invalid) return

    this.http
      .post<{ username: string; message: string }>(`${this.rootUrl}/auth/signin`, authForm.value, {
        observe: "response",
      })
      .pipe(
        tap(() => {
          this.signedIn$.next(true)
        })
      )
      .subscribe({
        next: () => {
          console.log("Signed in successfully")
        },
        error: () => {
          authForm.setErrors({ invalidCredentials: true })
        },
      })
  }
}
