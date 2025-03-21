import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

interface UsernameAvailableResponse {
  available: boolean
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      "http://localhost:3000/auth/username",
      {
        username: username,
      },
      {
        withCredentials: true,
      }
    )
  }
}
