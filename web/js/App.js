"use strict";
import {viewModule} from './ViewModule.js';
import {loginModule} from './LoginModule.js';
import {bookModule} from './BookModule.js';

export {checkMenu};
var debug = true;
function isDebug(message){
    if(debug) console.log(message);
}
const menuBookShop = document.getElementById("menu_book_shop");
menuBookShop.addEventListener('click', e => {
    e.preventDefault();
    deactiveMenu(menuBookShop);
    bookModule.getListBooks();
});
const menuAddAuthor = document.getElementById("menu_add_author");
menuAddAuthor.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuAddAuthor);
    viewModule.showAuthorForm();
});
const menuAddBook = document.getElementById("menu_add_book");
menuAddBook.addEventListener('click', e=>{
    e.preventDefault();
    activeBtnMenu(menuAddBook);
    viewModule.showBookForm();
});
const menuPurchaces = document.getElementById("menu_purchaces");
menuPurchaces.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuPurchaces);
});
const menuProfile = document.getElementById("menu_profile");
menuProfile.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuProfile);
});
const menuAdminPanel = document.getElementById("menu_admin_panel");
menuAdminPanel.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuAdminPanel);
});
const menuLogin = document.getElementById("menu_login");
menuLogin.addEventListener('click',(e)=>{
    e.preventDefault();
    activeBtnMenu(null);
    viewModule.showLoginForm();
});
const menuLogout = document.getElementById("menu_logout");
menuLogout.addEventListener('click',e=>{
    e.preventDefault();
    activeBtnMenu(null);
    loginModule.logout();
});

bookModule.getListBooks();

function activeBtnMenu(activeMenuBtn){
    if(activeMenuBtn !== null && !activeMenuBtn.classList.contains("active")){
        activeMenuBtn.classList.add("active");
    }
    deactiveMenu(activeMenuBtn);
    document.getElementById('info').innerHTML = '';
}
function deactiveMenu(activeMenuBtn){
    const listNavLinks = document.getElementsByClassName('nav-link');
    for(let i = 0; i < listNavLinks.length; i++){
        if(listNavLinks[i] !== activeMenuBtn && listNavLinks[i].classList.contains('active')){
            listNavLinks[i].classList.remove('active');
        }
    }
}
function checkMenu() {
    let role = null;
    if(sessionStorage.getItem('role') === null){
        if(!menuAddAuthor.classList.contains('d-none')){
            menuAddAuthor.classList.add("d-none");
        }
        if(!menuAddBook.classList.contains('d-none')){
            menuAddBook.classList.add("d-none");
        }
        if(!menuPurchaces.classList.contains('d-none')){
            menuPurchaces.classList.add("d-none");
        }
        if(!menuProfile.classList.contains('d-none')){
            menuProfile.classList.add("d-none");
        }
        if(!menuAdminPanel.classList.contains('d-none')){
            menuAdminPanel.classList.add("d-none");
        }
        if(menuLogin.classList.contains('d-none')){
            menuLogin.classList.remove("d-none");
        }
        if(!menuLogout.classList.contains('d-none')){
            menuLogout.classList.add("d-none");
        }
        return;
    }
    role = JSON.parse(sessionStorage.getItem('role'));
    if(role.roleName === 'USER'){
        if(!menuAddAuthor.classList.contains('d-none')){
            menuAddAuthor.classList.add("d-none");
        }
        if(!menuAddBook.classList.contains('d-none')){
            menuAddBook.classList.add("d-none");
        }
        if(menuPurchaces.classList.contains('d-none')){
            menuPurchaces.classList.remove("d-none");
        }
        if(menuProfile.classList.contains('d-none')){
            menuProfile.classList.remove("d-none");
        }
        if(!menuAdminPanel.classList.contains('d-none')){
            menuAdminPanel.classList.add("d-none");
        }
        if(!menuLogin.classList.contains('d-none')){
            menuLogin.classList.add("d-none");
        }
        if(menuLogout.classList.contains('d-none')){
            menuLogout.classList.remove("d-none");
        }
        return;
    }
    if(role.roleName === 'MANAGER'){
        if(menuAddAuthor.classList.contains('d-none')){
            menuAddAuthor.classList.remove("d-none");
        }
        if(menuAddBook.classList.contains('d-none')){
            menuAddBook.classList.remove("d-none");
        }
        if(menuPurchaces.classList.contains('d-none')){
            menuPurchaces.classList.remove("d-none");
        }
        if(menuProfile.classList.contains('d-none')){
            menuProfile.classList.remove("d-none");
        }
        if(!menuAdminPanel.classList.contains('d-none')){
            menuAdminPanel.classList.add("d-none");
        }
        if(!menuLogin.classList.contains('d-none')){
            menuLogin.classList.add("d-none");
        }
        if(menuLogout.classList.contains('d-none')){
            menuLogout.classList.remove("d-none");
        }
        return;
    }
    if(role.roleName === 'ADMINISTRATOR'){
        if(menuAddAuthor.classList.contains('d-none')){
            menuAddAuthor.classList.remove("d-none");
        }
        if(menuAddBook.classList.contains('d-none')){
            menuAddBook.classList.remove("d-none");
        }
        if(menuPurchaces.classList.contains('d-none')){
            menuPurchaces.classList.remove("d-none");
        }
        if(menuProfile.classList.contains('d-none')){
            menuProfile.classList.remove("d-none");
        }
        if(menuAdminPanel.classList.contains('d-none')){
            menuAdminPanel.classList.remove("d-none");
        }
        if(!menuLogin.classList.contains('d-none')){
            menuLogin.classList.add("d-none");
        }
        if(menuLogout.classList.contains('d-none')){
            menuLogout.classList.remove("d-none");
        }
        return;
    }
}
checkMenu();


