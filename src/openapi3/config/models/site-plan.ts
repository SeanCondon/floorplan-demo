// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
export interface SitePlan {

  /**
   * The site plan identifier
   */
  id: string;

  /**
   * some sites will have multiple buildings and multiple floors The X and Y offset will allow plans to be shown alongside each other. The Z Offset will allow plans to be stacked over each other in an isometric view
   */
  offsets?: { 'x-offset': number, 'y-offset': number, 'z-offset': number };
  'svg-file': string;
}
