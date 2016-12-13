import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';

const TAB_NAVIGATOR_CLASS = 'cg-tab-navigation';
const PANEL_CLASS = `${TAB_NAVIGATOR_CLASS}-panel`;

class Panel {
  constructor(content){
    this._render(content);
  }

  hide(){
    this._element.style.display = "none";
  }

  show(){
    this._element.style.display = "";
  }

  _render(content){
    // get type of title
    let type = helpFuncs.getType(content);

    // create wrapper for tab
    this._element = utils.createHTML(`<div class="${PANEL_CLASS}"></div>`);

    if(type === "html"){
      this._element.appendChild(content);

      return;
    }

    if(type === "string"){
      let child;

      try {
        // try to get element
        child = document.querySelector(content);
        this._element.appendChild(child);
      } catch(e){
        // if string has a .html part - load html
        if(content.search(/\.html/g) > -1){
          fetch(content)
            .then(response => {
              return response.text();
            })
            .then(text => {
              this._element.innerHTML = text;
            });
        } else {
          this._element.innerHTML = content;
        }
      }
    }
  }
}

module.exports = Panel;