
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        const API_KEY = '21740088-9076eeeb2649a32b7d529642f';
        const FETCH_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
      return fetch(FETCH_URL)
        .then(response => response.json())
        .then(({ hits }) => {
          this.incrementPage();
          return hits;
        });
  }
  
    incrementPage() {
      this.page += 1;
  }

    // resetPage() {
    //   this.page = 1;
    // }
    get query() {
      return this.searchQuery;
  }
    set query(newQuery) {
      this.searchQuery = newQuery;
  }

};



 