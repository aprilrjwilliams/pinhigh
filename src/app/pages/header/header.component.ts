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
  user: any;

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.authenticationSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.authenticationSub = this.authService.getAuthenticatedSub().subscribe(status => {
      this.userAuthenticated = status;
      this.user = this.authService.getUser();
      console.log('user in header ', this.user)
    })

  }

  logout(){
    this.authService.logout();
  }

  //TODO add admin pages

}
