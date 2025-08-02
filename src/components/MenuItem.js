export class MenuItem {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.$element = this.createElement();
  }

  createElement() {
    const li = document.createElement('li');
    li.className = 'menu-item';
    li.textContent = this.title;
    li.dataset.id = this.id;
    return li;
  }

  getElement() {
    return this.$element;
  }

  select() {
    this.$element.classList.add('selected');
  }

  deselect() {
    this.$element.classList.remove('selected');
  }
}
