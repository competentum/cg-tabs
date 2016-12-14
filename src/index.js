'use strict';

import './common.less';

import EventEmitter from 'events';
import Tab from './tab';
import Panel from './panel';
import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';

const TABS_CLASS = 'cg-tabs';
const TABS_CONTAINER_CLASS = `${TABS_CLASS}__tab-list-container`;
const PANELS_CONTAINER_CLASS = `${TABS_CLASS}__panel-list-container`;
const LEFT_SCROLL_ARROW_CLASS = `${TABS_CLASS}__tab-list__left-arrow`;
const RIGHT_SCROLL_ARROW_CLASS = `${TABS_CLASS}__tab-list__right-arrow`;
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
        // todo: add defaults here
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

    let defSettings = this.constructor.DEFAULT_SETTINGS;

    this.settings = helpFuncs.extend({}, defSettings, settings);
    this.options = options;

    this.tabs = [];

    this._render();
    this._init();
  }

  get container(){
    return this.settings.container;
  }

  get numberOfCalls(){
    return this.constructor.countCalls;
  }

  get lastTabIndex(){
    return (this.tabs.length - 1);
  }

  /**
   * Close current and save selected tab
   * This method calls only after call Tab's method "select"
   * @param {Tab} tab
   * @private
   */
  _updateCurrentTab(tab){
    if(this.tab === undefined){
      this.tab = tab;

      return;
    }

    this.tab.close();
    this.tab = tab;
  }

  /**
   * add Tab element to current state
   * @param title
   * @param content
   */
  addTab(title, content){
    let tab = new Tab(title, content);

    // write and append new tab on the page
    this.tabs.push(tab);
    this._tabListElement.appendChild(tab._element);
    this._panelListElement.appendChild(tab.panel._element);

    return tab;
  }

  selectNextTab(){
    let index, nextTab;

    // get index of current tab and select next tab
    index = this.tabs.indexOf(this.tab);
    index = index >= (this.tabs.length - 1) ? 0 : ++index;

    nextTab = this.tabs[index];
    nextTab.select();
  }

  selectPrevTab(){
    let index, prevTab;

    // get index of current tab and select next tab
    index = this.tabs.indexOf(this.tab);
    index = index <= 0 ? (this.tabs.length - 1) : --index;

    prevTab = this.tabs[index];
    prevTab.select();
  }

  selectTab(index){
    let tab = this.tabs[index];

    if(tab !== undefined){
      this.tabs[index].select();
    }
  }

  /**
   * Remove tab from list
   * @param {Object} tab
   */
  removeTab(tab){
    let position = this.tabs.indexOf(tab);

    if (position > -1){
      this.tabs.splice(1, position);

      this._tabListElement.removeChild(tab._element);
      this._panelListElement.removeChild(tab.panel._element);
    }
  }

  /**
   * @private
   */
  _render() {
    // draw shell for
    let elementHTML = `
      <div class="${TABS_CLASS}" role="tabpanel">
        <div class="${TABS_CONTAINER_CLASS}">
          <ul class="${TAB_LIST_CLASS}" role="tablist"></ul>
        </div>
        <div class="${PANELS_CONTAINER_CLASS}">
          <div class="${PANEL_LIST_CLASS}"></div>
        </div>
      </div>
    `;

    this._rootElement = utils.createHTML(elementHTML);
    this._tabListElement = this._rootElement.querySelector(`.${TAB_LIST_CLASS}`);
    this._panelListElement = this._rootElement.querySelector(`.${PANEL_LIST_CLASS}`);

    let tabsId = TABS_CLASS + this.numberOfCalls;
    let panelId, tabId, tab, options, title, content, i = 0;

    for(; i < this.options.length; i++){
      options = this.options[i];

      title = options.title;
      content = options.content;

      tabId = tabsId + '__tab' + i;
      panelId = tabsId + '__panel' + i;

      tab = this.addTab(title, content);

      // initialize identifiers for wai aria
      tab.id = tabId;
      tab._element.id = tabId;
      tab.panel.id = panelId;
      tab.panel._element.id = panelId;

      // initialize wai aria attributes
      tab._element.setAttribute("aria-controls", panelId);
      tab.panel._element.setAttribute("aria-labelledby", tabId);

      // attach event, when user switches between tabs
      tab._element.addEventListener("keydown", e => {
        let keyCode = e.which || e.keyCode;

        if (keyCode === KEY_CODE.ARROW.LEFT ||
            keyCode === KEY_CODE.ARROW.DOWN ) this.selectPrevTab();

        if (keyCode === KEY_CODE.ARROW.RIGHT ||
            keyCode === KEY_CODE.ARROW.UP ) this.selectNextTab();

        if (keyCode === KEY_CODE.HOME) this.selectTab(0);
        if (keyCode === KEY_CODE.END) this.selectTab(this.lastTabIndex);
      });

      // attach custom event for select tab's method
      tab.on("select", this._updateCurrentTab.bind(this, tab));

      tab.close();
    }

    this._rootElement.id = tabsId;
    this.container.appendChild(this._rootElement);
  }

  /**
   * Initialize state of app
   * @private
   */
  _init(){
    let index;

    index = this.settings.selected;
    index = index > this.tabs.length ? 0 : index - 1;

    this.selectTab(index);
    this.tab._element.blur();
  }
}

CgTabs.countCalls = 0;

module.exports = CgTabs;