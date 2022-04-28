import {loginModule} from './LoginModule.js';
import {authorModule} from './AuthorModule.js';

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
                    </div>
                </div>`;
        const buttonLogin = document.getElementById("button_login");
        buttonLogin.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.sendCredential();
        });
    };
    showNewAuthorForm(){
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
            authorModule.createNewAuthor();
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
        authorModule.insertListAuthors();
    };
    showNewBookForm(){
        const content = document.getElementById('content');
        content.innerHTML = 
           `<div class="card border-secondary mb-3 mx-auto" style="max-width: 30rem;">
                <h3 class="card-header w-100 text-center ">Новая книга</h3>
                <div class="card-body">
                  <div class="form-group">
                    <label for="bookName" class="form-label mt-4">Название книги</label>
                    <input type="text" class="form-control" id="book_name" placeholder="Название книги">
                  </div>
                  <div class="form-group">
                    <label for="publishedYear" class="form-label mt-4">Год издания</label>
                    <input type="text" class="form-control" id="published_year" placeholder="Год издания">
                  </div>
                  <div class="form-group mt-4">
                    <label for="select_authors" class=" col-form-label mt-2">Список авторов</label>
                    <select multiple row="5" class="col-sm-10 form-select form-control-plaintext" id="select_authors">
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="quantity" class="form-label mt-4">Количество экземпляров</label>
                    <input type="password" class="form-control" id="quantity" placeholder="Количество экземпляров">
                  </div>
                  <button id="btn_add_book" type="submit" class="btn btn-primary my-3">Добавить книгу</button>
                </div>
            </div>
            <div class="card border-0 mb-3 mx-auto" style="max-width: 50rem;">
                <div class="card-body row">
                        <div class="form-group mb-4">
                            <label for="list_books" class=" col-form-label mt-2">Список книг (выберите книгу чтобы отредактировать ее данные)</label>
                            <select class="col-sm-10 form-select form-control-plaintext" id="list_books">
                              
                            </select>
                        </div>
                </div>
            </div>`;
        document.getElementById('btn_add_book').addEventListener('click',e => {
            e.preventDefault();
            bookModule.createNewBook();
        });
        
    }
}
const viewModule = new ViewModule();
export {viewModule};

