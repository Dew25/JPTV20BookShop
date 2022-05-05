import {viewModule} from './ViewModule.js';
class BookModule{
    createNewBook(){
        const bookName = document.getElementById('book_name').value;
        const publishedYear = document.getElementById('published_year').value;
        const selectedOptions = document.getElementById('select_authors').selectedOptions;
        let valuesAuthorsId = Array.from(selectedOptions).map(({ value }) => value);
        console.log(valuesAuthorsId);
        const quantity = document.getElementById('quantity').value;
        const newBook = {
            "bookName": bookName,
            "publishedYear": publishedYear,
            "selectAuthors": valuesAuthorsId,
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
                   if(response.status){
                       document.getElementById('info').innerHTML = response.info;
                       viewModule.showNewBookForm();
                       bookModule.insertBookOptions();
                   }else{
                       document.getElementById('info').innerHTML = response.info;
                   }
               })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера (createNewBook): '+error;
                });
       
    }
    insertBookOptions(combobox){
        const promiseListAuthors = fetch('getListBooks',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            }
        });
        promiseListAuthors
                .then(response => response.json())
                .then(response =>{
                    if(response.status){
                        const select = document.getElementById('list_books');
                        select.options.length=0;
                        let option = null;
                        if(combobox){
                            option = document.createElement('option');
                                option.text = "Выберите книгу";
                                option.value = '';
                                select.add(option);
                        }
                        for(let i=0; i<response.books.length; i++){
                            option = document.createElement('option');
                            option.text = response.books[i].bookName + ". "+response.books[i].publishedYear;
                            option.value = response.books[i].id;
                            select.add(option);
                        }
                    }else{
                       document.getElementById('info').innerHTML = response.info;  
                    }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера: '+error;
                });
    }
    
}
const bookModule = new BookModule();

export {bookModule};
