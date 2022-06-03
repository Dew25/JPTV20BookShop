
import {viewModule} from './ViewModule.js';
import {authorModule} from './AuthorModule.js';

class BookModule{
    createNewBook(){
        const formData = new FormData(document.getElementById('newBookForm'));
        const promise = fetch('createNewBook',{
            method: 'POST',
            body: formData
        });
        promise.then(response => response.json())
                .then(response =>{
                   if(response.status){
                       document.getElementById('info').innerHTML = response.info;
                       viewModule.showNewBookForm();
                       bookModule.insertBookOptions(true);
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
                    document.getElementById('info').innerHTML = 'Ошибка сервера insertBookOptions: '+error;
                });
    }
    insertListCovers(){
        const promiseListCovers = fetch('getListCovers',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            }
        });
        promiseListCovers
                .then(response => response.json())
                .then(response =>{
                    if(response.status){
                        const select = document.getElementById('list_covers');
                        select.options.length=0;
                        let option = document.createElement('option');
                        option.text = "Выберите обложку";
                        option.value = '';
                        select.add(option);
                        
                        for(let i=0; i<response.covers.length; i++){
                            option = document.createElement('option');
                            option.text = response.covers[i];
                            option.value = response.covers[i];
                            select.add(option);
                        }
                        
                    }else{
                       document.getElementById('info').innerHTML = response.info;  
                    }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера insertListCovers: '+error;
                });
    }
    selectCover(book){
        let coverFileName = book.cover.slice(book.cover.lastIndexOf('\\')+1);
        let select = document.getElementById('list_covers');
        for(let i=0; i<select.options.length;i++){
            if(select.options[i].value === coverFileName){
                select.value = coverFileName;
                break;
            }
        }
    }
    editBook(){
        const editBookId = document.getElementById('list_books').value;
        const promiseEditBook = fetch('getEditBook',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify({"editBookId": editBookId})
        });
        promiseEditBook
                .then(response => response.json())
                .then(response =>{
                    if(response.status){
                        document.getElementById('id').value=response.editBook.id;
                        document.getElementById('book_name').value=response.editBook.bookName;
                        document.getElementById('published_year').value=response.editBook.publishedYear;
                        document.getElementById('price').value=response.editBook.price;
                        authorModule.insertListAuthors(false, response.editBook);
                        let selectListCovers = document.getElementById('list_covers');
                        for(let i=0; i < selectListCovers.options.length;i++){
                            if(selectListCovers.options[i].value === response.editBook.cover){
                                selectListCovers.options[i].selected;
                            }
                        }
                        bookModule.insertListCovers();
                        bookModule.selectCover(response.editBook);
                    }else{
                       document.getElementById('info').innerHTML = response.info;  
                    }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера editBook: '+error;
                });
    }
    updateBook(){
        const formData = new FormData(document.getElementById('newBookForm'));
        const promise = fetch('updateBook',{
            method: 'POST',
            body: formData
        });
        promise.then(response => response.json())
                .then(response =>{
                   if(response.status){
                       document.getElementById('info').innerHTML = response.info;
                       viewModule.showNewBookForm();
                       bookModule.insertBookOptions(true);
                   }else{
                       document.getElementById('info').innerHTML = response.info;
                   }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера (createNewBook): '+error;
                });
       
    }
}
const bookModule = new BookModule();

export {bookModule};
