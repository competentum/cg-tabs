import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';

class Scroll {
  /**
   * Added pseudo-scroll functionality
   * @param {Element} element
   */
  constructor(element){
    this._referenceElement = element;
    this._scrollableElement = element.children[0];
    this._parentElement = element.parentNode;

    this.controls = {};
    this.step = 150;

    this._render();
    this.update();
  }

  /**
   * Maximum value of the scroll
   * @returns {*|number}
   */
  get max(){
    let containerWidth = helpFuncs.getClientRect(this._referenceElement, 'width');
    let elementWidth = helpFuncs.getClientRect(this._scrollableElement, 'width');

    return Math.ceil(elementWidth - containerWidth);
  }

  /**
   * Minimum value of the scroll
   * @returns {number}
   */
  get min(){
    return 0;
  }

  /**
   * Setter value for scrolling element
   * @param {number} value
   */
  set value(value){
    value = Math.max(value, this.min);
    value = Math.min(value, this.max);

    this._referenceElement.scrollLeft = value;

    this.update();
  }

  /**
   * Getter value for scrolling element
   * @returns {number}
   */
  get value(){
    return this._referenceElement.scrollLeft;
  }

  /**
   * Setter for Scroll step
   * @param value
   */
  set step(value){
    this._step = value;
  }

  /**
   * Getter for Scroll step
   * @returns {*}
   */
  get step(){
    return this._step;
  }

  update(){
    let leftDisplay = (this.value === this.min) ? 'none' : '';
    let rightDisplay = (this.value === this.max) ? 'none' : '';

    this.controls.right.style.display = rightDisplay;
    this.controls.left.style.display = leftDisplay;
  }

  /**
   * Update current scroll value
   * @param {number} [value]
   */
  move(value){
    value = value || this.step;
    value = this.value + value;

    this.value = value;
  }

  /**
   * Render html markup
   * @returns {{}|*}
   * @private
   */
  _render(){
    utils.addClass(this._parentElement, 'scrollable');

    let leftArrow = utils.createHTML('<div><span></span></div>');
    let rightArrow = utils.createHTML('<div><span></span></div>');

    leftArrow.className = 'arrow left';
    rightArrow.className = 'arrow right';

    this.controls.left = leftArrow;
    this.controls.right = rightArrow;

    this._parentElement.appendChild(leftArrow);
    this._parentElement.appendChild(rightArrow);

    leftArrow.addEventListener('click', () => {this.move(-this.step);});
    rightArrow.addEventListener('click', () => {this.move(this.step);});

    return this.controls;
  }
}

module.exports = Scroll;