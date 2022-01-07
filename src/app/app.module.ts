import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FloorsComponent } from "./floors/floors.component";
import { HttpClientModule } from "@angular/common/http";
import { Floor0Component } from "./floor0/floor0.component";
import { Floor1Component } from "./floor1/floor1.component";
import { Floor2Component } from "./floor2/floor2.component";
import { Floor3Component } from "./floor3/floor3.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SitePlanDirective } from './site-plan.directive';

@NgModule({
  declarations: [
    AppComponent,
    FloorsComponent,
    Floor0Component,
    Floor1Component,
    Floor2Component,
    Floor3Component,
    SitePlanDirective,
  ],
  imports: [BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
