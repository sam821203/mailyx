import { CanMatchFn, Router } from "@angular/router"
import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { filter, map, take } from "rxjs/operators"

// 函式型守衛
export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.signedin$.pipe(
    // 等待 signedIn 不再是 null
    filter((signedIn) => signedIn !== null),
    take(1),
    map((signedIn) => {
      if (!signedIn) {
        router.navigate(["/auth/signin"])
        return false
      }
      return true
    })
  )
}
