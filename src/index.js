// eslint-disable-next-line no-unused-vars
import List from './lib/list';

// Hjálparfall til að útbúa element
function el(type, className) {
  const element = document.createElement(type);

  if (className !== null) {
    element.classList.add(className);
  }

  return element;
}

function getLectures(name) {
  const request = new XMLHttpRequest();
  const baseURL = window.location.host;
  request.open('GET', `http://${baseURL}/lectures.json`, true);

  request.onload = function requestLoad() {
    if (request.status >= 200 && request.status < 400) {
      const response = JSON.parse(request.responseText);
      let lecture;

      // Select lecture
      response.lectures.forEach((element) => {
        if (element.slug === name) {
          lecture = element;
        }
      });

      // Element fyrir Category & Title
      const category = lecture.category;
      const title = lecture.title;
      const catelement = el('h2', 'category');
      const titleelement = el('h1', 'title');
      const headerElement = el('div', 'headerElement');
      catelement.innerText = category;
      titleelement.innerText = title;
      headerElement.appendChild(catelement);
      headerElement.appendChild(titleelement);
      document.querySelector('header').appendChild(headerElement);

      // Element fyrir header Image
      const imageURL = lecture.image;
      if (imageURL !== undefined) {
        const imgelement = el('img', 'headerImage');
        imgelement.setAttribute('src', `http://${baseURL}/${imageURL}`);
        headerElement.appendChild(imgelement);
      }

      const container = el('div', 'container');
      // Element fyrir Content
      const content = lecture.content;
      content.forEach((item) => {
        const type = item.type;
        const data = item.data;
        const contentItem = el('div', `contentItem__${type}`);
        let itemData;
        if (type === 'image') {
          itemData = el('img', 'frontImage');
          itemData.setAttribute('src', `http://${baseURL}/${data}`);
          const captionText = item.caption;
          const caption = el('figcaption', 'caption');
          caption.innerText = captionText;
          contentItem.appendChild(itemData);
          contentItem.appendChild(caption);
        } else if (type === 'code') {
          const preEle = el('pre', 'codePre');
          const codeEle = el('code', 'codeCode');
          codeEle.innerText = data;
          preEle.appendChild(codeEle);
          contentItem.appendChild(preEle);
        } else if (type === 'heading') {
          itemData = el('h2', 'contentHeading');
          itemData.innerText = data;
          contentItem.appendChild(itemData);
        } else if (type === 'quote') {
          const quoteEle = el('blockquote', 'blockQuote');
          const pEle = el('p', 'pQuote');
          pEle.innerText = data;
          quoteEle.appendChild(pEle);
          contentItem.appendChild(quoteEle);
        } else if (type === 'list') {
          const ulEle = el('ul', 'ulList');
          data.forEach((listItem) => {
            const liEle = el('li', 'liList');
            liEle.innerText = listItem;
            ulEle.appendChild(liEle);
          });
          contentItem.appendChild(ulEle);
        } else if (type === 'youtube') {
          itemData = el('iframe', 'contentYoutube');
          itemData.setAttribute('src', data);
          contentItem.appendChild(itemData);
        } else {
          itemData = el('p', 'contentData');
          itemData.innerText = data;
          contentItem.appendChild(itemData);
        }
        container.appendChild(contentItem);
      });
      document.querySelector('main').appendChild(container);
    }
  };

  request.send();
}

function getFrontpage() {
  const request = new XMLHttpRequest();
  const baseURL = window.location.host;
  request.open('GET', `http://${baseURL}/lectures.json`, true);

  request.onload = function requestLoad() {
    if (request.status >= 200 && request.status < 400) {
      const container = el('div', 'frontContainer');
      const response = JSON.parse(request.responseText);

      response.lectures.forEach((lecture) => {
        const lectureItem = el('a', 'lectureItem');
        lectureItem.setAttribute('href', `http://${baseURL}/fyrirlestur.html?slug=${lecture.slug}`);

        // Element fyrir Thumbnail
        const thumbnail = lecture.thumbnail;
        if (thumbnail !== undefined) {
          const thumbelement = el('img', 'thumbnail');
          thumbelement.setAttribute('src', `http://${baseURL}/${thumbnail}`);
          lectureItem.appendChild(thumbelement);
        }

        // Element fyrir Category & Title
        const category = lecture.category;
        const title = lecture.title;
        const catelement = el('h3', 'category');
        const titleelement = el('h2', 'title');
        const titleCategory = el('div', 'titleCategory');
        catelement.innerText = category;
        titleelement.innerText = title;
        titleCategory.appendChild(catelement);
        titleCategory.appendChild(titleelement);
        lectureItem.classList.add(category);
        lectureItem.appendChild(titleCategory);

        container.appendChild(lectureItem);
      });

      document.querySelector('main').appendChild(container);
    }
  };

  request.send();
}


/* Fykta við að gera filter....
function filterSelection(c) {
  const x = document.getElementsById('buttonContainer');
  let i;
  if (c === 'all') {
    c = '';
  }
  // Bæta við og fjarlægja "Show" class
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], 'show');
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], 'show');
  }
}

// Sýna filtered element
function w3AddClass(element, name) {
  let i; let arr1; let
    arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += ` ${arr2[i]}`;
    }
  }
}

// Fela element sem eru ekki valin
function w3RemoveClass(element, name) {
  let i; let arr1; let
    arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(' ');
}

// Add active class to the current control button (highlight it)
const btnContainer = document.getElementById('buttonContainer');
const btns = btnContainer.getElementsByClassName('button');
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    const current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
}
*/

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  const paramsString = window.location.search;

  if (isLecturePage) {
    // Event listener fyrir button
    const finishButton = document.querySelector('.button__finish');

    finishButton.addEventListener('click', () => {
      const finishText = document.querySelector('#finishText');
      if (finishText.innerHTML === '✓ Fyrirlestur kláraður') {
        document.getElementById('finishText').innerHTML = 'Klára fyrirlestur!';
      } else {
        document.getElementById('finishText').innerHTML = '✓ Fyrirlestur kláraður';
      }
    });

    if (paramsString === '') return;
    const searchParams = new URLSearchParams(paramsString);
    getLectures(searchParams.get('slug'));
  } else {
    getFrontpage();

    // Event listener fyrir Button
    const buttonHTML = document.querySelector('.btnHTML');

    buttonHTML.addEventListener('click', () => {

    });
    /* filterSelection('all'); */
    /* const list = new List();
    list.load(); */
  }
});
