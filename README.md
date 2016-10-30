# angular2-universal-render
Renderer of Angular application on Node

**caution**  
`angular2-universal-render` only work when using Angular 2.1.0.  
Because angular-universal is not yet correspond to Angular Core 2.1.1.  

# Motivation
I wanted to run the server-side rendering of [angular-universal](https://github.com/angular/universal), without having to depend on the request of the web server.  
Without using the Express, for example, even on AWS Lambda, it is possible to perform rendering as a function call.  

# Reference
I created this library to reference [angular2-express-engine](https://github.com/angular/universal/tree/master/modules/express-engine).  
I was re-implemented `createEngine()`, so that it can be run independently.  

# Usage
## Install
```
$ npm install angular2-universal-render
```

## Basic
First to define the app modules for node.  
Use modules of `angular2-universal/node`.  

```
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { TestDataService } from './services/test-data.service';
import { Cache } from '../../src';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component
  ],
  imports: [
    FormsModule,
    UniversalModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    TestDataService,
    Cache
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(public cache: Cache) {}

  // we need to use the arrow function here to bind the context as this is a gotcha in Universal for now until it's fixed
  universalDoDehydrate = (universalCache) => {
    universalCache['Cache'] = JSON.stringify(this.cache.dehydrate());
  }

  universalAfterDehydrate = () => {
    this.cache.clear();
  }

}
```

Next, create render function by `angular2-universal-render`.  
Do not forget to import `angular2-universal-polyfills/node`.  

```
import 'angular2-universal-polyfills/node';

import * as path from 'path';
import * as fs from 'fs';

import { AppModule } from './app/app.module.node';
import { createRender } from 'angular2-universal-render';

const document = fs.readFileSync(path.resolve(process.cwd(), './example/index.html'), 'utf-8');
const render = createRender({
  document: document,
  ngModule: AppModule
});
```

Finally, call the rendering function with request url.  
This function return Promise<string> object.  

```
render({
  requestUrl: '/page2'
})
.then(html => {
  console.log(html);
});
```

## Cache
When you want to share the data between the server and the browser, use `universal-cache`.
Data de-serialized in the browser, to use seamlessly.  

```
import { Component, OnInit } from '@angular/core';

import { TestDataService } from '../services/test-data.service';
import { Cache } from 'angular2-universal-render';

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
```
