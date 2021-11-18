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

import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public layers: string[] = ['Walls','Text','SmallCells','Beam','Devices'];
    public floorNames = ['floor-0', 'floor-1', 'floor-2', 'floor-3'];
    public viewMode = "isometric";

    public enableLayer(name: string, checked: boolean): void {
        if (checked && this.layers.indexOf(name) === -1) {
            this.layers.push(name);
        } else if (!checked && this.layers.indexOf(name) !== -1) {
            this.layers.splice(this.layers.indexOf(name), 1);
        }
    }
}
