import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node';
import { Cache } from '../src';

import { AppRoutingModule } from '../client/src/app/app-routing.module';

import { TestDataService } from '../client/src/app/services/test-data/test-data.service';

import { AppComponent } from '../client/src/app/app.component';
import { Page1Component } from '../client/src/app/page1/page1.component';
import { Page2Component } from '../client/src/app/page2/page2.component';


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