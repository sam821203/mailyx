import { CanMatchFn, Router } from "@angular/router"
import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { map, take, tap } from "rxjs/operators"

// 函式型守衛
export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.signedin$.pipe(
    take(1),
    tap((signedIn) => {
      if (!signedIn) {
        // 未登入則導向登入頁
        router.navigate(["/auth/signin"])
      }
    }),
    map((signedIn) => !!signedIn)
  )
}
