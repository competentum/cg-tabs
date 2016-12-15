import EventEmitter from 'events';
import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';

const TABS_CLASS = 'cg-tabs';
const TAB_CLASS = `${TABS_CLASS}__tab`;
const TAB_SELECT_CLASS = `${TAB_CLASS}--select`;
const PANEL_CLASS = `${TABS_CLASS}__panel`;

class Tab extends EventEmitter {
  constructor(title, content){
    super();

    this._render(title);
    this._renderPanel(content);
  }

  /**
   * Select tab
   */
  select(){
    if(this.selected) return;

    // call listeners for select event
    this.emit("select");

    // set wai aria attributes
    this._element.setAttribute("tabindex", 0);
    this._element.setAttribute("aria-selected", "true");

    // remove selected class and focus on the tab
    this._element.classList.add(TAB_SELECT_CLASS);
    this._element.focus();

    // show panel associated with this tab
    this.showPanel();

    this.selected = true;
  }

  /**
   * Close tab
   */
  close(){
    // set wai aria attributes
    this._element.setAttribute("tabindex", -1);
    this._element.setAttribute("aria-selected", "false");
    this._element.classList.remove(TAB_SELECT_CLASS);

    // show panel associated with this tab
    this.hidePanel();

    this.selected = false;
  }

  /**
   * Hiding panel associated with this tab
   */
  hidePanel(){
    this._panelElement.style.display = "none";
    this._panelElement.setAttribute("aria-hidden", "true");
  }

  /**
   * Showing panel associated with this tab
   */
  showPanel(){
    this._panelElement.style.display = "";
    this._panelElement.setAttribute("aria-hidden", "false");
  }

  /**
   * Render markup for tab
   * @param {String|Element} title - tab's title
   * @private
   */
  _render(title){
    // get type of title
    let type = helpFuncs.getType(title);

    // create wrapper for tab
    this._element = utils.createHTML(`<li class="${TAB_CLASS}"></li>`);
    this._element.addEventListener("click", this.select.bind(this));

    this._element.setAttribute("role", "tab");

    if(type === "string"){
      // try to find element on the page and append that
      // else just inner this string into an element
      try {
        let child = document.querySelector(title);
        this._element.appendChild(child);
      } catch(e){
        this._element.innerHTML = title;
      }
    } else {
      throw new Error(title + ". Your type - " + type + ". title must be a String or Element");
    }
  }

  /**
   * Render markup for tab's panel
   * @param {String|Element} content
   * @private
   */
  _renderPanel(content){
    // get type of title
    let type = helpFuncs.getType(content);

    // create wrapper for tab
    this._panelElement = utils.createHTML(`<div class="${PANEL_CLASS}"></div>`);
    this._panelElement.setAttribute("role", "tabpanel");

    if(type === "html"){
      this._panelElement.appendChild(content);

      return;
    }

    if(type === "string"){
      let child;

      try {
        // try to get element
        child = document.querySelector(content);
        this._panelElement.appendChild(child);
      } catch(e){
        // if string has a .html part - load html
        if(content.search(/\.html|http|https/g) > -1){
          fetch(content)
            .then(response => {
              return response.text();
            })
            .then(text => {
              this._panelElement.innerHTML = text;
            });
        } else {
          this._panelElement.innerHTML = content;
        }
      }
    }
  }
}

module.exports = Tab;
