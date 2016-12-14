import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';

const TAB_NAVIGATOR_CLASS = 'cg-tabs';
const PANEL_CLASS = `${TAB_NAVIGATOR_CLASS}__panel`;

class Panel {
  constructor(content){
    this._render(content);
  }

  hide(){
    this._element.style.display = "none";
    this._element.setAttribute("aria-hidden", "true");
  }

  show(){
    this._element.style.display = "";
    this._element.setAttribute("aria-hidden", "false");
  }

  _render(content){
    // get type of title
    let type = helpFuncs.getType(content);

    // create wrapper for tab
    this._element = utils.createHTML(`<div class="${PANEL_CLASS}"></div>`);
    this._element.setAttribute("role", "tabpanel");

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
        if(content.search(/\.html|http|https/g) > -1){
          console.log(content.search(/\.html|http|https/g))
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