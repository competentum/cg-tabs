'use strict';

import './common.less';

import EventEmitter from 'events';
import Tab from './tab';
import Panel from './panel';
import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';

const TAB_NAVIGATOR_CLASS = 'cg-tabs';
const TAB_LIST_CLASS = `${TAB_NAVIGATOR_CLASS}-tab-list`;
const PANEL_LIST_CLASS = `${TAB_NAVIGATOR_CLASS}-panel-list`;

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
        SELECT: 'select',
        CLOSE: 'close'
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
    super();

    let defSettings = this.constructor.DEFAULT_SETTINGS;

    this.settings = helpFuncs.extend({}, defSettings, settings);
    this.options = options;

    this.tabs = [];
    this.removedTabs = [];

    this._render();
    this._init();
  }

  get container(){
    return this.settings.container;
  }

  /**
   * Close current open tab and save selected
   * @param {Tab} tab
   */
  updateCurrentTab(tab){
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

  /**
   * Remove tab
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
    var elementHTML = `
      <div class="${TAB_NAVIGATOR_CLASS}">
        <ul class="${TAB_LIST_CLASS}"></ul>
        <div class="${PANEL_LIST_CLASS}"></div>
      </div>
    `;

    this._rootElement = utils.createHTML(elementHTML);
    this._tabListElement = this._rootElement.querySelector(`.${TAB_LIST_CLASS}`);
    this._panelListElement = this._rootElement.querySelector(`.${PANEL_LIST_CLASS}`);

    let tab, options, title, content, i = 0;

    for(; i < this.options.length; i++){
      options = this.options[i];

      title = options.title;
      content = options.content;

      tab = this.addTab(title, content);

      // attach events and close tab
      tab.on("select", this.updateCurrentTab.bind(this, tab));
      tab.close();
    }

    this.container.appendChild(this._rootElement);
  }

  /**
   * Initialize state of app
   * @private
   */
  _init(){
    this.tab = this.tabs[0];
    this.tab.select();
  }
}

module.exports = CgTabs;