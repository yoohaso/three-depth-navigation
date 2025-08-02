import { MenuItem } from './MenuItem';

export class MenuList {
  constructor(items, depth, onOpenSubmenu, event) {
    this.items = items;
    this.depth = depth;
    this.onOpenSubmenu = onOpenSubmenu;
    this.event = event;
    this.menuItemsInstances = [];
    this.$element = this.createElement();
    this.setEvent();

    if (items) {
      this.createChildren();
      this.renderChildren();
    }
  }

  createElement() {
    const $element = document.createElement('ul');
    $element.className = 'board';
    $element.dataset.depth = this.depth;
    return $element;
  }

  createChildren() {
    this.items.forEach(item => {
      const itemInstance = new MenuItem(item.title, item.id);
      this.menuItemsInstances.push(itemInstance);
    });
  }

  renderChildren() {
    this.menuItemsInstances.forEach(instance => {
      this.$element.appendChild(instance.getElement());
    });
  }

  setEvent() {
    this.$element.addEventListener(this.event, event => {
      if (!event.target.closest('li')) {
        return;
      }

      const menuItem = this.menuItemsInstances.find(instance => instance.id === event.target.dataset.id);

      if (!menuItem) {
        return;
      }

      // TODO: 개선될 수 있는 부분
      this.menuItemsInstances.forEach(instance => {
        if (instance.id !== event.target.dataset.id) {
          instance.deselect();
        }
      });

      menuItem.select();

      const data = this.items.find(item => item.id === menuItem.id);

      if (!data.children) {
        return;
      }

      this.onOpenSubmenu(data.children, this.depth + 1);
    });
  }

  getElement() {
    return this.$element;
  }
}
