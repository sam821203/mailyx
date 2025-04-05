import { Injectable } from "@angular/core"
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router"
import { EMPTY, Observable } from "rxjs"
import { Email } from "./email.model"
import { EmailService } from "./email.service"
import { catchError } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class EmailResolverService implements Resolve<Email | null> {
  constructor(private emailService: EmailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Email> {
    const { id } = route.params
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigate(["/inbox/not-found"])
        return EMPTY
      })
    )
  }
}
