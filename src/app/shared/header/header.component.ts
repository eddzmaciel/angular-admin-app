import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public userProfile: User;
  constructor(private usersService: UsersService) {
    //calling the userProfile generated from the service
    this.userProfile = usersService.userProfile;
  }

  logout() {
    this.usersService.logout();
  }
}
