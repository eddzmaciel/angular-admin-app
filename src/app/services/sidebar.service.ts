import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // creating the menu dinamically
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          icon: '',
          url: '/'
        },
        {
          title: 'ProgressBar',
          icon: '',
          url: 'progress'
        },
        {
          title: 'Gráficas',
          icon: '',
          url: 'chart'
        }
      ]
    }
  ];

  constructor() { }
}
