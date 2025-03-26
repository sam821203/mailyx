import { Routes } from "@angular/router"

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "inbox",
    loadChildren: () => import("./inbox/inbox.module").then((m) => m.InboxModule),
  },
  { path: "", redirectTo: "inbox", pathMatch: "full" },
  { path: "**", redirectTo: "inbox/home" },
]
