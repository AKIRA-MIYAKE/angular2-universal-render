import { NgProjectPage } from './app.po';

describe('ng-project App', function() {
  let page: NgProjectPage;

  beforeEach(() => {
    page = new NgProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
