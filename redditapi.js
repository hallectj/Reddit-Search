export default {
    search: function(searchTerm, limit, sortBy){
        const proxy = 'https://cors-anywhere.herokuapp.com/';  
        return fetch(proxy + `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${limit}`)
        .then(results => results.json())
        .then(data => data.data.children.map(data => data.data));
    }
};