import { Component, OnInit } from '@angular/core';

import { TestDataService } from '../services/test-data/test-data.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  testData: string;

  constructor(private testDataService: TestDataService) { }

  ngOnInit() {
    this.fetchTestData();
  }

  fetchTestData() {
    this.testDataService
    .fetch()
    .then(data => { 
      this.testData = JSON.stringify(data)
    });
  }

}
