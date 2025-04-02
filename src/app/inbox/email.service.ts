import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Email, EmailSummary } from "./email.model"

@Injectable({
  providedIn: "root",
})
export class EmailService {
  rootUrl = "http://localhost:3000"

  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`)
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`)
  }
}
