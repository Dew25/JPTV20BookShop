import {loginModule} from './LoginModule.js';
import {authorModule} from './AuthorModule.js';
import {bookModule} from './BookModule.js';
import {userModule} from './UserModule.js';

class ViewModule{
    showLoginForm(){
        const content = document.getElementById('content');
        content.innerHTML = 
               `<div class="card border-secondary mb-3 mx-auto" style="max-width: 30rem;">
                    <h3 class="card-header w-100 text-center ">Авторизация</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="login" class="form-label mt-4">Логин</label>
                        <input type="text" class="form-control" id="login" placeholder="Login">
                      </div>
                      <div class="form-group">
                        <label for="password" class="form-label mt-4">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password">
                      </div>
                      <button id='button_login' type="submit" class="btn btn-primary my-3">Войти</button>
                      <p class="info">Нет логина? <a class="btn text-info" id="registration">Зарегистрируйся</a></p>
                    </div>
                </div>`;
        document.getElementById('password').addEventListener('keypress',(e)=>{
            if(e.key === 'Enter'){
                e.preventDefault();
                loginModule.sendCredential();
            }
        });
        const buttonLogin = document.getElementById("button_login");
        buttonLogin.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.sendCredential();
        });
        const registration = document.getElementById('registration');
        registration.addEventListener('click', (e)=>{
            e.preventDefault();
            viewModule.showRegistrationForm();
        });
        
    };
    showRegistrationForm(){
        const content = document.getElementById('content');
        content.innerHTML =`<div class="card border-primary mb-3 mx-auto" style="max-width: 30rem;">
                                <h3 class="card-header text-center">Новый пользователь</h3>
                                <div class="card-body">
                                  <div class="form-group">
                                    <label for="firstname" class="form-label mt-4">Имя</label>
                                    <input type="text" class="form-control" id="firstname" placeholder="Имя">
                                  </div>
                                  <div class="form-group">
                                    <label for="lastname" class="form-label mt-4">Фамилия</label>
                                    <input type="text" class="form-control" id="lastname" placeholder="Фамилия">
                                  </div>
                                  <div class="form-group">
                                    <label for="phone" class="form-label mt-4">Телефон</label>
                                    <input type="text" class="form-control" id="phone" placeholder="Телефон">
                                  </div>
                                  <div class="form-group">
                                    <label for="login" class="form-label mt-4">Логин</label>
                                    <input type="text" class="form-control" id="login" placeholder="Логин">
                                  </div>
                                  <div class="form-group">
                                    <label for="password1" class="form-label mt-4">Пароль</label>
                                    <input type="password" class="form-control" id="password1" placeholder="Пароль">
                                  </div>
                                  <div class="form-group">
                                    <label for="password2" class="form-label mt-4">Повторить пароль</label>
                                    <input type="password" class="form-control" id="password2" placeholder="Повторить пароль">
                                  </div>
                                </div>
                                <button type="button" id="btn_registration" class="btn btn-primary m-3">Зарегистрироваться</button>
                            </div>`;
        const btnRegistration = document.getElementById('btn_registration');
        btnRegistration.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.registration();
        })
    }
    showAuthorForm(){
        const content = document.getElementById('content');
        content.innerHTML = 
            `<div class="card border-secondary mb-3 mx-auto" style="max-width: 30rem;">
                <h3 id="titlePageAuthor" class="card-header w-100 text-center ">Добавление автора</h3>
                <div class="card-body">
                  <div class="form-group">
                    <label for="firstname" class="form-label mt-4">Имя</label>
                    <input type="hidden" id="author_id" value="">
                    <input type="text" class="form-control" id="firstname" placeholder="Имя" value="">
                  </div>
                  <div class="form-group">
                    <label for="lastname" class="form-label mt-4">Фамилия</label>
                    <input type="text" class="form-control" id="lastname" placeholder="Фамилия"  value="">
                  </div>
                  <div class="form-group">
                    <label for="birth_year" class="form-label mt-4">Год рождения</label>
                    <input type="text" class="form-control" id="birth_year" placeholder="Год рождения"  value="">
                  </div>
                  <button id="btn_add_author" type="submit" class="btn btn-primary my-3">Добавить автора</button>
                  <button id="btn_update_author" type="submit" class="btn btn-primary my-3 d-none">Изменить автора</button>
                </div>
            </div>
            <div class="card border-0 mb-3 mx-auto" style="max-width: 50rem;">
                <div class="card-body row">
                        <div class="form-group mb-4">
                            <label for="select_authors" class=" col-form-label mt-2">Список авторов</label>
                            <select class="col-sm-10 form-select form-control-plaintext" id="select_authors">
                              
                            </select>
                        </div>
                </div>
            </div>`;
        document.getElementById('btn_add_author').addEventListener('click',(e)=>{
            e.preventDefault();
            authorModule.createAuthor();
        });
        document.getElementById('btn_update_author').addEventListener('click',(e)=>{
            e.preventDefault();
            authorModule.updateAuthor();
            document.getElementById('btn_add_author').classList.remove('d-none');
            document.getElementById('btn_update_author').classList.add('d-none');
            document.getElementById('titlePageAuthor').innerHTML = 'Добавление автора';
        });
        document.getElementById('select_authors').addEventListener('change',(e)=>{
            e.preventDefault();
            authorModule.editAuthor();
            document.getElementById('btn_add_author').classList.add('d-none');
            document.getElementById('btn_update_author').classList.remove('d-none');
            document.getElementById('titlePageAuthor').innerHTML = 'Редактирование данных автора';
        });
        authorModule.insertListAuthors(true);
    };
    showBookForm(){
        const content = document.getElementById('content');
        content.innerHTML = 
           `<form id="bookForm"><div class="card border-secondary mb-3 mx-auto" style="max-width: 30rem;">
                <h3 class="card-header w-100 text-center " id="book_form_title">Новая книга</h3>
                <div class="card-body">
                  <div class="form-group">
                    <label for="bookName" class="form-label mt-4">Название книги</label>
                    <input type="hidden" name="id" id="id">
                    <input type="text" class="form-control" name="bookName" id="book_name" placeholder="Название книги">
                  </div>
                  <div class="form-group">
                    <label for="publishedYear" class="form-label mt-4">Год издания</label>
                    <input type="text" class="form-control" name="publishedYear" id="published_year" placeholder="Год издания">
                  </div>
                  <div class="form-group mt-4">
                    <label for="select_authors" class=" col-form-label mt-2">Список авторов</label>
                    <select multiple row="5" class="col-sm-10 form-select form-control-plaintext" name="selectAuthors" id="select_authors">
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="price" class="form-label mt-4">Цена</label>
                    <input type="text" class="form-control" id="price" name="price" placeholder="Цена">
                  </div>
                  <div class="form-group">
                    <label for="cover" class="form-label mt-4">Обложка</label>
                    <input type="file" class="form-control" id="cover" name="cover" placeholder="Обложка">
                  </div>
                  <div class="form-group mb-4">
                    <label for="list_covers" class=" col-form-label mt-2">Список загруженных обложек</label>
                    <select class="col-sm-10 form-select form-control-plaintext" id="list_covers" name="coverFileName">

                    </select>
                  </div>
                  <button id="btn_add_book" type="submit" class="btn btn-primary my-3">Добавить книгу</button>
                  <button id="btn_update_book" type="submit" class="btn btn-primary my-3 d-none">Изменить данные книги</button>
                </div>
            </div>
            <div class="card border-0 mb-3 mx-auto" style="max-width: 30rem;">
                <div class="card-body row">
                        <div class="form-group mb-4">
                            <label for="list_books" class="col-form-label mt-2">Список книг (выберите книгу чтобы отредактировать ее данные)</label>
                            <select class="col-sm-10 form-select form-control-plaintext" id="list_books">
                              
                            </select>
                        </div>
                </div>
            </div></form>`;
        authorModule.insertListAuthors(false);
        bookModule.insertBookOptions(true);
        bookModule.insertListCovers();
        document.getElementById('book_form_title').innerHTML = 'Новая книга';
        if(document.getElementById('btn_add_book').classList.contains('d-none')){
            document.getElementById('btn_add_book').classList.remove('d-none');
        }
        if(document.getElementById('btn_update_book').classList.contains('d-none')){
            document.getElementById('btn_update_book').classList.add('d-none');
        }

        document.getElementById('bookForm').addEventListener('submit',e => {
            e.preventDefault();
            if(document.getElementById('btn_update_book').classList.contains('d-none')){
                bookModule.createBook();
            }else{
                bookModule.updateBook();
            }
        });
        document.getElementById('list_books').addEventListener('change', e=>{
            e.preventDefault();
            bookModule.editBook();
            
            document.getElementById('btn_update_book').classList.remove('d-none');
            document.getElementById('btn_add_book').classList.add('d-none');
            document.getElementById('book_form_title').innerHTML = 'Изменение данных книги';
        });
    };
    showListBooks(listBooks){
        const content = document.getElementById('content');
        content.innerHTML='';
        content.insertAdjacentHTML('afterBegin',
           `<div class="w-100 ">
                <h2 class="w-100 d-flex justify-content-center my-5">Список книг</h2>
                <div id="card_container" class="w-100 d-flex justify-content-center">

                </div>
            </div>`);
        const cardContainer = document.getElementById('card_container');
        for(let i = 0;i<listBooks.length;i++){
            const book = listBooks[i];
            let authors = '';
            for(let j=0; j<book.author.length;j++){
                authors += book.author[j].firstname+' '+book.author[j].lastname+'. '
            }
            let titleAuthors = "Автор";
            if(book.author.length > 1){
                titleAuthors = "Авторы";
            }
            cardContainer.insertAdjacentHTML('beforeEnd', 
                `<div class="card border-primary m-3" style="max-width: 20rem;">
                    <img src='insertFile/${book.cover}' class="card-img-top" style="width: 20rem; height: 25rem">
                    <div class="card-header"><h4 class="card-text">${book.bookName}</h4></div>
                    <div class="card-body">
                      <p class="card-text">${titleAuthors}: <strong>${authors}</strong></p>
                      <p class="card-text">Цена: <strong>${book.price}</strong> шт.</p>
                       <button id="btn_buy" type="button" class="btn btn-primary">Купить</button>
                    </div>
                </div>`);
            document.getElementById('btn_buy').addEventListener('click',e=>{
                userModule.buyBook(book);
            });
        }
    }
}
const viewModule = new ViewModule();
export {viewModule};

