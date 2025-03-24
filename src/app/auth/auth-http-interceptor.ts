import { HttpInterceptorFn } from "@angular/common/http"
import { HttpRequest, HttpHandlerFn } from "@angular/common/http"

export const AuthHttpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const modifiedReq = req.clone({
    withCredentials: true,
  })
  return next(modifiedReq)
}
