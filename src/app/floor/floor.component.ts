/*
 * Copyright 2022-present Open Networking Foundation
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

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { SitePlan } from "../../openapi3/config/models/site-plan";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "[app-floor]",
  templateUrl: "./floor.component.svg",
})
export class FloorComponent implements OnInit {
  @Input() layers = new Array<string>();
  @Input() viewMode: string = "";
  @Input() sitePlan: SitePlan | undefined;
  @Output() floorSelectedEmitter = new EventEmitter<string>();
  structureLayerSvg: string = "";
  textLayerSvg: string = "";

  constructor(private sanitizer: DomSanitizer, public httpClient: HttpClient) {}

  ngOnInit(): void {
    if (this.sitePlan !== undefined) {
      this.loadSvgAndExtract(this.sitePlan.id, this.sitePlan["svg-file"]);
    }
  }

  private loadSvgAndExtract(id: string, location: string): void {
    this.httpClient
      .get(environment.configUrl + location, {
        headers: {
          Accept: "image/svg-xml",
        },
        responseType: "text",
      })
      .subscribe(
        (svgFile) => {
          console.log(
            "SVG loaded from",
            location,
            " (",
            svgFile.length,
            "bytes)"
          );
          this.structureLayerSvg = this.extractSvgLayer(svgFile, "Walls");
          this.textLayerSvg = this.extractSvgLayer(svgFile, "Text");
        },
        (err) => console.warn("Error loading SVG", id, "from", location, err)
      );
  }

  private extractSvgLayer(svg: string, layer: string): string {
    const walls1Pos = svg.indexOf('inkscape:label="' + layer + '"');
    const walls2Pos = svg.indexOf("<", walls1Pos);
    const walls3Pos = svg.indexOf('inkscape:groupmode="layer"', walls1Pos);
    const walls4Pos = svg.lastIndexOf("</g>", walls3Pos);
    return svg.substr(walls2Pos, walls4Pos - walls2Pos);
  }

  floorSelected(floor: string): void {
    this.floorSelectedEmitter.emit(floor);
  }

  public get siteplanID(): string {
    if (this.sitePlan) {
      return (this.sitePlan as SitePlan).id;
    }
    return "";
  }

  public get structureLayerSafe(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.structureLayerSvg as string
    );
  }

  public get textLayerSafe(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.textLayerSvg as string);
  }
}
