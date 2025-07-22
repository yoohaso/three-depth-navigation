import './style.css';

async function fetchNavigation() {
  const response = await fetch('/api/navigations', { headers: { 'Content-type': 'application/json' } });
  const data = await response.json();
  return data;
}

function flattenNavigation(navigationData) {
  const flatten = {};

  function processItem(item, depth = 0) {
    const childrenIds = item.children ? item.children.map(child => child.id) : [];

    flatten[item.id] = {
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
  return flatten;
}

function createElement({ id, title }) {
  const categoryEle = document.createElement('p');
  categoryEle.setAttribute('data-id', id);
  categoryEle.innerText = title;
  return categoryEle;
}

function resetSelectedState(parent) {
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].classList.contains('selected')) {
      parent.children[i].classList.remove('selected');
    }
  }
}

worker.start().then(async () => {
  const navbar = document.querySelector('nav');

  navbar.addEventListener('click', () => {
    const menu = document.querySelector('#menu');
    menu.style.display = 'flex';
  });

  const { navigation } = await fetchNavigation();
  const flattenedNavigation = flattenNavigation(navigation);

  const firstBoard = document.querySelector('.first');
  const secondBoard = document.querySelector('.second');
  const thirdsBoard = document.querySelector('.thirds');

  const depth1 = Object.entries(flattenedNavigation).filter(([_, item]) => item.depth === 0);

  depth1.forEach(([_, item]) => {
    const element = createElement({
      id: item.id,
      title: item.title,
    });

    firstBoard.append(element);
  });

  firstBoard.addEventListener('mouseover', e => {
    if (e.currentTarget === e.target) {
      return;
    }

    const { id: targetId } = e.target.dataset;

    resetSelectedState(firstBoard);
    e.target.classList.add('selected');

    const childrenIds = flattenedNavigation[targetId].children;
    const children = childrenIds.map(id => flattenedNavigation[id]);

    if (secondBoard.childNodes.length > 0) {
      secondBoard.innerHTML = '';
    }

    children.forEach(item => {
      const element = createElement({
        id: item.id,
        title: item.title,
      });

      secondBoard.append(element);
    });
  });

  secondBoard.addEventListener('mouseover', e => {
    const { id: targetId } = e.target.dataset;

    if (!targetId) {
      return;
    }

    resetSelectedState(secondBoard);
    e.target.classList.add('selected');

    const childrenIds = flattenedNavigation[targetId].children;
    const children = childrenIds.map(id => flattenedNavigation[id]);

    if (thirdsBoard.childNodes.length > 0) {
      thirdsBoard.innerHTML = '';
    }

    children.forEach(item => {
      const element = createElement({
        id: item.id,
        title: item.title,
      });

      thirdsBoard.append(element);
    });
  });
});
