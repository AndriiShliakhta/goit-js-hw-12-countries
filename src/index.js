import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
var _ = require('lodash');

defaultModules.set(PNotifyMobile, {});

alert({
  text: 'Notice me, senpai!'
});

const input = document.querySelector('.countriesName');
const list = document.querySelector('.list');

// const onCountriesSearch = _.debounce(() => {
//   let name = input.value;

//   list.innerHTML = `<li class="item">${name}</li>`;
//     console.log(name);
//   }, 500)



const onCountriesSearch = _.debounce(() => {
  let name = '';
    name = input.value;
  // list.innerHTML = `<li class="item">${name}</li>`;
    // console.log(name);
  
   fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
    
      console.log('response :>> ', response);
      return response.json();
    })
     .then(data => {
       const items = data.reduce((acc, item) => {
         acc += `<li class="item">${item}</li>`;
         return acc;
      })
        
       list.innerHTML = items;
        console.log('data :>> ', items);
      // data handling
    })
    .catch(error => {
      // error handling
      console.log('error+ :>> ', error+', бл...');
    });
  
  
  }, 500)
    // console.log(name);


 

  




input.addEventListener('input', onCountriesSearch)