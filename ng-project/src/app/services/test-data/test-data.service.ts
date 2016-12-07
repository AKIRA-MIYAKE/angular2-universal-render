import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cache } from '../../../../../src';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestDataService {

  constructor(private http: Http, private cache: Cache) { }
  
  fetch(): Promise<Object> {
    if (this.cache.get('testData')) {
      console.log('[TestDataService] Using Cache');
      return Promise.resolve(this.cache.get('testData'));
    } else {
      return this.http.get('https://jsonplaceholder.typicode.com/posts/1')
      .toPromise()
      .then(response => {
        const data = response.json();
        console.log('[TestDataService] Fetch Data')
        this.cache.set('testData', data);
        return data;
      });
    }
    
  }

}