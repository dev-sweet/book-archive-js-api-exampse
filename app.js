const searchBook = () => {
    // get search field and search value
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear error field
    const errorBox = document.getElementById('error-message');
    errorBox.innerText = '';

    // check input field
    if(searchText === ''){
        errorBox.innerText = `Input field can't be empty !`;
        document.getElementById('search-result').textContent = '';
    }
    else{ 
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs,searchText));
    }
    
    // clear search field
    searchField.value = '';
}

const displayBooks = (books,searchText) =>{
    const searResult = document.getElementById('search-result');

    // clear prev search result
    searResult.textContent = '';

    // show total search result
    document.getElementById('total-result').innerText = `Total Result : ${books.length}`;


    if(books.length === 0){
        document.getElementById('error-message').innerText = `Sorry, ${searchText} Not Found !`;
    }
    else{
        books.forEach(book => {
            // set default value of image url,athorname,and first publish year
            let imageUrl = '';
            let authorName = '';
            let publisher = '';
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
            if(book.publisher !==undefined){
                publisher = book.publisher[0];
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
                    <h5><strong>Book Name :</strong> ${book.title}</h5>
                    <p><strong>Author : </strong>${authorName}</p>
                    <p><strong>Publisher : </strong>${publisher}</p>
                    <p class="small"><strong>First Published : </strong>${firtsPublishYear}</p>
                </div>
             </div>
            `;  
    
            searResult.appendChild(div);
        });
    }
}