import {loginModule} from './LoginModule.js';
import {bookModule} from './BookModule.js';
class UserModule{
    buyBook(book){
         let promiseLogout = fetch('buyBook?id='+book.id, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        // Обрабатываем обещание с помощью then
        promiseLogout.then(response => response.json()) 
           .then(response =>{
               if(response.status){
                   document.getElementById('info').innerHTML = response.info;
                   bookModule.getListBooks();
               }else{
                   document.getElementById('info').innerHTML = "Авторизуйтесь";
                   loginModule.sendCredential();
               }
           })
           .catch(error =>{
                document.getElementById('info').innerHTML = "Ошибка сервера buyBook: "+error;
           });
        
    }
}
const userModule = new UserModule();
export {userModule};

