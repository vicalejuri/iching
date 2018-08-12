import IChingBook from './iching_deoxy.json';

/* Export as Global */
console.info("Book loaded", performance.now());
window.Book = IChingBook;

/* Dispatch BOOK_LOADED action */
let informBookLoaded = () => {
    let retry_bind = { try: 0 };

    if(window.store){
        console.log(`Book inform (${retry_bind.try}) `, performance.now())
        window.store.dispatch({type: 'ICHING_BOOK_LOADED'});
    } else { 
        // retry
        retry_bind.try++;
        if(retry_bind.try >= 4){
            console.error(`Book inform failed after 4 tries`);
        } else {
            setTimeout( informBookLoaded.bind(retry_bind), 1000 )
        }
    }
}
informBookLoaded();

export default IChingBook;