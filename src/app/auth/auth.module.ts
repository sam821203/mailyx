import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { AuthRoutingModule } from "./auth-routing.module"
import { SigninComponent } from "./signin/signin.component"
import { SignupComponent } from "./signup/signup.component"

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, SigninComponent, SignupComponent, ReactiveFormsModule],
})
export class AuthModule {}
