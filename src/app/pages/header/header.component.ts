import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterOutlet, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authenticationSub: Subscription | undefined;
  userAuthenticated = true;
  adminUser= false;
  user: any;
  

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.authenticationSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.adminUser = this.authService.getIsAdmin();
    this.authenticationSub = this.authService.getAuthenticatedSub().subscribe(status => {
      this.userAuthenticated = status;
      this.user = this.authService.getUser();
      console.log('user in header ', this.user)
      this.adminUser = this.user?.isAdmin == 'true' ? true : false;
      console.log('adminUser ', this.adminUser)
    })

    console.log('adminUser ', this.adminUser)

  }

  logout(){
    this.authService.logout();
  }

  //TODO fix admin 

}
