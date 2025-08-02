import { Navigation } from './Navigation';

export class NavigationBar {
  constructor(navigationData, event, onOpenMenu) {
    this.navigationData = navigationData;
    this.event = event;
    this.onOpenMenu = onOpenMenu;
    this.childInstances = [];
    this.$element = this.createElement();
    this.setEvent();

    if (navigationData) {
      this.createChildren();
      this.renderChildren();
    }
  }

  createElement() {
    const $element = document.createElement('div');
    $element.id = 'nav-root';
    return $element;
  }

  getElement() {
    return this.$element;
  }

  setEvent() {
    this.$element.addEventListener(this.event, event => {
      const id = event.target.dataset.id;
      this.onOpenMenu(id);
    });
  }

  createChildren() {
    this.navigationData.forEach(nav => {
      const navInstance = new Navigation(nav.id, nav.title);
      this.childInstances.push(navInstance);
    });
  }

  renderChildren() {
    this.childInstances.forEach(instance => {
      this.$element.appendChild(instance.getElement());
    });
  }
}
