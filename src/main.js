import './style.css';
import { worker } from './mock/browser';

worker.start().then(async () => {
  async function fetchNavigation() {
    const response = await fetch('/api/navigations', { headers: { 'Content-type': 'application/json' } });
    const data = await response.json();
    return data;
  }

  const { navigation } = await fetchNavigation();

  const firstBoard = document.querySelector('.first');
  const secondBoard = document.querySelector('.second');
  const thirdsBoard = document.querySelector('.thirds');

  function createElement({ id, text }) {
    const categoryEle = document.createElement('p');
    categoryEle.setAttribute('id', id);
    categoryEle.innerText = text;
    return categoryEle;
  }

  navigation.forEach(category => {
    const children = navigation.find(ele => ele.id === category.id).groups;

    const element = createElement({
      currentParent: firstBoard,
      nextParent: secondBoard,
      id: category.id,
      text: category.category,
      children,
    });

    element.addEventListener('click', e => {
      const { id: targetId } = e.target;

      for (let i = 0; i < firstBoard.children.length; i++) {
        if (firstBoard.children[i].classList.contains('selected')) {
          firstBoard.children[i].classList.remove('selected');
        }
      }
      element.classList.add('selected');

      if (secondBoard.firstElementChild && secondBoard.firstElementChild.id === targetId) {
        return;
      }

      if (secondBoard.childNodes.length > 0) {
        secondBoard.innerHTML = '';
      }

      const children = navigation.find(ele => ele.id === targetId).groups;
      children.forEach(group => {
        const element = createElement({ id: group.id, text: group.group });

        element.addEventListener('click', e => {
          const { id: targetId } = e.target;

          for (let i = 0; i < secondBoard.children.length; i++) {
            if (secondBoard.children[i].classList.contains('selected')) {
              secondBoard.children[i].classList.remove('selected');
            }
          }

          element.classList.add('selected');

          if (thirdsBoard.firstElementChild && thirdsBoard.firstElementChild.id === targetId) {
            return;
          }

          if (thirdsBoard.childNodes.length > 0) {
            thirdsBoard.innerHTML = '';
          }

          group.services.forEach(ele => {
            const element = createElement({ id: ele, text: ele });
            thirdsBoard.append(element);
          });
        });

        secondBoard.appendChild(element);
      });

      thirdsBoard.innerHTML = '';
    });

    firstBoard.append(element);
  });
});

/**
 * 1. first를 잡는다.
 * 2. span 태그를 가진 요소를 만든다.
 * 3. 만든 span태그 안에 innerText를 추가한다.
 * 4. 만든 요소를 first태그에 추가한다.
 */

/**
 * categoryEle를 클릭하면,
 * 클릭한 category id를 가지고 MOCK_DATA에서 카테고리를 찾아서 groups를 second board에 보여주자.
 */
