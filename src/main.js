import '../src/style.css';

import { Menu } from './components/Menu';
import { NavigationBar } from './components/NavigationBar';

const navigationData = [
  { id: '1', title: 'A' },
  { id: '2', title: 'B' },
];

class App {
  constructor(data) {
    this.$app = document.getElementById('app');
    this.menu = new Menu();
    this.$navRoot = new NavigationBar(navigationData, 'mouseover', id => this.menu.openMenu(data)).getElement();
    this.$menuRoot = this.menu.getElement();
  }

  render() {
    this.$app.appendChild(this.$navRoot);
    this.$app.appendChild(this.$menuRoot);
  }
}

async function init() {
  async function fetchNavigation() {
    const response = await fetch('https://menu-mock-api.vercel.app/api/menu');
    const data = await response.json();
    return data.data;
  }

  const data = await fetchNavigation();
  new App(data).render();
}

init();
