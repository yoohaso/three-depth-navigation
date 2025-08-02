import '../src/style.css';

async function fetchNavigation() {
  const response = await fetch('https://menu-mock-api.vercel.app/api/menu');
  const data = await response.json();
  return data.data;
}

function flattenNavigation(navigationData) {
  const flattened = {};

  function processItem(item, depth = 0) {
    const childrenIds = item.children ? item.children.map(child => child.id) : [];

    flattened[item.id] = {
      id: item.id,
      title: item.title,
      children: childrenIds,
      depth,
    };

    if (item.children && item.children.length > 0) {
      item.children.forEach(item => processItem(item, depth + 1));
    }
  }

  navigationData.forEach(item => processItem(item));
  return flattened;
}

function createElement({ id, title, isSelected }) {
  const categoryEle = document.createElement('p');
  categoryEle.setAttribute('data-id', id);
  categoryEle.innerText = title;

  if (isSelected) {
    categoryEle.classList.add('selected');
  }

  return categoryEle;
}

function renderBoard(board, items, selectedItemId) {
  if (!items) {
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const element = createElement({
      id: item.id,
      title: item.title,
      isSelected: item.id === selectedItemId,
    });

    fragment.appendChild(element);
  });

  board.replaceChildren(fragment);
}

function getItemsByDepth(items, depth) {
  return Object.entries(items)
    .filter(([_, item]) => item.depth === depth)
    .map(([_, item]) => item);
}

const firstBoard = document.querySelector('.first');
const secondBoard = document.querySelector('.second');
const thirdsBoard = document.querySelector('.thirds');

function renderAllBoards(selectedPath, flattenedNavigation) {
  const depth0Items = getItemsByDepth(flattenedNavigation, 0);
  const depth1Items = selectedPath[0]
    ? flattenedNavigation[selectedPath[0]].children.map(id => flattenedNavigation[id])
    : [];
  const depth2Items = selectedPath[1]
    ? flattenedNavigation[selectedPath[1]].children.map(id => flattenedNavigation[id])
    : [];

  renderBoard(firstBoard, depth0Items, selectedPath[0]);
  renderBoard(secondBoard, depth1Items, selectedPath[1]);
  renderBoard(thirdsBoard, depth2Items);
}

function createMenuState(flattenedNavigation) {
  const selectedPath = [null, null, null];

  return {
    setSelectedItem(itemId, depth) {
      if (selectedPath[depth] === itemId) {
        return;
      }

      for (let i = depth + 1; i < selectedPath.length; i++) {
        selectedPath[i] = null;
      }

      selectedPath[depth] = itemId;

      this.updateUI();
    },
    updateUI() {
      renderAllBoards(selectedPath, flattenedNavigation);
    },
  };
}

const data = await fetchNavigation();
const flattenedNavigation = flattenNavigation(data);
const menuState = createMenuState(flattenedNavigation);
const navbar = document.querySelector('nav');
const menu = document.querySelector('#menu');

let isMenuInitialized = false;

navbar.addEventListener('click', () => {
  menu.style.display = 'flex';
  menuState.updateUI();

  if (isMenuInitialized) {
    return;
  }

  isMenuInitialized = true;

  menu.addEventListener('mouseover', e => {
    const board = e.target.closest('.first, .second, .thirds');
    let depth;

    if (board.classList.contains('first')) {
      depth = 0;
    }

    if (board.classList.contains('second')) {
      depth = 1;
    }

    const targetId = e.target.dataset.id;

    if (!targetId) {
      return;
    }

    menuState.setSelectedItem(targetId, depth);
  });
});
