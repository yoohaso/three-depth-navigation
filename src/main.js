import './style.css';

const MOCK_DATA = [
  {
    id: 'compute',
    category: 'Compute',
    groups: [
      {
        id: 'virtualization',
        group: 'EC2 & Virtualization',
        services: ['Amazon EC2', 'Amazon Lightsail', 'VMware Cloud on AWS'],
      },
      {
        id: 'container',
        group: 'Container Services',
        services: ['Amazon ECS', 'Amazon EKS', 'AWS Fargate'],
      },
    ],
  },
  {
    id: 'storage',
    category: 'Storage',
    groups: [
      {
        id: 'block storage',
        group: 'Object & Block Storage',
        services: ['Amazon S3', 'Amazon EBS', 'Amazon EFS'],
      },
      {
        id: 'archive',
        group: 'Backup & Archive',
        services: ['AWS Backup', 'Amazon S3 Glacier', 'AWS Storage Gateway'],
      },
    ],
  },
  {
    id: 'maching learning',
    category: 'Machine Learning',
    groups: [
      {
        id: 'ml services',
        group: 'ML Services',
        services: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition'],
      },
      {
        id: 'ai services',
        group: 'AI Services',
        services: ['Amazon Translate', 'Amazon Polly', 'Amazon Lex'],
      },
    ],
  },
];

/**
 * 1. first를 잡는다.
 * 2. span 태그를 가진 요소를 만든다.
 * 3. 만든 span태그 안에 innerText를 추가한다.
 * 4. 만든 요소를 first태그에 추가한다.
 */

const firstBoard = document.querySelector('.first');
const secondBoard = document.querySelector('.second');
const thirdsBoard = document.querySelector('.thirds');

function createElement({ id, text }) {
  const categoryEle = document.createElement('p');
  categoryEle.setAttribute('id', id);
  categoryEle.innerText = text;
  return categoryEle;
}

MOCK_DATA.forEach(category => {
  const children = MOCK_DATA.find(ele => ele.id === category.id).groups;

  const element = createElement({
    currentParent: firstBoard,
    nextParent: secondBoard,
    id: category.id,
    text: category.category,
    children,
  });

  element.addEventListener('click', e => {
    const { id } = e.target;

    if (secondBoard.firstElementChild && secondBoard.firstElementChild.id === id) {
      return;
    }

    if (secondBoard.childNodes.length > 0) {
      secondBoard.innerHTML = '';
    }

    const div = document.createElement('div');
    div.setAttribute('id', id);

    const children = MOCK_DATA.find(ele => ele.id === id).groups;
    children.forEach(group => {
      const element = createElement({ id: group.id, text: group.group });

      element.addEventListener('click', e => {
        const { id } = e.target;

        if (thirdsBoard.firstElementChild && thirdsBoard.firstElementChild.id === id) {
          return;
        }

        if (thirdsBoard.childNodes.length > 0) {
          thirdsBoard.innerHTML = '';
        }

        const div = document.createElement('div');
        div.setAttribute('id', id);

        group.services.forEach(ele => {
          const element = createElement({ id: ele, text: ele });
          div.appendChild(element);
        });

        thirdsBoard.append(div);
      });
      div.appendChild(element);
    });

    secondBoard.appendChild(div);
    thirdsBoard.innerHTML = '';
  });

  firstBoard.append(element);
});

/**
 * categoryEle를 클릭하면,
 * 클릭한 category id를 가지고 MOCK_DATA에서 카테고리를 찾아서 groups를 second board에 보여주자.
 */
