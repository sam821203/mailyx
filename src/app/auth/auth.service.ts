import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, catchError, of } from "rxjs"
import { tap } from "rxjs/operators"

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupCredentials {
  username: string
  password: string
  passwordConfirmation: string
}

interface SigninCredentials {
  username: string
  password: string
}

interface SigninResponse {
  username: string
  message: string
}

interface SignedInResponse {
  authenticated: boolean | null
  username: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  rootUrl = "http://localhost:3000"
  signedin$ = new BehaviorSubject<boolean | null>(null)

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.get<UsernameAvailableResponse>(`${this.rootUrl}/auth/username/${username}`)
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SigninResponse>(`${this.rootUrl}/auth/signup`, credentials, {
        observe: "response",
      })
      .pipe(
        tap((response) => {
          if (response.ok) {
            this.signedin$.next(true)
          }
        })
      )
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated ?? false)
      }),
      catchError(() => {
        this.signedin$.next(false)
        return of({ authenticated: false, username: "" }) // 回傳預設值
      })
    )
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials, {
        observe: "response",
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.signedin$.next(true)
        })
      )
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.signedin$.next(false)
      })
    )
  }
}
