import {viewModule} from './ViewModule.js';
class AuthorModule{
    createNewAuthor(){
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const birthYear = document.getElementById('birth_year').value;
        const newAuthor = {
            "firstname": firstname,
            "lastname": lastname,
            "birthYear": birthYear
        }
        const promise = fetch('createNewAuthor',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(newAuthor) 
        });
        promise.then(response => response.json())
               .then(response =>{
                   if(response.status){
                       document.getElementById('info').innerHTML = response.info;
                       viewModule.showNewAuthorForm();
                   }else{
                       document.getElementById('info').innerHTML = response.info;
                       firstname = response.firstname;
                       lastname = response.lastname;
                       birthYear = response.birthYear;
                   }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера createNewAuthor: '+error;
                });
                        
    }
    insertListAuthors(combobox,book){
      
        const promiseListAuthors = fetch('getListAuthors',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        promiseListAuthors
                .then(responseListAuthors => responseListAuthors.json())
                .then(responseListAuthors =>{
                    if(responseListAuthors.status){
                        let select = document.getElementById('select_authors');
                        select.options.length=0;
                        let option = null;
                        if(combobox){
                            option = document.createElement('option');
                                option.text = "Выберите автора";
                                option.value = '';
                                select.add(option);
                        }
                        for(let i=0; i<responseListAuthors.authors.length; i++){
                            option = document.createElement('option');
                            option.text = responseListAuthors.authors[i].firstname+' '+responseListAuthors.authors[i].lastname;
                            option.value = responseListAuthors.authors[i].id;
                            select.add(option);
                        }
                        if(book !== undefined){
                            authorModule.selectBookList(book);
                        }
                    }else{
                       document.getElementById('info').innerHTML = response.info;  
                    }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера insertListAuthors: '+error;
                });
    }
    selectBookList(book){
        let select = document.getElementById('select_authors');
        let options = select.options;
        let bookAuthors = [];
        for (let i = 0; i < book.author.length; i++) {
            bookAuthors[i]=book.author[i];
        }
        let authorsId = [];
        for (let i = 0;i < this.select.options.length; i++) {
            this.authorsId[i] = this.select.aptions[i].value;
        }
        for (let i = 0; i < this.select.options.length; i++) {
            for (let j = 0; j < this.bookAuthors.length; j++) {
                console.log('authorsId[i]='+this.select.options[i]);
                console.log('bookAuthors[j]='+this.bookAuthors[j]);
            }
        }
        
    }
    editAuthor(){
        const authorId = document.getElementById('select_authors').value;
        const object = {
            "authorId":authorId
        }
        const promiseAuthor = fetch('getAuthor',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(object)
        });
        promiseAuthor
                .then(response => response.json())
                .then(response =>{
                   if(response.status){
                       document.getElementById('info').value = response.info;
                       document.getElementById('author_id').value = response.author.id
                       document.getElementById('firstname').value = response.author.firstname;
                       document.getElementById('lastname').value = response.author.lastname;
                       document.getElementById('birth_year').value = response.author.birthYear;
                   }else{
                       document.getElementById('info').value = response.info;
                   }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера editAuthor: '+error;
                });
    }
    updateAuthor(){
        const authorId = document.getElementById("author_id").value;
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const birthYear = document.getElementById("birth_year").value;
        const updateUser = {
            "authorId": authorId,
            "firstname": firstname,
            "lastname": lastname,
            "birthYear": birthYear,
        };
        const promiseAuthor = fetch('updateAuthor',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(updateUser)
        });
        promiseAuthor
                .then(response => response.json())
                .then(response =>{
                   if(response.status){
                       document.getElementById('info').innerHTML = 'Автор изменен';
                       viewModule.showNewAuthorForm();
                   }else{
                       document.getElementById('info').innerHTML = 'Автора изменить не удалось';
                   }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера updateAuthor: '+error;
                });
    }
}
const authorModule = new AuthorModule();

export {authorModule};