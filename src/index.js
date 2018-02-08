import './common.less';
import 'mouse-focused';

import Tab from './tab';
import EventEmitter from 'events';
import utils from 'cg-component-utils';
import constants from './const';
import merge from 'merge';

const TABS_CLASS = constants.CLASSES.TABS_CLASS;
const TABS_CONTAINER_CLASS = `${TABS_CLASS}-tab-list-container`;
const PANELS_CONTAINER_CLASS = `${TABS_CLASS}-panel-list-container`;
const TABS_CONTENT_CLASS = `${TABS_CLASS}-tab-list-content`;
const TAB_LIST_CLASS = `${TABS_CLASS}-tab-list`;
const PANEL_LIST_CLASS = `${TABS_CLASS}-panel-list`;

const KEY_CODE = {
  ARROW: {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40
  },
  HOME: 36,
  END: 35
};


/**
 * Tabs's customizing settings
 * @typedef {Object} TabsSettings
 * @property {Element|string} container - DOM Element or element id in which slider instance should be rendered.
 *                                        This property can be omitted. In this case new DOM element will be created
 *                                        and can be accessed via `tabsInstance.container`
 * @property {number} selected - selected tab
 */

/**
 * Accessible Tabs Component
 */
class CgTabs extends EventEmitter {
  /**
   * Default tab navigation's settings
   * @property {string|element} container - container where will be placed tabs (element or selector)
   * @property {number}         selected - index first selected tab
   * @property {array}          tabs - tabs list
   * @property {string}         tabs[].title - title for tab
   * @property {element|string} tabs[].content - content for tab panel
   * @returns {object} settings
   */
  static get DEFAULT_SETTINGS() {
    if (!this._DEFAULT_SETTINGS) {
      this._DEFAULT_SETTINGS = {
        selected: 0,
        container: document.body,
        tabs: [
          {
            title: 'Sample',
            content: 'Example Text'
          }
        ]
      };
    }

    return this._DEFAULT_SETTINGS;
  }

  /**
   * @property {string} SELECT - emit when user select one of the tabs
   * @returns {object} events
   * @static
   */
  static get EVENTS() {
    if (!this._EVENTS) {
      this._EVENTS = {
        SELECT: 'select'
      };
    }

    return this._EVENTS;
  }

  /**
   * Get element of container
   * @param {Element|String} container
   * @returns {Element} fixed container
   * @private
   */
  static _fixContainer(container) {
    if (container instanceof HTMLElement) {
      return container;
    }

    if (typeof container === 'string') {
      const element = document.querySelector(container);

      if (element !== null) {
        return element;
      }
    }
  }

  static _fixSetting(name, value) {
    const DEFAULT_SETTINGS = this.constructor.DEFAULT_SETTINGS;
    let result = value;

    switch (name) {
      // Field 'selected' should be a number
      case 'selected':
        if (isNaN(result)) {
          result = DEFAULT_SETTINGS[name];
        }
        break;
      default:
        break;
    }

    return result;
  }

  static _fixSettings(settings) {
    for (const name in settings) {
      if (settings.hasOwnProperty(name)) {
        settings[name] = this._fixSetting(name, settings[name]);
      }
    }

    return settings;
  }

  /**
   * @param {Object} settings - user's settings extend default settings
   * @constructor
   */
  constructor(settings) {
    super();

    this._render();
    this._applySettings(settings);
    this._createTabs();

    this.selectTab(this.selected);
  }

  /**
   * The main container
   */
  get container() {
    return this._settings.container;
  }

  /**
   * Placed current component's node into the new container
   * @param {*} value
   */
  set container(value) {
    const container = this.constructor._fixContainer(value);

    if (typeof container !== 'undefined') {
      this._settings.container = container;
      this._settings.container.appendChild(this._rootElement);
    }
  }

  /**
   * Setter for selecting tab
   * @param {number} value
   */
  set selected(value) {
    let index = +value;

    if (isNaN(index)) { // Must be a number
      return;
    }

    // Check that value is between first and last tabs
    index = index > this.tabs.length - 1 ? 0 : index;
    index = index < 0 ? this.tabs.length - 1 : index;

    this._settings.selected = index;
    this.selectTab(index);
  }

  /**
   * Getter for selecting tab
   * @returns {number} selected tab index
   */
  get selected() {
    return this._settings.selected;
  }

  /**
   * Add Tab element to current state
   * @param {Object} options
   * @param {Number} position
   * @return {Tab} tab
   */
  addTab(options, position) {
    const tab = new Tab(options);

    if (typeof position === 'number') {
      if (position !== this.tabs.length) {
        const reference = this.tabs[position]._element;

        // Place element to the desired position of the array
        this.tabs.splice(position, 0, tab);

        // Increment selected index
        this._settings.selected++;

        this._tabListContent.insertBefore(tab._element, reference);
      }
    } else {
      this._tabListContent.appendChild(tab._element);

      // Write and append new tab on the page
      this.tabs.push(tab);
    }

    this._panelListElement.appendChild(tab._panelElement);

    // Attach custom events
    tab.on('select', this._updateCurrentTab.bind(this, tab));
    tab.on('remove', this._updateSelectedTab.bind(this, tab));

    // Attach event, for switching between tabs
    tab._element.addEventListener('keydown', (e) => {
      const keyCode = e.which || e.keyCode;

      switch (keyCode) {
        // For previous tab
        case KEY_CODE.ARROW.LEFT:
        case KEY_CODE.ARROW.DOWN:
          this.selectPrevTab();
          break;
        // For next tab
        case KEY_CODE.ARROW.RIGHT:
        case KEY_CODE.ARROW.UP:
          this.selectNextTab();
          break;
        // Switch to first tab
        case KEY_CODE.HOME:
          this.selectTab(0);
          break;
        // Switch to last tab
        case KEY_CODE.END:
          this.selectTab(this.tabs.length - 1);
          break;
        default:
          break;
      }

      this.tab.focus();
    });

    tab.close();

    return tab;
  }

  /**
   * Select next tab from tabs list
   */
  selectNextTab() {
    this.selected++;
  }

  /**
   * Select previous tab from tabs list
   */
  selectPrevTab() {
    this.selected--;
  }

  /**
   * Select tab from index
   * @param {Number} index - number from 0 to the number of tabs - 1
   */
  selectTab(index) {
    const tab = this.tabs[index];

    if (typeof tab !== 'undefined') {
      tab.select();
    }
  }

  /**
   * Remove tab from tabs list
   * @param {Tab|Number} tab - tab or tab's index to be removed
   */
  removeTab(tab) {
    if (typeof tab === 'number') {
      if (this.tabs[tab] !== undefined) {
        this.tabs.splice(tab, 1);
        this.tabs[tab].remove();
      }

      return;
    }

    // Get tab index from list
    const index = this.tabs.indexOf(tab);

    if (index > -1) {
      this.tabs.splice(index, 1);

      tab.remove();
    }
  }

  /**
   * Close current and save selected tab
   * This method calls only after call Tab's method "select"
   * @param {Tab} tab
   * @private
   */
  _updateCurrentTab(tab) {
    if (this.tab) {
      this.tab.close();
    }

    this.tab = tab;
    this._settings.selected = this.tabs.indexOf(tab);
  }

  /**
   * Apply settings on initialization
   * @param {Object} settings
   * @private
   */
  _applySettings(settings) {
    const fixedSettings = this.constructor._fixSettings(settings);

    const DEFAULT_SETTINGS = this.constructor.DEFAULT_SETTINGS;

    // Extend user's settings with default settings
    /** @type TabsSettings */
    this._settings = merge({}, DEFAULT_SETTINGS, fixedSettings);

    // Apply each setting using setter
    for (const key in DEFAULT_SETTINGS) {
      if (DEFAULT_SETTINGS.hasOwnProperty(key)) {
        this[key] = fixedSettings[key];
      }
    }
  }

  /**
   * Renderer tab's mockup
   * @private
   */
  _render() {
    // Create container for tabs component
    this._rootElement = document.createElement('div');
    this._rootElement.className = TABS_CLASS;

    // Draw shell for
    const tabListContainer = utils.createHTML(`
      <div class="${TABS_CONTAINER_CLASS}">
        <div class="${TAB_LIST_CLASS}">
          <ul class="${TABS_CONTENT_CLASS}" role="tablist"></ul>
        </div>
      </div>
    `);
    const panelListContainer = utils.createHTML(`
      <div class="${PANELS_CONTAINER_CLASS}">
        <div class="${PANEL_LIST_CLASS}"></div>
      </div>
    `);

    this._tabListContainer = tabListContainer;
    this._tabListElement = tabListContainer.querySelector(`.${TAB_LIST_CLASS}`);
    this._tabListContent = tabListContainer.querySelector(`.${TABS_CONTENT_CLASS}`);
    this._panelListElement = panelListContainer.querySelector(`.${PANEL_LIST_CLASS}`);

    this._rootElement.appendChild(tabListContainer);
    this._rootElement.appendChild(panelListContainer);
  }

  /**
   * Create and add tabs into the tabs list
   * @private
   */
  _createTabs() {
    this.tabs = [];

    this._settings.tabs.forEach((tab) => {
      this.addTab(tab);
    });
  }

  /**
   * If selected tab was removed, select another tab instead
   * @param {Tab} tab
   * @private
   */
  _updateSelectedTab(tab) {
    const index = this.tabs.indexOf(tab);

    if (index > -1) {
      this.tabs.splice(index, 1);

      if (this.selected === index) {
        this.selectNextTab();
      }
    }
  }
}

module.exports = CgTabs;
