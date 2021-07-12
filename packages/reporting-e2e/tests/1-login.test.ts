import { login } from './utils';

describe('login', () => {
  it('can login', () => {
    login();
    expect(browser.waitUntil(() => new URL(browser.getUrl()).pathname === '/')).toBeTruthy();
  });
  it('subsequent visits do not require login', () => {
    browser.url('/');
    expect($('h6*=Reports')).toBeDisplayed();
  });
});
