
class BookModule{
    createNewBook(){
        const bookName = document.getElementById('book_name').value;
        const publishedYear = document.getElementById('publishe_year').value;
        const selectAuthors = document.getElementById('select_authors').value;
        const quantity = document.getElementById('quantity').value;
        const newBook = {
            "bookName": bookName,
            "publishedYear": publishedYear,
            "selectAuthors": selectAuthors,
            "quantity": quantity
        }
        const promise = fetch('createNewBook',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(newBook) 
        });
        promise.then(response => response.json())
               .then(response =>{
                   
               })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера (createNewBook): '+error;
                });
       
    }
}
const bookModule = new BookModule();

export {bookModule};
