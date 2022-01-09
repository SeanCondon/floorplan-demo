import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FloorsComponent } from "./floors/floors.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FloorComponent } from "./floor/floor.component";

@NgModule({
  declarations: [AppComponent, FloorsComponent, FloorComponent],
  imports: [BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
