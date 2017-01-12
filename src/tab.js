import EventEmitter from 'events';
import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';
import constants from './const';
import merge from 'merge';

const TABS_CLASS = constants.CLASSES.TABS_CLASS;
const TAB_CLASS = `${TABS_CLASS}__tab`;
const TAB_SELECT_CLASS = `${TAB_CLASS}--select`;
const PANEL_CLASS = `${TABS_CLASS}__panel`;

//todo: describe options type

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

  constructor(settings) {
    super();

    //todo: Do settings property need for something? It seems redundant
    // merge default settings and users settings; set links for settings
    this.settings = merge.recursive(true, this.constructor.DEFAULT_SETTINGS, settings);
    //todo: add setters
    this.title = this.settings.title;
    this.content = this.settings.content;

    // define identifiers
    this.id = helpFuncs.generateId();
    this.panelId = helpFuncs.generateId();

    this._render();
    this._renderPanel();
  }

  get width(){
    return this._element.getBoundingClientRect().width;
  }

  /**
   * Select tab
   */
  select() {
    if (this.selected) return;

    // call listeners for select event
    this.emit('select');

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
  focus(){
    this._element.focus();
  }

  /**
   * remove tab element from DOM
   */
  remove() {
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
   * Render markup for tab
   * @param {String|Element} title - tab's title
   * @private
   */
  _render() {
    // get type of title
    let type = typeof this.title;

    // create wrapper for tab
    this._element = utils.createHTML(`<li class='${TAB_CLASS}'></li>`);
    this._element.addEventListener('click', this.select.bind(this));

    // add attributes for wai aria support
    this._element.id = this.id;
    this._element.setAttribute('role', 'tab');
    this._element.setAttribute('aria-controls', this.panelId);

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

    if (this.content instanceof HTMLElement) {
      this._panelElement.appendChild(this.content);

      return;
    }

    if (typeof this.content === 'string') {
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
}

module.exports = Tab;
