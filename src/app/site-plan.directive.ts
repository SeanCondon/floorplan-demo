import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[sitePlanHost]",
})
export class SitePlanDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
