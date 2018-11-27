import List from './lib/list';

// hjálparfall til að útbúa element
function el(type, className) {
  const element = document.createElement(type);
  element.classList.add(className);

  return element;
}

function getLectures(name) {
  const request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/lectures.json', true);

  request.onload = function requestLoad() {
    if (request.status >= 200 && request.status < 400) {
      const response = JSON.parse(request.responseText);
      let lecture;

      // select lecture
      response.lectures.forEach((element) => {
        if (element.slug === name) {
          lecture = element;
        }
      });

      // create elements for all content
      // Element fyrir Image
      const imageURL = lecture.image;
      const imgelement = el('p', null);
      imgelement.innerText = imageURL;
      document.body.appendChild(imgelement);

      // Element fyrir Category
      const category = lecture.category;
      const catelement = el('p', null);
      catelement.innerText = category;
      document.body.appendChild(catelement);

      // Element fyrir Title
      const title = lecture.title;
      const titleelement = el('p', null);
      titleelement.innerText = title;
      document.body.appendChild(titleelement);

      // Element fyrir Content
      const content = lecture.content;
      content.forEach((item) => {
        const type = item.type;
        const data = item.data;
        const itemelement = el('p', null);
        itemelement.innerText = type + data;
        document.body.appendChild(itemelement);
      });
    }
  };

  request.send();
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const paramsString = window.location.search;
    if (paramsString === '') return;
    const searchParams = new URLSearchParams(paramsString);
    getLectures(searchParams.get('slug'));
  } else {
    const list = new List();
    list.load();
  }
});
