import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import templateFunction from './template/templateList.hbs';

defaults.mode='light'
defaults.animateSpeed = '100ms';
defaults.hide = true;
defaults.delay = 300;
defaults.closer = false;
defaults.sticker = false;

const _ = require('lodash');


const input = document.querySelector('.countriesName');
const list = document.querySelector('.list');


const onCountriesSearch = _.debounce(() => {
  let name = '';
    name = input.value;
  
   fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {

      return response.json();
    })
     .then(data => {
       const items = data.reduce((acc, item) => {
         acc += `<li class="item">${item.name}</li>`;
         return acc;
      }, '')

       if (data.length === 1) {
         list.innerHTML = templateFunction(data[0]);

       }
       else if (data.length > 1 &&data.length<=10) {
         list.innerHTML = items;
       }
       else if (data.length > 10) {
        //  error('Too many matcheses found. Please enter a more specific query!');
         error({
           text: 'Too many matcheses found. Please enter a more specific query!',
         });

       }
      
    })
    .catch(error => {
      console.log('error+ :>> ', error+', бл...');
    });
  
  }, 500)


 

  




input.addEventListener('input', onCountriesSearch)