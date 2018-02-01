import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';

class Scroll {
  /**
   * Added pseudo-scroll functionality
   * @param {Element} element
   */
  constructor(element){
    this._element = element;
    this._content = element.children[0];
    this._parentElement = element.parentNode;

    this.controls = {};

    this._render();
    this._init();
    this._updateControls();
    this.enable();
  }

  /**
   * Maximum value of the scroll
   * @returns {*|number}
   */
  get max(){
    let containerWidth =  this.elementSize.width;
    let elementWidth = this.contentSize.width;

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

    this._element.scrollLeft = value;

    this._updateControls();
  }

  /**
   * Getter value for scrolling element
   * @returns {number}
   */
  get value(){
    return this._element.scrollLeft;
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

  get elementSize(){
    return helpFuncs.getClientRect(this._element);
  }

  get contentSize(){
    return helpFuncs.getClientRect(this._content);
  }

  /**
   * Disabled flag
   * @param disable
   */
  set disabled(disable){
    this._disabled = disable;
  }

  get disabled(){
    return this._disabled;
  }

  /**
   * show or hide arrows
   */
  _updateControls(){
    this.controls.right.style.display = (this.value === this.max) ? 'none' : '';
    this.controls.left.style.display = (this.value === this.min) ? 'none' : '';
  }

  /**
   * Update current scroll value
   * @param {number} [value]
   */
  move(value){
    this.value += (value || this.step);
  }

  /**
   * synchronize element scroll value and model value
   */
  update(){
    // synchronize element scroll value and model value
    this.value = this._element.scrollLeft;
  }

  /**
   *
   */
  enable(){
    if(this.disabled){
      utils.addClass(this._parentElement, 'scrollable');

      this._updateControls();
    }
  }

  /**
   * disable scroll functionality
   */
  disable(){
    if(this.disabled) return;

    utils.removeClass(this._parentElement, 'scrollable');

    // hide arrows
    this.controls.right.style.display = 'none';
    this.controls.left.style.display = 'none';
  }

  /**
   * set initial app state
   * @private
   */
  _init(){
    this.step = this.elementSize.width / 2;
    this.disabled = false;

    this._element.addEventListener('scroll', this.update.bind(this));
  }

  /**
   * Render html mockup
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