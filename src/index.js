'use strict';

import './common.less';
//import 'mouse-focused';

import Tab from './tab';
import EventEmitter from 'events';
import Scroll from './scroll';
import utils from 'cg-component-utils';
import constants from './const';
import merge from 'merge';

const TABS_CLASS = constants.CLASSES.TABS_CLASS;
const TABS_CONTAINER_CLASS = `${TABS_CLASS}__tab-list-container`;
const PANELS_CONTAINER_CLASS = `${TABS_CLASS}__panel-list-container`;
const TABS_CONTENT_CLASS = `${TABS_CLASS}__tab-list-content`;
const TAB_LIST_CLASS = `${TABS_CLASS}__tab-list`;
const PANEL_LIST_CLASS = `${TABS_CLASS}__panel-list`;

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

class CgTabs extends EventEmitter {
  /**
   * Default tab navigation's settings
   * @property {string|element} container - container where will be placed tabs
   * @property {number}         selected - index first selected tab
   * @property {array}          tabs - tabs list
   * @property {string}         options[].title - title for tab
   * @property {element|string} options[].content - content for panel list
   * @returns {object}
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
   * @property {string} ADD - emit when the was created new tab
   * @returns {object}
   * @static
   */
  static get EVENTS() {
    if (!this._EVENTS) {
      this._EVENTS = {
        SELECT: 'select',
        ADD: 'add'
      };
    }
    return this._EVENTS;
  }

  /**
   *
   * @param container
   * @returns {Element}
   * @private
   */
  static _fixContainer(container){
    if(container instanceof HTMLElement){
      return container;
    }

    if(typeof container === 'string'){
      let element = document.querySelector(container);

      if(element !== null){
        return element;
      }
    }

  }

  static _fixSetting(name, value) {
    const DEFAULT_SETTINGS = this.constructor.DEFAULT_SETTINGS;

    switch (name) {
      // field 'selected' should be a number
      case 'selected':
        if (isNaN(value)) {
          value = DEFAULT_SETTINGS[name];
        }
        break;
    }

    return value;
  }

  static _fixSettings(settings) {
    for (let name in settings) {
      if (settings.hasOwnProperty(name)) {
        settings[name] = this._fixSetting(name, settings[name]);
      }
    }

    return settings;
  }

  /**
   * @param {Object} [settings] - user's settings. extends with default settings
   * @constructor
   */
  constructor(settings) {
    super();

    this._render();
    this._setSettings(settings);
    this._createTabs();
    this._init();
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
    let fixed = this.constructor._fixContainer(value);

    if(typeof fixed !== 'undefined'){
      this._settings.container = fixed;
      this._settings.container.appendChild(this._rootElement);
    }
  }

  /**
   * Setter for selecting tab
   * @param {number} value
   */
  set selected(value) {
    if (value == undefined) return;

    this._settings.selected = value;
    this.selectTab(value);
  }

  /**
   * Getter for selecting tab
   * @returns {number}
   */
  get selected() {
    return this._settings.selected;
  }

  /**
   * add Tab element to current state
   * @param {Object} [options]
   * @param {Number} [position]
   */
  addTab(options, position) {
    let tab = new Tab(options);

    // write and append new tab on the page
    this.tabs.push(tab);

    if (typeof position === 'number') {
      if (position !== this.tabs.length) {
        let reference = this.tabs[position];

        this._tabListContent.insertBefore(tab._element, reference);
      }
    } else {
      this._tabListContent.appendChild(tab._element);
    }

    this._panelListElement.appendChild(tab._panelElement);

    // attach custom event for select tab's method
    tab.on('select', this._updateCurrentTab.bind(this, tab));

    //todo: if tab will be added by component's user these events will not be added
    // attach event, for switching between tabs
    tab._element.addEventListener('keydown', e => {
      let keyCode = e.which || e.keyCode;

      switch (keyCode) {
        // for previous tab
        case KEY_CODE.ARROW.LEFT:
        case KEY_CODE.ARROW.DOWN:
          this.selectPrevTab();
          this.tab.focus();
          break;
        // for next tab
        case KEY_CODE.ARROW.RIGHT:
        case KEY_CODE.ARROW.UP:
          this.selectNextTab();
          this.tab.focus();
          break;
        // switch to first tab
        case KEY_CODE.HOME:
          this.selectTab(0);
          this.tab.focus();
          break;
        // switch to last tab
        case KEY_CODE.END:
          this.selectTab(this.tabs.length - 1);
          this.tab.focus();
          break;
      }
    });

    this._updateTabList();

    return tab;
  }

  /**
   * Select next tab from tabs list
   */
  selectNextTab() {
    let index, nextTab;

    // get index of current tab and select next tab
    index = this.tabs.indexOf(this.tab);
    index = index >= (this.tabs.length - 1) ? 0 : ++index;

    nextTab = this.tabs[index];
    nextTab.select();
  }

  /**
   * Select previous tab from tabs list
   */
  selectPrevTab() {
    let index, prevTab;

    // get index of current tab and select next tab
    index = this.tabs.indexOf(this.tab);
    index = index <= 0 ? (this.tabs.length - 1) : --index;

    prevTab = this.tabs[index];
    prevTab.select();
  }

  /**
   * Select tab from index
   * @param {Number} index - number from 0 to the number of tabs
   */
  selectTab(index) {
    let tab = this.tabs[index];

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
        this.tabs[tab].remove();
        this.tabs.splice(1, tab);
      }

      return;
    }

    // get tab position from list
    let position = this.tabs.indexOf(tab);

    if (position > -1) {
      this.tabs.splice(1, position);

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
    if (this.tab === undefined) {
      this.tab = tab;

      return;
    }

    this.tab.close();
    this.tab = tab;
  }

  /**
   * Apply Settings
   * @param {object} settings
   * @private
   */
  _setSettings(settings) {
    settings = this.constructor._fixSettings(settings);

    // declare link to default settings
    const DEFAULT_SETTINGS = this.constructor.DEFAULT_SETTINGS;

    // extend user's settings with default settings
    this._settings = merge({}, DEFAULT_SETTINGS, settings);

    // apply each setting using setter
    for (let key in DEFAULT_SETTINGS) {
      if (DEFAULT_SETTINGS.hasOwnProperty(key)) {
        this[key] = settings[key];
      }
    }
  }

  /**
   * Renderer tab's markup
   * @private
   */
  _render() {
    // create container for tabs component
    this._rootElement = document.createElement('div');
    this._rootElement.className = TABS_CLASS;

    // draw shell for
    let tabListContainer = `<div class="${TABS_CONTAINER_CLASS}">
        <div class="${TAB_LIST_CLASS}">
          <ul class="${TABS_CONTENT_CLASS}" role="tablist"></ul>
        </div>
      </div>`;
    let panelListContainer = `<div class="${PANELS_CONTAINER_CLASS}">
        <div class="${PANEL_LIST_CLASS}"></div>
      </div>`;

    tabListContainer = utils.createHTML(tabListContainer);
    panelListContainer = utils.createHTML(panelListContainer);

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
    let tab;
    let i = 0;

    for (this.tabs = []; i < this._settings.tabs.length; i++) {
      tab = this.addTab(this._settings.tabs[i]);
      tab.close();
    }
  }

  /**
   * Initialize state of component
   * @private
   */
  _init() {
    let index;

    index = this._settings.selected;
    index = index > this.tabs.length ? 0 : index;

    this.selectTab(index);
  }

  /**
   * When numbers of the tabs more than container could contain in one line -
   * need to add useful arrows to make the tabs scrollable.
   */
  _updateTabList() {
    // get tab list panel size
    const contentWidth = this._tabListContent.getBoundingClientRect().width;
    const containerWidth = this._tabListContainer.getBoundingClientRect().width;
    const diff = contentWidth - containerWidth;

    if (diff > 0) {
      if (!this.scroll) {
        this.scroll = new Scroll(this._tabListElement);
      }
      this.scroll.enable();
    } else {
      if (this.scroll) {
        this.scroll.disable();
      }
    }
  }
}

module.exports = CgTabs;