'use strict';

import './common.less';

import Tab from './tab';
import EventEmitter from 'events';
import helpFuncs from './help-funcs';
import utils from 'cg-component-utils';
import constants from './const';
import merge from 'merge';

const TABS_CLASS = constants.CLASSES.TABS_CLASS;
const TABS_CONTAINER_CLASS = `${TABS_CLASS}__tab-list-container`;
const PANELS_CONTAINER_CLASS = `${TABS_CLASS}__panel-list-container`;
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
   * @returns {Object}
   */
  static get DEFAULT_SETTINGS() {
    if (!this._DEFAULT_SETTINGS) {
      this._DEFAULT_SETTINGS = {
        selected: 0
      };
    }
    return this._DEFAULT_SETTINGS;
  }

  static get EVENTS() {
    if (!this._EVENTS) {
      this._EVENTS = {
        SELECT: 'select'
      };
    }
    return this._EVENTS;
  }

  /**
   *
   * @param {Array} options
   * @param {Object} [settings]
   * @constructor
   */
  constructor(options, settings) {
    CgTabs.countCalls++;

    super();

    this.settings =
      merge.recursive(true, this.constructor.DEFAULT_SETTINGS,
                      settings);
    this.options = options;

    this.tabs = [];

    this._render();
    this._defineContainer();
    this._init();
  }

  /**
   * Main element
   * @returns {Element}
   */
  get container() {
    return this.settings.container;
  }

  /**
   *
   * @param {Element} element
   */
  set container(element) {
    this.settings.container = element;
  }

  /**
   * add Tab element to current state
   * @param title
   * @param content
   */
  addTab(title, content) {
    let tab = new Tab(title, content);

    // write and append new tab on the page
    this.tabs.push(tab);
    this._tabListElement.appendChild(tab._element);
    this._panelListElement.appendChild(tab._panelElement);

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
   * @param {Object} tab - tab to be removed
   */
  removeTab(tab) {
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
   * @private
   */
  _render() {
    // draw shell for
    let tabListContainer = `<div class="${TABS_CONTAINER_CLASS}">
        <ul class="${TAB_LIST_CLASS}" role="tablist"></ul>
      </div>`;
    let panelListContainer = `<div class="${PANELS_CONTAINER_CLASS}">
        <div class="${PANEL_LIST_CLASS}"></div>
      </div>`;

    tabListContainer = utils.createHTML(tabListContainer);
    panelListContainer = utils.createHTML(panelListContainer);

    this._tabListElement = tabListContainer.querySelector(`.${TAB_LIST_CLASS}`);
    this._panelListElement = panelListContainer.querySelector(`.${PANEL_LIST_CLASS}`);

    let tab;
    let title;
    let content;

    for (let i = 0; i < this.options.length; i++) {
      title = this.options[i].title;
      content = this.options[i].content;

      tab = this.addTab(title, content);

      // attach event, for switching between tabs
      tab._element.addEventListener('keydown', e => {
        let keyCode = e.which || e.keyCode;

        switch (keyCode) {
          // for previous tab
          case KEY_CODE.ARROW.LEFT:
          case KEY_CODE.ARROW.DOWN:
            this.selectPrevTab();
            break;
          // for next tab
          case KEY_CODE.ARROW.RIGHT:
          case KEY_CODE.ARROW.UP:
            this.selectNextTab();
            break;
          // switch to first tab
          case KEY_CODE.HOME:
            this.selectTab(0);
            break;
          // switch to last tab
          case KEY_CODE.END:
            this.selectTab(this.tabs.length - 1);
            break;
        }
      });

      // attach custom event for select tab's method
      tab.on('select', this._updateCurrentTab.bind(this, tab));

      tab.close();
    }
  }

  /**
   * Create container if it's need
   * Or just append children for current element
   * @private
   */
  _defineContainer(){
    // create if container is undefined or not an Element
    if (!(this.container instanceof HTMLElement)) {
      this.container = utils.createHTML(`<div></div>`);
    }

    this.container.classList.add(`${TABS_CLASS}`);

    this.container.appendChild(this._tabListElement);
    this.container.appendChild(this._panelListElement);
  }

  /**
   * Initialize state of component
   * @private
   */
  _init() {
    let index;

    index = this.settings.selected;
    index = index > this.tabs.length ? 0 : index;

    this.selectTab(index);
  }
}

/**
 * Save how many times constructor was called.
 * It's need to create wai aria support
 * @type {number}
 */
CgTabs.countCalls = 0;

module.exports = CgTabs;