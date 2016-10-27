import 'angular2-universal-polyfills/node';

import * as path from 'path';
import * as fs from 'fs';

import { AppModule } from './app/app.module.node';
import { createRender } from '../src';

const document = fs.readFileSync(path.resolve(process.cwd(), './example/index.html'), 'utf-8');
const render = createRender({
  document: document,
  ngModule: AppModule
});

render({
  time: true,
  requestUrl: '/page2'
})
.then(html => {
  console.log('====================');
  console.log(html);
  console.log('====================');
  
  fs.open(path.resolve(process.cwd(), './example/page2.html'), 'w+', (e, fd) => {
    if (e) {
      console.error(e);
    }
    fs.writeSync(fd, html);
    fs.closeSync(fd);
  });
  
})