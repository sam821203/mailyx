import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { InputComponent } from "./input/input.component"

@NgModule({
  declarations: [],
  imports: [CommonModule, InputComponent],
  exports: [InputComponent],
})
export class SharedModule {}
