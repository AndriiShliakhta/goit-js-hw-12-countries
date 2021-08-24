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


const input = document.querySelector('.countriesNameInput');
const container = document.querySelector('.container');

const createMarkup = function (data) {
  const items = data.reduce((acc, item) => {
         acc += `<li class="item">${item.name}</li>`;
         return acc;
      }, '')

       if (data.length === 1) {
         container.innerHTML = templateFunction(data[0]);
       }
       else if (data.length > 1 && data.length <= 10) {
         container.innerHTML = items;
       }
       else if (data.length > 10) {
         container.innerHTML = '';
         error({
           text: 'Too many matcheses found. Please enter a more specific query!',
         });
       }
}


const onCountriesSearch = _.debounce(() => {
  let name = '';
  name = input.value;
  
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(createMarkup)
    .catch(error => {
      console.log('error+ :>> ', error+' Такого не существует!');
    });
  
  }, 500)


input.addEventListener('input', onCountriesSearch)