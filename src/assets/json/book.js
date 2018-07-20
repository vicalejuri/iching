import IChingBook from './iching_deoxy.json';

/* Export as Global */
console.log("Book loaded");
window.Book = IChingBook;

/* Dispatch BOOK_LOADED action */
if(window.store){
    window.store.dispatch({type: 'ICHING_BOOK_LOADED'});
}

export default IChingBook;