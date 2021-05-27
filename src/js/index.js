import '../main.css';
import ApiService from './apiService.js';
import cardTemplate from '../templates/card-template.hbs';
import { info} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';



const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
    inputEl:document.querySelector('input')
}
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', makeSearch);
refs.loadMoreBtn.addEventListener('click', loadMoreElements);


function makeSearch(e) {
    e.preventDefault();
    clearGalleryContainer();

    if (refs.inputEl.value != 0) {
        apiService.query = e.currentTarget.elements.query.value;
        console.log(apiService);
        return apiService
            .fetchImages()
            .then(markupGallery)
            .catch(error => console.log(error));
    } else {
        info({
            text: 'Enter anything'
        });
    }
}


function loadMoreElements() {
  return apiService
    .fetchImages()
    .then(markupGallery)
    .then(scrollPage)
    .catch(error => console.log(error));
    
}
const markupGallery = (hits) =>  refs.galleryContainer.insertAdjacentHTML('beforeend', cardTemplate(hits));

function scrollPage() {
    refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

  const clearGalleryContainer=()=>refs.galleryContainer.innerHTML = '';



