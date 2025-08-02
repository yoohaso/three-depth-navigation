import '../src/style.css';

/**
 * 디자인 패턴 중 상태 패턴의 사용이 적절해 보이긴 함..
 * 어떠한 이벤트의 발생으로 UI의 변화가 발생하니까..?
 *  mouseover
 * clickMenu
 */

worker.start().then(async () => {
  const navbar = document.querySelector('nav');

  navbar.addEventListener('click', () => {
    const menu = document.querySelector('#menu');
    menu.style.display = 'flex';
  }); // classname을 추가하는 방식으로는 왜 동작하지않을까..

  async function fetchNavigation() {
    const response = await fetch('/api/navigations', { headers: { 'Content-type': 'application/json' } });
    const data = await response.json();
    return data;
  }

  const { navigation } = await fetchNavigation();

  const firstBoard = document.querySelector('.first');
  const secondBoard = document.querySelector('.second');
  const thirdsBoard = document.querySelector('.thirds');

  function createElement({ id, title }) {
    const categoryEle = document.createElement('p');
    categoryEle.setAttribute('id', id);
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

  navigation.forEach(category => {
    const element = createElement({
      id: category.id,
      title: category.title,
      children: category.children,
    });

    element.addEventListener('mouseover', e => {
      const { id: targetId } = e.target;

      resetSelectedState(firstBoard);
      element.classList.add('selected');

      if (secondBoard.firstElementChild && secondBoard.firstElementChild.id === targetId) {
        return;
      }

      if (secondBoard.childNodes.length > 0) {
        secondBoard.innerHTML = '';
      }

      const targetChildren = navigation.find(ele => ele.id === targetId).children;
      targetChildren.forEach(subCategory => {
        const element = createElement({ id: subCategory.id, title: subCategory.title });

        element.addEventListener('mouseover', e => {
          const { id: targetId } = e.target;

          resetSelectedState(secondBoard);
          element.classList.add('selected');

          if (thirdsBoard.firstElementChild && thirdsBoard.firstElementChild.id === targetId) {
            return;
          }

          if (thirdsBoard.childNodes.length > 0) {
            thirdsBoard.innerHTML = '';
          }

          subCategory.children.forEach(ele => {
            const element = createElement(ele);
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
