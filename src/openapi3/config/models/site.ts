// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Device } from './device';
import { DeviceGroup } from './device-group';
import { Sim } from './sim';
import { SitePlan } from './site-plan';
import { Slice } from './slice';
import { SmallCell } from './small-cell';
export interface Site {
  'device-groups': Array<DeviceGroup>;
  devices: Array<Device>;
  'display-name'?: string;
  image?: string;
  sims: Array<Sim>;
  'site-id': string;
  'site-plans'?: { 'isometric': boolean, 'origin'?: 'ORIGIN_CENTROID' | 'ORIGIN_TOP_LEFT', 'site-plan-list'?: Array<SitePlan>, 'layers'?: Array<{ 'layer-id': string, 'display-name'?: string }> };
  slices: Array<Slice>;
  'small-cells': Array<SmallCell>;
}
