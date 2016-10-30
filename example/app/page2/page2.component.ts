import { Component, OnInit } from '@angular/core';

import { TestDataService } from '../services/test-data.service';
import { Cache } from '../../../src';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  
  testData: string;
  
  constructor(private testDataSerivce: TestDataService, private cache: Cache) { }

  ngOnInit() {
    this.fetchTestData();
  }
  
  fetchTestData() {
    this.testDataSerivce
    .fetch()
    .then(data => { 
      this.cache.set('testData', data);
      this.testData = JSON.stringify(data)
    });
  }
  
  clickButtonDidClick() {
    alert(JSON.stringify(this.cache.get('testData')));
  }

}
