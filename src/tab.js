import EventEmitter from 'events';
import utils from 'cg-component-utils';
import uniqid from 'uniqid';
import constants from './const';
import merge from 'merge';

const TABS_CLASS = constants.CLASSES.TABS_CLASS;
const TAB_CLASS = `${TABS_CLASS}-tab`;
const TAB_SELECT_CLASS = `${TAB_CLASS}-select`;
const PANEL_CLASS = `${TABS_CLASS}-panel`;

/**
 * Tab Component Class
 */
class Tab extends EventEmitter {

  /**
   * Tab's settings
   * @property {element|string} title - tab's title
   * @property {element|string} content
   * @returns {Object} settings
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

    // Define identifiers
    this.id = uniqid();
    this.panelId = uniqid();

    this._render();
    this._renderTabPanel();
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
   * @returns {string} title
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
   * @returns {element|string} panel's content
   */
  get content() {
    return this._content;
  }

  /**
   * Select tab
   */
  select() {
    if (this.selected) {
      return;
    }

    // Call listeners for select event
    this.emit(this.constructor.EVENTS.SELECT);

    // Set wai aria attributes
    this._element.setAttribute('tabindex', '0');
    this._element.setAttribute('aria-selected', 'true');

    // Add selected class
    utils.addClass(this._element, TAB_SELECT_CLASS);

    // Show panel associated with this tab
    this.showPanel();

    this.selected = true;
  }

  /**
   * Close tab
   */
  close() {
    // Set wai aria attributes
    this._element.setAttribute('tabindex', '-1');
    this._element.setAttribute('aria-selected', 'false');

    // Remove selected class
    utils.removeClass(this._element, TAB_SELECT_CLASS);

    // Hide panel associated with this tab
    this.hidePanel();

    this.selected = false;
  }

  /**
   * Set focus to tab element
   */
  focus() {
    this._element.focus();
  }

  /**
   * Remove tab element from DOM
   */
  remove() {
    // Emits attached events
    this.emit(this.constructor.EVENTS.REMOVE);

    const tabParent = this._element.parentNode;
    const panelParent = this._panelElement.parentNode;

    if (tabParent && panelParent) {
      tabParent.removeChild(this._element);
      panelParent.removeChild(this._panelElement);
    }
  }

  /**
   * Hide panel associated with this tab
   */
  hidePanel() {
    this._panelElement.style.display = 'none';
    this._panelElement.setAttribute('aria-hidden', 'true');
  }

  /**
   * Show panel associated with this tab
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
    // Declare link to default settings
    const DEFAULT_SETTINGS = this.constructor.DEFAULT_SETTINGS;

    // Extend user's settings with default settings
    this._settings = merge({}, DEFAULT_SETTINGS, settings);

    // Apply each setting using setter
    for (const key in DEFAULT_SETTINGS) {
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
    // Get type of title
    const type = typeof this.title;

    if (type === 'string') {
      // Try to find element on the page and append that
      // Else just inner this string into an element
      try {
        const child = document.querySelector(this.title);

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
        // Try to get element
        child = document.querySelector(this.content);
        this._panelElement.appendChild(child);
      } catch (e) {
        this._panelElement.innerHTML = this.content;
      }
    }
  }

  /**
   * Render mockup for tab
   * @private
   */
  _render() {
    // Create wrapper for tab
    this._element = utils.createHTML(`<li class='${TAB_CLASS}'></li>`);
    this._element.addEventListener('click', this.select.bind(this));

    // Add attributes for wai aria support
    this._element.id = this.id;
    this._element.setAttribute('role', 'tab');
    this._element.setAttribute('aria-controls', this.panelId);
  }

  /**
   * Render mockup for tab panel
   * @private
   */
  _renderTabPanel() {
    // Create wrapper for tab
    this._panelElement = utils.createHTML(`<div class='${PANEL_CLASS}'></div>`);

    // Add attributes for wai aria support
    this._panelElement.id = this.panelId;
    this._panelElement.setAttribute('role', 'tabpanel');
    this._panelElement.setAttribute('aria-labelledby', this.id);
  }
}

export default Tab;
