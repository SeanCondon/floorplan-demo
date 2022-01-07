// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AetherModel } from '../models/aether-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAetherConfiguration
   */
  static readonly GetAetherConfigurationPath = '/config';

  /**
   * GET /ap-list.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAetherConfiguration()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherConfiguration$Response(params?: {
  }): Observable<StrictHttpResponse<AetherModel>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetAetherConfigurationPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AetherModel>;
      })
    );
  }

  /**
   * GET /ap-list.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAetherConfiguration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAetherConfiguration(params?: {
  }): Observable<AetherModel> {

    return this.getAetherConfiguration$Response(params).pipe(
      map((r: StrictHttpResponse<AetherModel>) => r.body as AetherModel)
    );
  }

}
