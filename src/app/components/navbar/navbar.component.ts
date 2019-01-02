import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn?: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showRegister = this.settingsService.getSettings().allowRegistration;

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('Вы вышли из приложения', {
      cssClass: 'alert-success',
      timeout: 4000
    });
    this.router.navigate(['/login'])
  }

}
