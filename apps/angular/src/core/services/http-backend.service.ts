import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** Http backend client. */
@Injectable({ providedIn: 'root' })
export class HttpBackendClient extends HttpClient {
  public constructor(
    protected httpBackend: HttpBackend,
  ) {
    super(httpBackend);
  }
}
