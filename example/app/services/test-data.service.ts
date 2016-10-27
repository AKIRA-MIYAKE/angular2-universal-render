import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestDataService {

  constructor(private http: Http) { }
  
  fetch(): Promise<Object> {
    return this.http.get('https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=info&titles=TypeScript')
    .toPromise()
    .then(response => response.json() as Object);
  }

}
