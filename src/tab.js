import EventEmitter from 'events';
import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';
import constants from './const';
import merge from 'merge';

const TABS_CLASS = constants.CLASSES.TABS_CLASS;
const TAB_CLASS = `${TABS_CLASS}__tab`;
const TAB_SELECT_CLASS = `${TAB_CLASS}--select`;
const PANEL_CLASS = `${TABS_CLASS}__panel`;

class Tab extends EventEmitter {

  /**
   * Tab's settings
   * @property {element|string} title - tab's title
   * @property {element|string} content
   * @returns {Object}
   * @static
   */
  static get DEFAULT_SETTINGS() {
    if (!this._DEFAULT_SETTINGS) {
      this._DEFAULT_SETTINGS = {
        title: 'Tab',
        content: 'Example text'
      };
    }
    return this._DEFAULT_SETTINGS;
  }

  static get EVENTS() {
    if (!this._EVENTS) {
      this._EVENTS = {
        REMOVE: 'remove',
        SELECT: 'select'
      };
    }

    return this._EVENTS;
  }

  constructor(settings) {
    super();

    // define identifiers
    this.id = helpFuncs.generateId();
    this.panelId = helpFuncs.generateId();

    this._render();
    this._renderPanel();
    this._applySettings(settings);
  }

  get width() {
    return this._element.getBoundingClientRect().width;
  }

  /**
   * Setter tab's title
   * @param {string} value
   */
  set title(value) {
    this._title = value;
    this._applyTitle();
  }

  /**
   * Getter tab's string
   * @returns {string}
   */
  get title() {
    return this._title;
  }

  /**
   * Setter panel's content
   * @param {element|string} value
   */
  set content(value) {
    this._content = value;
    this._applyContent();
  }

  /**
   * Getter panel's content
   * @returns {element|string}
   */
  get content() {
    return this._content;
  }

  /**
   * Select tab
   */
  select() {
    if (this.selected) return;

    // call listeners for select event
    this.emit(this.constructor.EVENTS.SELECT);

    // set wai aria attributes
    this._element.setAttribute('tabindex', 0);
    this._element.setAttribute('aria-selected', 'true');

    // add selected class
    utils.addClass(this._element, TAB_SELECT_CLASS);

    // show panel associated with this tab
    this.showPanel();

    this.selected = true;
  }

  /**
   * Close tab
   */
  close() {
    // set wai aria attributes
    this._element.setAttribute('tabindex', -1);
    this._element.setAttribute('aria-selected', 'false');

    // remove selected class
    utils.removeClass(this._element, TAB_SELECT_CLASS);

    // hide panel associated with this tab
    this.hidePanel();

    this.selected = false;
  }

  /**
   * set focus on tab element
   */
  focus() {
    this._element.focus();
  }

  /**
   * remove tab element from DOM
   */
  remove() {
    // emits attached events
    this.emit(this.constructor.EVENTS.REMOVE);

    let tabParent = this._element.parentNode;
    let panelParent = this._panelElement.parentNode;

    if (tabParent && panelParent) {
      tabParent.removeChild(this._element);
      panelParent.removeChild(this._panelElement);
    }
  }

  /**
   * Hiding panel associated with this tab
   */
  hidePanel() {
    this._panelElement.style.display = 'none';
    this._panelElement.setAttribute('aria-hidden', 'true');
  }

  /**
   * Showing panel associated with this tab
   */
  showPanel() {
    this._panelElement.style.display = '';
    this._panelElement.setAttribute('aria-hidden', 'false');
  }

  /**
   *
   * @param {object} settings
   * @private
   */
  _applySettings(settings) {
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
   * Update current title
   * @private
   */
  _applyTitle() {
    // get type of title
    let type = typeof this.title;

    if (type === 'string') {
      // try to find element on the page and append that
      // else just inner this string into an element
      try {
        let child = document.querySelector(this.title);
        this._element.appendChild(child);
      } catch (e) {
        this._element.innerHTML = this.title;
      }
    } else {
      throw new Error(this.title + '. Your type - ' + type
                      + '. title must be a String.');
    }
  }

  /**
   * Update current panel's content
   * @private
   */
  _applyContent() {
    if (this.content instanceof HTMLElement) {
      this._panelElement.appendChild(this.content);
    } else if (typeof this.content === 'string') {
      let child;

      try {
        // try to get element
        child = document.querySelector(this.content);
        this._panelElement.appendChild(child);
      } catch (e) {
        this._panelElement.innerHTML = this.content;
      }
    }
  }

  /**
   * Render markup for tab
   * @param {String|Element} title - tab's title
   * @private
   */
  _render() {
    // create wrapper for tab
    this._element = utils.createHTML(`<li class='${TAB_CLASS}'></li>`);
    this._element.addEventListener('click', this.select.bind(this));

    // add attributes for wai aria support
    this._element.id = this.id;
    this._element.setAttribute('role', 'tab');
    this._element.setAttribute('aria-controls', this.panelId);
  }

  /**
   * Render markup for tab's panel
   * @param {String|Element} content
   * @private
   */
  _renderPanel() {
    // create wrapper for tab
    this._panelElement =
      utils.createHTML(`<div class='${PANEL_CLASS}'></div>`);

    // add attributes for wai aria support
    this._panelElement.id = this.panelId;
    this._panelElement.setAttribute('role', 'tabpanel');
    this._panelElement.setAttribute('aria-labelledby', this.id);
  }
}

module.exports = Tab;
