import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

//this is a global declared function in index.html
// <!--Custom JavaScript, we have updated the code -->
// <script src="./assets/js/custom.js"></script>
//we are using to reload all the page style when we are coming from the login

declare function customInitFunctions();



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  year = new Date().getFullYear();
  //inject the service for the theme settings
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
