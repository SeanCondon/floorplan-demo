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
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: '[app-floor]',
  templateUrl: 'floor.component.svg',
  styleUrls: ['./floor.component.scss'],
  animations: [
    trigger('isometricToggle', [
      state('0', style({
        transform: 'skewX(0deg) skewY(0deg) translateX(0px) translateY(0px) scaleX(1.0) scaleY(1.0)'
      })),
      state('1', style({
        transform: 'skewX(-40deg) skewY(10deg) translateX(400px) translateY(80px) scaleX(0.6) scaleY(0.2)'
      })),
      // default
      transition('0 => 1', animate('500ms ease-in')),
      transition('* => 0', animate('500ms ease-out'))
    ])
  ],
})
export class FloorComponent implements OnChanges {
  @Input() title: string = '';
  @Input() layers: string[] = [];
  @Input() isometric: boolean = false;

  skewX: number = 0;
  skewY: number = 0;
  scaleX: number = 1.0;
  scaleY: number = 1.0;
  translateX: number = 0;
  translateY: number = 0;

  constructor(
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

}
