import { Component } from '@angular/core';
import { Usuario } from './_models/usuario';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: Usuario;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public ngxSmartModalService: NgxSmartModalService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  eae(){
    this.ngxSmartModalService.open('myModal');
  }
}
