import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core"
import { provideRouter } from "@angular/router"
import { provideHttpClient, withInterceptors } from "@angular/common/http"
import { AuthHttpInterceptor } from "./auth/auth-http-interceptor"
import { routes } from "./app.routes"

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AuthHttpInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
}
