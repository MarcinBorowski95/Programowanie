import { LogRegMojePage } from './app.po';

describe('log-reg-moje App', () => {
  let page: LogRegMojePage;

  beforeEach(() => {
    page = new LogRegMojePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
