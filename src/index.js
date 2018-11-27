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

      // Create elements for all content
      // Element fyrir header Image
      const imageURL = lecture.image;
      if (imageURL !== undefined) {
        const imgelement = el('img', 'headerImage');
        imgelement.setAttribute('src', `http://${baseURL}/${imageURL}`);
        document.body.appendChild(imgelement);
      }

      // Element fyrir Category
      const category = lecture.category;
      const catelement = el('p', 'category');
      catelement.innerText = category;
      document.body.appendChild(catelement);

      // Element fyrir Title
      const title = lecture.title;
      const titleelement = el('h1', 'title');
      titleelement.innerText = title;
      document.body.appendChild(titleelement);

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
          const liEle = el('li', 'liList');
          liEle.innerText = data;
          ulEle.appendChild(liEle);
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
      document.body.appendChild(container);
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

        // Element fyrir Category
        const category = lecture.category;
        const catelement = el('p', 'category');
        catelement.innerText = category;
        lectureItem.appendChild(catelement);

        // Element fyrir Title
        const title = lecture.title;
        const titleelement = el('p', 'title');
        titleelement.innerText = title;
        lectureItem.appendChild(titleelement);

        container.appendChild(lectureItem);
      });

      document.querySelector('main').appendChild(container);
    }
  };

  request.send();
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  const paramsString = window.location.search;

  if (isLecturePage) {
    if (paramsString === '') return;
    const searchParams = new URLSearchParams(paramsString);
    getLectures(searchParams.get('slug'));
  } else {
    getFrontpage();
    /* const list = new List();
    list.load(); */
  }
});
