import 'whatwg-fetch';
import 'babel-polyfill';

let baseUrl = 'https://udemy-angular2-36dea.firebaseio.com';

let BookmarkAPI = {
    fetchBookmarks() {
        return fetch(`${baseUrl}/bookmarks.json`)
            .then((response) => {
                return response.json()
            });
    },

    deleteBookmark(bookmark) {
        return fetch(`${baseUrl}/bookmarks/${bookmark.id}.json`,{
           method: 'delete',
        })
    },

    addBookmark(bookmark){
        return fetch(`${baseUrl}/bookmarks.json`,{
           method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookmark)
        })
    },

    editBookmark(bookmark){
        return fetch(`${baseUrl}/bookmarks/${bookmark.id}.json`,{
           method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: bookmark.title,
                url: bookmark.url
            })
        })
    }
};

export default BookmarkAPI;