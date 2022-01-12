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

import { Component, OnInit } from "@angular/core";
import { ApiService } from "../openapi3/config/services/api.service";
import { AetherModel } from "../openapi3/config/models/aether-model";
import { environment } from "../environments/environment";
import { Site } from "../openapi3/config/models/site";
import { map } from "rxjs/operators";
import { SitePlan } from "../openapi3/config/models/site-plan";

@Component({
  selector: "aether-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public layers = new Array<string>();
  public activeLayers = new Array<string>();

  public floorNames = new Array<string>();
  public sitePlans = new Map<string, SitePlan>();
  public viewMode = "isometric";

  constructor(public apiService: ApiService) {
    apiService.rootUrl = environment.configUrl + "/chronos-exporter";
  }

  ngOnInit(): void {
    this.apiService
      .getAetherConfiguration()
      .pipe(
        map((config: AetherModel) =>
          config.sites.find((s: Site) => s["site-id"] === environment.site)
        )
      )
      .subscribe(
        (s) => {
          if (s !== undefined) {
            const sitePlans = s["site-plans"];
            sitePlans?.layers?.forEach((l) => {
              this.layers.push(l["layer-id"]);
              this.activeLayers.push(l["layer-id"]);
            });
            sitePlans?.["site-plan-list"]?.forEach((sp) => {
              this.floorNames.push(sp.id);
              this.sitePlans.set(sp.id, sp);
            });
          }
        },
        (err) => console.warn("Error loading config", err),
        () => {
          this.layers = [...this.layers];
          this.activeLayers = [...this.activeLayers];
          console.log(
            "layers loaded",
            this.layers,
            "Active:",
            this.activeLayers
          );
          console.log("site plans loaded", this.floorNames);
        }
      );
  }

  public enableLayer(event: MouseEvent): void {
    if (event !== null) {
      const tgt = event.target as HTMLInputElement;
      console.log("Enabling", tgt.checked, tgt.value);
      if (tgt.checked && this.activeLayers.indexOf(tgt.value) === -1) {
        this.activeLayers.push(tgt.value);
      } else if (!tgt.checked && this.activeLayers.indexOf(tgt.value) !== -1) {
        this.activeLayers.splice(this.activeLayers.indexOf(tgt.value), 1);
      }
      this.activeLayers = [...this.activeLayers];
    }
  }

  public get configUrl(): string {
    return environment.configUrl;
  }
}
