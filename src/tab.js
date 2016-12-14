import EventEmitter from 'events';
import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';
import Panel from './panel';

const TAB_NAVIGATOR_CLASS = 'cg-tabs';
const TAB_CLASS = `${TAB_NAVIGATOR_CLASS}__tab`;
const TAB_SELECT_CLASS = `${TAB_CLASS}--select`;

class Tab extends EventEmitter {
  constructor(title, content){
    super();

    this._render(title);
    this.panel = new Panel(content);
  }

  select(){
    if(this.selected) return;

    // call listeners for select event
    this.emit("select");

    this._element.setAttribute("tabindex", 0);
    this._element.setAttribute("aria-selected", "true");
    this._element.classList.add(TAB_SELECT_CLASS);
    this._element.focus();

    this.panel.show();

    this.selected = true;
  }

  close(){
    this._element.setAttribute("tabindex", -1);
    this._element.setAttribute("aria-selected", "false");
    this._element.classList.remove(TAB_SELECT_CLASS);
    this.panel.hide();

    this.selected = false;
  }

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
}

module.exports = Tab;
