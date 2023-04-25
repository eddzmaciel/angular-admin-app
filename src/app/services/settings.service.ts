import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //saldo al dom and get the current theme 
  private linkTheme = document.querySelector('#theme');

  constructor() {
    //if you will create a instruction with more of 4 code lines, create your own method
    console.log('SettingsService init...');
    const url = localStorage.getItem('theme') || './assets/css/colors/dblue-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme(themeName: string) {
    //select from index.html
    const url = `./assets/css/colors/${themeName}.css`;
    //vainilla javascript
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    //calling method to change the icon for selected theme in the component
    this.checkCurrentTheme();
  }


  //using vanilla js
  checkCurrentTheme() {
    //we need to assign the type of values
    //get all the elements with class name 'selector'
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach(element => {
      //first we are going to remove the current selected 'working' class
      element.classList.remove('working');
      //we are getting the attribute 'data-theme' value 
      const btnTheme = element.getAttribute('data-theme');
      //generating the url with the themeName
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      //getting the current stablished theme
      const currentThemeUrl = this.linkTheme.getAttribute('href');
      //comparing the current theme with the 'element' theme, and if it is equal we are going to assign the 'working' class
      if (btnThemeUrl === currentThemeUrl) {
        element.classList.add('working');
      }
    });

  }

}
