import { Selector } from 'testcafe';

const PAGE_URL = 'http://localhost:4000';

const TABS_SELECTOR = '#container .cg-tabs .cg-tabs-tab-select';

/**
 * Test keys and mouse interactions with tabs
 * @param t - Test Controller object
 * @returns {Promise.<void>}
 */
async function focusTab(t) {
  await t.click(TABS_SELECTOR);
  return t;
}

fixture('Check Keys Actions:')
  .page(PAGE_URL)
  .beforeEach(focusTab);

test('Right', async t => {
  const firstTab = Selector('[role="tab"]').nth(0);
  const secondTab = Selector('[role="tab"]').nth(1);

  await t
    .pressKey('right')
    .expect(secondTab.getAttribute('aria-selected')).eql('true')
    .expect(secondTab.getAttribute('tabindex')).eql('0')
    .expect(firstTab.getAttribute('aria-selected')).eql('false')
    .expect(firstTab.getAttribute('tabindex')).eql('-1');
});

test('Left', async t => {
  const firstTab = Selector('[role="tab"]').nth(0);
  const lastTab = Selector('[role="tab"]').nth(3);

  await t
    .pressKey('left')
    .expect(lastTab.getAttribute('aria-selected')).eql('true')
    .expect(lastTab.getAttribute('tabindex')).eql('0')
    .expect(firstTab.getAttribute('aria-selected')).eql('false')
    .expect(firstTab.getAttribute('tabindex')).eql('-1');
});
