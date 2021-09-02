const searchBook = () => {
    // get search field and search value
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data.docs));
    
    // clear search field
    searchField.value = '';
}

const displayBooks = (books) =>{
    const searResult = document.getElementById('search-result');

    // clear prev search result
    searResult.textContent = '';

    books.forEach(book => {
        // set default value of image url,athorname,and first publish year
        let imageUrl = '';
        let authorName = '';
        let firtsPublishYear = '';

        // default image
        if(book.cover_i === undefined){
            imageUrl = `./img/default.png`;
        }
        else{
            imageUrl =`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        }
        // set author name
        if(book.author_name !== undefined){
            authorName = book.author_name[0];
        }

        // set first publish year
        if(book.first_publish_year !== undefined){
            firtsPublishYear = book.first_publish_year;
        }

        // book info
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-3 h-100">
            <img src="${imageUrl}" class="card-img-top img-fluid mx-auto" style="height:250px">
            <div class="card-body">
                <h6><strong>Book Name :</strong> ${book.title}</h6>
                <p><strong>Author : </strong>${authorName}</p>
                <p><strong>First Published : </strong>${firtsPublishYear}</p>
            </div>
         </div>
        `;  

        searResult.appendChild(div);
    });
}