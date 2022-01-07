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

import {
  Compiler,
  Component,
  Input,
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { ApiService } from "../openapi3/config/services/api.service";
import { AetherModel } from "../openapi3/config/models/aether-model";
import { environment } from "../environments/environment";
import { Site } from "../openapi3/config/models/site";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { SitePlanDirective } from "./site-plan.directive";

@Component({
  selector: "aether-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public layers: string[] = [];
  public floorNames: string[] = [];
  public viewMode = "isometric";

  // Link to the site plan host directive in the HTML template
  @ViewChild(SitePlanDirective, { static: true })
  sitePlanHost!: SitePlanDirective;

  constructor(
    public apiService: ApiService,
    public httpClient: HttpClient,
    private compiler: Compiler
  ) {
    apiService.rootUrl = environment.configUrl + "/chronos-exporter";
  }

  ngOnInit() {
    this.apiService
      .getAetherConfiguration()
      .pipe(
        map((config: AetherModel) =>
          config.sites.find((s: Site) => s["site-id"] === environment.site)
        )
      )
      .subscribe(
        (s) => {
          // @ts-ignore
          const sitePlans = s["site-plans"];
          sitePlans?.layers?.forEach((l) => {
            this.layers.push(l["layer-id"]);
          });
          sitePlans?.["site-plan-list"]?.forEach((sp) => {
            this.floorNames.push(sp.id);
            this.loadSvgAndCompile(sp.id, sp["svg-file"]);
          });
        },
        (err) => console.warn("Error loading config", err),
        () => {
          console.log("layers loaded", this.layers);
          console.log("site plans loaded", this.floorNames);
        }
      );
  }

  public enableLayer(name: string, checked: boolean): void {
    if (checked && this.layers.indexOf(name) === -1) {
      this.layers.push(name);
    } else if (!checked && this.layers.indexOf(name) !== -1) {
      this.layers.splice(this.layers.indexOf(name), 1);
    }
  }

  private loadSvgAndCompile(id: string, location: string) {
    console.log("Loading SVG", id, "from ", location);
    this.httpClient
      .get(environment.configUrl + location, {
        headers: {
          Accept: "image/svg-xml",
        },
        responseType: "text",
      })
      .subscribe(
        (svgFile) => {
          console.log("SVG loaded", svgFile.length, "bytes");
        },
        (err) => console.warn("Error loading SVG", id, "from", location, err),
        () => console.log("Done loading SVG", id)
      );
  }
}
