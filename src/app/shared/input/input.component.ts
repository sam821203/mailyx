import { CommonModule } from "@angular/common"
import { Component, Input } from "@angular/core"
import { FormControl } from "@angular/forms"
import { ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-input",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
})
export class InputComponent {
  @Input() label: string = ""
  @Input() control!: FormControl
  @Input() inputType: string = ""

  constructor() {}

  showErrors() {
    const { dirty, touched, errors } = this.control
    return dirty && touched && errors
  }
}
