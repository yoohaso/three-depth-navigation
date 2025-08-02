import { MenuList } from './MenuList';

export class Menu {
  constructor() {
    this.$element = this.createElement();
    this.$children = new Map();
    this.setEvent();
  }

  createElement() {
    const $element = document.createElement('div');
    $element.id = 'menu-root';
    return $element;
  }

  setEvent() {
    this.$element.addEventListener('mouseleave', () => {
      this.removeChildren();
      this.renderChildren();
    });
  }

  getElement() {
    return this.$element;
  }

  createChildren(data, depth) {
    const $menuList = new MenuList(data, depth, this.openSubmenu.bind(this), 'mouseover').getElement();

    if (depth < this.$children.size) {
      for (let i = depth + 1; i <= this.$children.size; i++) {
        this.$children.delete(i);
      }
    }
    this.$children.set(depth, $menuList);
  }

  renderChildren() {
    this.$element.innerHTML = '';
    this.$children.forEach($child => this.$element.appendChild($child));
  }

  removeChildren() {
    this.$children = new Map();
    this.$element.querySelectorAll('.board').forEach($ele => $ele.remove());
  }

  openMenu(data) {
    this.createChildren(data, 1);
    this.renderChildren();
  }

  openSubmenu(data, depth) {
    if (!data) {
      return;
    }

    this.createChildren(data, depth);
    this.renderChildren();
  }
}
