import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { PlaceholderComponent } from "./placeholder/placeholder.component"
import { InboxRoutingModule } from "./inbox-routing.module"

@NgModule({
  declarations: [],
  imports: [CommonModule, InboxRoutingModule, PlaceholderComponent],
})
export class InboxModule {}
