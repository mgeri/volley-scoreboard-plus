/**
 * Volley Scoreboard API
 * ## Overview  REST (Representational State Transfer) is the standard way of accessing resources over the web.  It is done through four standard HTTP operations.    * GET   * POST (create)   * PUT (update)   * DELETE  The _R_ in _REST_ refers to the representation (or format) of the resource being accessed.  In our case, it is the web-standard [JSON](www.json.org) (JavaScript Object Notation) format.   ### HTTP requests  Section | Component             | Description --------|-----------------------|------------------------------------------------------------------------------------------ Action  | HTTP operation        | GET - retrieve a resource</br> PUT - replace a resource</br>POST - create a resource</br>DELETE - delete a resource Action  | HTTPS                 | The secure web protocol. It ensures that requests are encrypted between the application and the API Action  | www.my-sample.com     | The API gateway location Action  | /v1                   | The API version  Action  | /foos                 | The address of the resource you are accessing Request Header | Authorization: Bearer x                  | The authorization session security token x, obtained on login via the /session API Request Header | Content-Type: application/json           | Request format type. This should always be set as indicated to json only Request Header | Accept: application/json; charset=UTF-8  | Response format type. This should always be set as indicated to json only Request Body   | Only required for PUT or POST requests   | JSON format   ### HTTP Response  Section | Component                  | Description --------|----------------------------|------------------------------------------------------------------------------------------ HTTP status code  | 200 OK           | Request executed fine. HTTP status code  | 201 Created      | Response to a POST that results in a creation. HTTP status code  | 204 No Content   | Response to a successful request that won\'t be returning a body (like a DELETE request). HTTP status code  | 400 Bad Request  | The request was invalid or cannot be served. The exact error should be explained in the error payload. HTTP status code  | 401 Unauthorized | The request requires an user authentication. HTTP status code  | 403 Forbidden    | The server understood the request, but is refusing it or the access is not allowed (authenticated user doesn\'t have access to the resource). HTTP status code  | 404 Not found    | When a non-existent resource is requested. HTTP status code  | 422 Unprocessable Entity  | Used for validation errors (e.g. if an image cannot be formatted or mandatory fields are missing in the payload). HTTP status code  | 500 Internal Server Error | Tells the client something happened on the server and their request by itself was perfectly valid. The client can continue and try again with the request without modification. Response Body     | Request results, if any   | JSON format.  ### Errors  Error responses contain a 4xx or 5xx HTTP status and a body with the following format:  ```json {     \"error\": {         \"code\": 190,         \"subcode\": 460,         \"message\": \"Message describing the error\",          \"internal\" {           \"exception\": \"message\",           \"stackTrace: \"...\"         }     } } ```  * _code_: error code * _subcode_: error subcode * _message_: error message * _internal_: available only on debug environment  ### Paging  Paging could be applied to a subset of endpoints returning a list of entries for some requests.  We are going to use the standard way of solving this problem by encoding the paging information in a URI query:    /api/v1/foos?page=0&size=10  A paged request will returns a paged response with the Page object envelop (see Page model). Below a Page response sample:  ```json   {     content : [         { ...  },         { .... },         ...     ],     first: true,     last: false,     size : 5,     totalElements : 50,     totalPages : 10,     number : 0   } ```   If pagination is declared as mandatory for a rest resource, the __size__ parameter is mandatory. If not present an HTTP __404 Not found__ error is returned. If the page is not available an HTTP __404 Not found__ error is returned.  The page number is zero-based index. If there are no results, a Page object is returned with a 0 length __content__ array.  ### Sorting  To have your results sorted on a particular property, add a sort URL parameter with the name of the property you want to sort the results on. You can control the direction of the sort by appending a \",\" to the the property name plus either _asc_ or _desc_.   To sort the results by more than one property, keep adding as many _sort=PROPERTY_ parameters as you need.  Below a sort request sample:    http://localhost:8080/api/v1/foos?page=1&size=10&sort=field1,desc&sort=field2,asc   ### Date & Time  As for the [OpenApi 3.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md) specification, _date_ and _date-time_ format are codified in json as string following [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14) definition:    * date string:  as defined by full-date - [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14)   * date-time string: as defined by date-time - [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14)  ### API Versioning  Only the major version number is put in the URL. The minor version doesn\'t  go in, because backwards compatibility is almost always guaranteed with the same major version. 
 *
 * The version of the OpenAPI document: 0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { ErrorResponse } from '../model/errorResponse';
import { ScoreboardPrefs } from '../model/scoreboardPrefs';
import { ScoreboardStatus } from '../model/scoreboardStatus';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class DefaultService {

    protected basePath = 'http://localhost:4000/api/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * Server heartbeat operation
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public pingGet(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public pingGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public pingGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public pingGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/ping`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return the scoreboard preferences (colors, team names).
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public scoreboardPrefsGet(observe?: 'body', reportProgress?: boolean): Observable<ScoreboardPrefs>;
    public scoreboardPrefsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ScoreboardPrefs>>;
    public scoreboardPrefsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ScoreboardPrefs>>;
    public scoreboardPrefsGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<ScoreboardPrefs>(`${this.configuration.basePath}/scoreboard/prefs`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update scoreboard Prefs.
     * @param scoreboardPrefs 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public scoreboardPrefsPut(scoreboardPrefs: ScoreboardPrefs, observe?: 'body', reportProgress?: boolean): Observable<ScoreboardPrefs>;
    public scoreboardPrefsPut(scoreboardPrefs: ScoreboardPrefs, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ScoreboardPrefs>>;
    public scoreboardPrefsPut(scoreboardPrefs: ScoreboardPrefs, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ScoreboardPrefs>>;
    public scoreboardPrefsPut(scoreboardPrefs: ScoreboardPrefs, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (scoreboardPrefs === null || scoreboardPrefs === undefined) {
            throw new Error('Required parameter scoreboardPrefs was null or undefined when calling scoreboardPrefsPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<ScoreboardPrefs>(`${this.configuration.basePath}/scoreboard/prefs`,
            scoreboardPrefs,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return the scoreboard status (points, set, timeouts).
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public scoreboardStatusGet(observe?: 'body', reportProgress?: boolean): Observable<ScoreboardStatus>;
    public scoreboardStatusGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ScoreboardStatus>>;
    public scoreboardStatusGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ScoreboardStatus>>;
    public scoreboardStatusGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<ScoreboardStatus>(`${this.configuration.basePath}/scoreboard/status`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update scoreboard status (points, set, timeouts).
     * @param scoreboardStatus 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public scoreboardStatusPut(scoreboardStatus: ScoreboardStatus, observe?: 'body', reportProgress?: boolean): Observable<ScoreboardStatus>;
    public scoreboardStatusPut(scoreboardStatus: ScoreboardStatus, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ScoreboardStatus>>;
    public scoreboardStatusPut(scoreboardStatus: ScoreboardStatus, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ScoreboardStatus>>;
    public scoreboardStatusPut(scoreboardStatus: ScoreboardStatus, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (scoreboardStatus === null || scoreboardStatus === undefined) {
            throw new Error('Required parameter scoreboardStatus was null or undefined when calling scoreboardStatusPut.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<ScoreboardStatus>(`${this.configuration.basePath}/scoreboard/status`,
            scoreboardStatus,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
