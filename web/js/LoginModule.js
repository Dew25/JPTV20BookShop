import {checkMenu} from './App.js';
import {bookModule} from './BookModule.js';
import {viewModule} from './ViewModule.js';
class LoginModule{
    
    sendCredential(){
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const credendial = {
            "login": login,
            "password": password
        };
        //Посылаем запрос а с паттерном 'login', методом POST и телом body в формате JSON
        // возвращается обещание (Promise) со статусом "ожидание"
        let promise = fetch('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(credendial) 
        });
        // Обрабатываем обещание с помощью then
        promise.then(response => response.json()) //переводим обещание в статус выполнено 
                                                  // и преобразовываем JSON в JavaScript object
               .then(response => {// обрабатываем object полученый из обещания
                    document.getElementById('info').innerHTML = response.info;
                    if(response.status){
                        sessionStorage.setItem('user',JSON.stringify(response.user));
                        sessionStorage.setItem('role',JSON.stringify(response.role));
                        checkMenu();
                        bookModule.getListBooks();
                        
                    }
               })
               .catch(error =>{
                    document.getElementById('info').innerHTML = "Ошибка сервера sendCredential: "+error;
                    checkMenu();
                    document.getElementById('content').innerHTML = "";
               });


    }
    logout(){
        let promiseLogout = fetch('logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        // Обрабатываем обещание с помощью then
        promiseLogout.then(response => response.json()) 
           .then(response => {// обрабатываем object полученый из обещания
                document.getElementById('info').innerHTML = response.info;
                if(!response.status){
                    if(sessionStorage.getItem('user')){
                        sessionStorage.removeItem('user');
                    }
                    if(sessionStorage.getItem('role')){
                        sessionStorage.removeItem('role');
                    }
                   checkMenu();
                   document.getElementById('content').innerHTML = "";
                   bookModule.getListBooks();
                }
            });
    }
    registration(){
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const phone = document.getElementById('phone').value;
        const login = document.getElementById('login').value;
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;
        if("" === firstname || "" === lastname || '' === phone || '' === password1 || ''===password2){
            document.getElementById('info').innerHTML='Все поля должны быть заполнены';
            document.getElementById('password1').innerHTML = '';
            document.getElementById('password2').innerHTML = '';
            return;
        }
        if(password1 !== password2){
            document.getElementById('info').innerHTML='Не совпадают пароли';
            document.getElementById('password1').innerHTML = '';
            document.getElementById('password2').innerHTML = '';
            return;
        }
        const newUser = {
            "firstname": firstname,
            "lastname": lastname,
            "phone": phone,
            "login": login,
            "password": password1
        };
        //Посылаем запрос а с паттерном 'login', методом POST и телом body в формате JSON
        // возвращается обещание (Promise) со статусом "ожидание"
        let promise = fetch('registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(newUser) 
        });
        // Обрабатываем обещание с помощью then
        promise.then(response => response.json()) //переводим обещание в статус выполнено 
                                                  // и преобразовываем JSON в JavaScript object
               .then(response => {// обрабатываем object полученый из обещания
                    document.getElementById('info').innerHTML = response.info;
                    if(response.status){
                        viewModule.showLoginForm();
                    };
               })
               .catch(error =>{
                    document.getElementById('info').innerHTML = "Ошибка сервера sendCredential: "+error;
                    checkMenu();
                    document.getElementById('content').innerHTML = "";
               });
    }
}

const loginModule = new LoginModule();

export {loginModule};

