import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { SigninComponent } from "./signin/signin.component"
import { SignupComponent } from "./signup/signup.component"
import { SignoutComponent } from "./signout/signout.component"

const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "signout", component: SignoutComponent },
  { path: "", redirectTo: "signin", pathMatch: "full" },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
