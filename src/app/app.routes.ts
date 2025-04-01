import { Routes } from "@angular/router"
import { authGuard } from "./auth/auth.guard"

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "inbox",
    loadChildren: () => import("./inbox/inbox.module").then((m) => m.InboxModule),
    canMatch: [authGuard],
  },
  { path: "", redirectTo: "inbox", pathMatch: "full" },
  { path: "**", redirectTo: "inbox", pathMatch: "full" },
]
