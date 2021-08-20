import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import templateFunction from './template/templateList.hbs';
var _ = require('lodash');



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
    
      // console.log('response :>> ', response);
      return response.json();
    })
     .then(data => {
       const items = data.reduce((acc, item) => {
         acc += `<li class="item">${item.name}</li>`;
         return acc;
      }, '')
          // console.log(data);
      
       if (data.length === 1) {
         list.innerHTML = templateFunction(data[0]);
          // console.log(data);

         
       }
       else if (data.length > 1) {
         list.innerHTML = items;
        // console.log('data :>> ', data);

       }
       else if (data.length > 10) {
          defaultModules.set(PNotifyMobile, {});

         alert({
          text: 'Notice me, senpai!'
        });

       }
      
       

      // data handling
    })
    .catch(error => {
      // error handling
      console.log('error+ :>> ', error+', бл...');
    });
  
  
  }, 500)


 

  




input.addEventListener('input', onCountriesSearch)