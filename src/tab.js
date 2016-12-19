import EventEmitter from 'events';
import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';
import constants from './const';

const TABS_CLASS = constants.CLASSES.TABS_CLASS;
const TAB_CLASS = `${TABS_CLASS}__tab`;
const TAB_SELECT_CLASS = `${TAB_CLASS}--select`;
const PANEL_CLASS = `${TABS_CLASS}__panel`;

class Tab extends EventEmitter {
  // TODO: merge arguments into object
  constructor(title, content){
    super();

    this.title = title;
    this.content = content;

    // define identifiers
    this.id = helpFuncs.generateId();
    this.panelId = helpFuncs.generateId();

    this._render();
    this._renderPanel();
  }

  /**
   * Select tab
   */
  select(){
    if(this.selected) return;

    // call listeners for select event
    this.emit('select');

    // set wai aria attributes
    this._element.setAttribute('tabindex', 0);
    this._element.setAttribute('aria-selected', 'true');

    // remove selected class and focus on the tab
    this._element.classList.add(TAB_SELECT_CLASS);

    // show panel associated with this tab
    this.showPanel();

    this.selected = true;
  }

  /**
   * Close tab
   */
  close(){
    // set wai aria attributes
    this._element.setAttribute('tabindex', -1);
    this._element.setAttribute('aria-selected', 'false');
    this._element.classList.remove(TAB_SELECT_CLASS);

    // hide panel associated with this tab
    this.hidePanel();

    this.selected = false;
  }

  remove(){
    let tabParent = this._element.parentNode;
    let panelParent = this._panelElement.parentNode;

    if(tabParent && panelParent){
      tabParent.removeChild(this._element);
      panelParent.removeChild(this._panelElement);
    }
  }

  /**
   * Hiding panel associated with this tab
   */
  hidePanel(){
    this._panelElement.style.display = 'none';
    this._panelElement.setAttribute('aria-hidden', 'true');
  }

  /**
   * Showing panel associated with this tab
   */
  showPanel(){
    this._panelElement.style.display = '';
    this._panelElement.setAttribute('aria-hidden', 'false');
  }

  /**
   * Render markup for tab
   * @param {String|Element} title - tab's title
   * @private
   */
  _render(){
    // get type of title
    let type = typeof this.title;

    // create wrapper for tab
    this._element = utils.createHTML(`<li class='${TAB_CLASS}'></li>`);
    this._element.addEventListener('click', this.select.bind(this));

    // add attributes for wai aria support
    this._element.id = this.id;
    this._element.setAttribute('role', 'tab');
    this._element.setAttribute('aria-controls', this.panelId);

    if(type === 'string'){
      // try to find element on the page and append that
      // else just inner this string into an element
      try {
        let child = document.querySelector(this.title);
        this._element.appendChild(child);
      } catch(e){
        this._element.innerHTML = this.title;
      }
    } else {
      throw new Error(this.title + '. Your type - ' + type + '. title must be a String or an Element');
    }
  }

  /**
   * Render markup for tab's panel
   * @param {String|Element} content
   * @private
   */
  _renderPanel(){
    // create wrapper for tab
    this._panelElement = utils.createHTML(`<div class='${PANEL_CLASS}'></div>`);

    // add attributes for wai aria support
    this._panelElement.id = this.panelId;
    this._panelElement.setAttribute('role', 'tabpanel');
    this._panelElement.setAttribute('aria-labelledby', this.id);

    if(this.content instanceof HTMLElement){
      this._panelElement.appendChild(this.content);

      return;
    }

    if(typeof this.content === 'string'){
      let child;

      try {
        // try to get element
        child = document.querySelector(this.content);
        this._panelElement.appendChild(child);
      } catch(e){
        // if string has a .html part - load html
        if(this.content.search(/\.html|http|https/g) > -1){
          // TODO: create polyfill
          fetch(this.content)
            .then(response => {
              return response.text();
            })
            .then(text => {
              this._panelElement.innerHTML = text;
            });
        } else {
          this._panelElement.innerHTML = this.content;
        }
      }
    }
  }
}

module.exports = Tab;
