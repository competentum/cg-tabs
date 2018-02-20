import { Selector } from 'testcafe';

const PAGE_URL = 'http://localhost:4000';

fixture('Check initial state:')
  .page(PAGE_URL);

test('Tablist exists', async t => {
  const tablistExists = Selector('[role="tablist"]').exists;

  await t
    .expect(tablistExists).ok();
});

test('Tabs exist', async t => {
  const tabsCount = Selector('[role="tab"]').count;

  await t
    .expect(tabsCount).eql(4);
});

test('The first tab is selected', async t => {
  const tab = Selector('[role="tab"]').nth(0);

  await t
    .expect(tab.getAttribute('aria-selected')).eql('true')
    .expect(tab.getAttribute('tabindex')).eql('0');
});
