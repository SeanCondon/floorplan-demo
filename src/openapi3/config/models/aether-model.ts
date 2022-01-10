// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Application } from './application';
import { Enterprise } from './enterprise';
import { Site } from './site';

/**
 * Top level configuration
 */
export interface AetherModel {
  applications: Array<Application>;
  enterprise: Enterprise;

  /**
   * a collection of sites
   */
  sites: Array<Site>;
}
