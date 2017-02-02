import 'angular2-universal-polyfills/node';

import { assert } from 'chai';

import * as path from 'path';
import * as fs from 'fs';

import { AppModule } from '../app.module';
import { createRender, Render } from '../../src';

describe('createRender()', () => {
  const document = fs.readFileSync(path.resolve(process.cwd(), './client/dist/index.html'), 'utf-8');

  describe('Rendering with minimum options.', () => {
    var render: Render;

    it('Should get render function with minimum options.', () => {
      render = createRender({
        document: document,
        ngModule: AppModule
      });

      assert.equal(typeof render, 'function');
    });

    it('Shoud render with request url.', () => {
      return render({ requestUrl: '/page1' })
      .then(html => {
        assert.equal(typeof html, 'string');
      });
    });

    it('Shoud render with other request url.', () => {
      return render({ requestUrl: '/page2' })
      .then(html => {
        assert.equal(typeof html, 'string');
      });
    });

  });

});
