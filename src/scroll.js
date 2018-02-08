import utils from 'cg-component-utils';
import helpFuncs from './help-funcs';

/**
 * If tabs don't fit in tab-panel, add arrow buttons to move tab-panel
 */
class Scroll {
  /**
   * Added pseudo-scroll functionality
   * @param {Element} element
   */
  constructor(element) {
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
   * @returns {number} maximum
   */
  get max() {
    const containerWidth = this.elementSize.width;
    const elementWidth = this.contentSize.width;

    return Math.ceil(elementWidth - containerWidth);
  }

  /**
   * Minimum value of the scroll
   * @returns {number} minimum
   */
  get min() {
    return 0;
  }

  /**
   * Setter value for scrolling element
   * @param {number} value
   */
  set value(value) {
    let scroll = Math.max(value, this.min);

    scroll = Math.min(scroll, this.max);

    this._element.scrollLeft = scroll;

    this._updateControls();
  }

  /**
   * Getter value for scrolling element
   * @returns {number} scroll position
   */
  get value() {
    return this._element.scrollLeft;
  }

  /**
   * Set scroll step
   * @param {Number} value
   */
  set step(value) {
    this._step = value;
  }

  /**
   * @returns {Number} scroll step
   */
  get step() {
    return this._step;
  }

  get elementSize() {
    return helpFuncs.getClientRect(this._element);
  }

  get contentSize() {
    return helpFuncs.getClientRect(this._content);
  }

  /**
   * @param {Boolean} disable
   */
  set disabled(disable) {
    this._disabled = disable;
  }

  /**
   * @return {Boolean} disabled
   */
  get disabled() {
    return this._disabled;
  }

  /**
   * Show or hide arrows
   */
  _updateControls() {
    this.controls.right.style.display = (this.value === this.max) ? 'none' : '';
    this.controls.left.style.display = (this.value === this.min) ? 'none' : '';
  }

  /**
   * Update current scroll value
   * @param {number} [value]
   */
  move(value) {
    this.value += (value || this.step);
  }

  /**
   * Synchronize element scroll value and model value
   */
  update() {
    // Synchronize element scroll value and model value
    this.value = this._element.scrollLeft;
  }

  /**
   *
   */
  enable() {
    if (this.disabled) {
      utils.addClass(this._parentElement, 'scrollable');

      this._updateControls();
    }
  }

  /**
   * Disable scroll functionality
   */
  disable() {
    if (this.disabled) {
      return;
    }

    utils.removeClass(this._parentElement, 'scrollable');

    // Hide arrows
    this.controls.right.style.display = 'none';
    this.controls.left.style.display = 'none';
  }

  /**
   * Set initial app state
   * @private
   */
  _init() {
    this.step = this.elementSize.width / 2;
    this.disabled = false;

    this._element.addEventListener('scroll', this.update.bind(this));
  }

  /**
   * Render html mockup
   * @returns {{}|*} controls
   * @private
   */
  _render() {
    utils.addClass(this._parentElement, 'scrollable');

    const leftArrow = utils.createHTML('<div><span></span></div>');
    const rightArrow = utils.createHTML('<div><span></span></div>');

    leftArrow.className = 'arrow left';
    rightArrow.className = 'arrow right';

    this.controls.left = leftArrow;
    this.controls.right = rightArrow;

    this._parentElement.appendChild(leftArrow);
    this._parentElement.appendChild(rightArrow);

    leftArrow.addEventListener('click', () => {
      this.move(-this.step);
    });
    rightArrow.addEventListener('click', () => {
      this.move(this.step);
    });

    return this.controls;
  }
}

module.exports = Scroll;
