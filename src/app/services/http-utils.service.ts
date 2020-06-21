import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {
  constructor(private httpClient: HttpClient) { }


  header() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  post(endpoint: string, body: any) {
    const headers = this.header();
    const url = environment.baseapiurl + endpoint;
    return this.httpClient.post(url, body, { headers }).pipe(map((response: any) => response),
      catchError(this.handleError)
    );
  }

  get(endpoint: string) {
    const headers = new HttpHeaders();
    const url = environment.baseapiurl + endpoint;
    return this.httpClient.get(url, { headers }).pipe(map((response: any) => response),
      catchError(this.handleError)
    );
  }

  delete(endpoint: string) {
    const headers = new HttpHeaders();
    const url = environment.baseapiurl + endpoint;
    return this.httpClient.delete(url, { headers }).pipe(map((response: any) => response),
      catchError(this.handleError)
    );
  }

  put(endpoint: string, body?: any) {
    const headers = this.header();
    const url = environment.baseapiurl + endpoint;
    return this.httpClient.put(url, body, { headers }).pipe(map((response: any) => response),
      catchError(this.handleError)
    );
  }
  private handleError(response: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    const redirectPath = '';
    console.error(response);
    // if (response.status == 404) {
    //  redirectPath = '/Home/PageNotFound';
    //  window.location.href = redirectPath;
    // }
    // else if (response.status > 400) {
    //  redirectPath = '/Home/UnAuthorisedAccess';
    //  window.location.href = redirectPath;
    // }

    if (response.status === 403) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }

    return throwError(response || 'Server error');
  }

}
