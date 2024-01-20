import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({});;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  onSubmit(){
    console.log('in onsubmit ', this.loginForm)
    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
  }
}
