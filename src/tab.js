import EventEmitter from 'events';
import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';
import Panel from './panel';

const SELECT_CLASS = 'select';
const TAB_NAVIGATOR_CLASS = 'cg-tab-navigation';
const TAB_CLASS = `${TAB_NAVIGATOR_CLASS}-tab`;

class Tab extends EventEmitter {
  constructor(title, content){
    super();

    this._render(title);
    this.panel = new Panel(content);
  }

  get isSelected(){
    return this._element.classList.contains(SELECT_CLASS);
  }

  select(){
    if(this.isSelected) return;

    this._element.classList.add(SELECT_CLASS);
    this.panel.show();
    this.emit("select");
  }

  close(){
    this._element.classList.remove(SELECT_CLASS);
    this.panel.hide();
  }

  _render(title){
    // get type of title
    let type = helpFuncs.getType(title);

    // create wrapper for tab
    this._element = utils.createHTML(`<li class="${TAB_CLASS}"></li>`);
    this._element.addEventListener("click", this.select.bind(this));

    if(type === "html"){
      this._element.appendChild(title);

      return;
    }

    if(type === "string"){
      let child;

      try {
        child = document.querySelector(title);
        this._element.appendChild(child);
      } catch(e){
        this._element.innerHTML = title;
      }
    }
  }
}

module.exports = Tab;
