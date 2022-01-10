/*
 * Copyright 2021-present Open Networking Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Input } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { SitePlan } from "../../openapi3/config/models/site-plan";

@Component({
  selector: "[app-floors]",
  templateUrl: "floors.component.svg",
  styleUrls: ["./floors.component.scss"],
  animations: [
    trigger("isometricToggle", [
      state(
        "isometric",
        style({
          transform:
            "skewX(-40deg) skewY(10deg) translateX(600px) translateY(250px) scaleX(0.6) scaleY(0.4)",
        })
      ),
      state(
        "*",
        style({
          transform:
            "skewX(0deg) skewY(0deg) translateX(0px) translateY(0px) scaleX(1.0) scaleY(1.0)",
        })
      ),
      // default
      transition("isometric => *", animate("500ms ease-in")),
      transition("* => isometric", animate("500ms ease-out")),
    ]),
  ],
})
export class FloorsComponent {
  @Input() title: string = "";
  @Input() layers = new Array<string>();
  @Input() sitePlans = new Map<string, SitePlan>();
  @Input() viewMode: string = "isometric";

  public zOffset(sitePlan: SitePlan | undefined): number {
    if (sitePlan && this.viewMode === "isometric") {
      const sp = sitePlan as SitePlan;
      if (sp.offsets) {
        return sp.offsets["z-offset"];
      }
    }
    return 0;
  }
}
