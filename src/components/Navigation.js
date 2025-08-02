export class Navigation {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.$element = this.createElement();
  }

  createElement() {
    const $element = document.createElement('nav');
    $element.dataset.id = this.id;
    $element.textContent = this.title;
    return $element;
  }

  getElement() {
    return this.$element;
  }
}
