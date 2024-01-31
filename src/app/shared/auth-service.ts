import { HttpClient } from "@angular/common/http";
// import { expressionType } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { AuthModel } from "./auth-model";

@Injectable({providedIn:"root"})
export class AuthService{

    private token: string = '';
    private user_id: string = '';
    private authenticatedSub = new Subject<boolean>();
    private isAuthenticated = false;
    public isAdmin = false;
    private logoutTimer: any;
    private user: any;

    getIsAuthenticated(){
        return this.isAuthenticated;
    }
    getAuthenticatedSub(){
        return this.authenticatedSub.asObservable();
    }
    getToken(){
        return this.token;
    }
    getUserId(){
        return this.user_id;
    }

    getUser(){
        return this.user;
    }

    getIsAdmin(){
        return this.isAdmin;
    }
    
    constructor(private http: HttpClient, private router: Router){}
    
    signupUser(email: string, password: string, firstname: string, lastname: string, phone:string): Observable<any> {
        let isAdmin = 'false';
        if(email=='testadmin@yahoo.com'){
            isAdmin = 'true';
        }

        const authData: AuthModel = {email: email, password: password, firstname: firstname, lastname: lastname, phone: phone, isAdmin: isAdmin};

        console.log('authData ', authData)
        
        // this.http.post('http://localhost:3000/sign-up/', authData).subscribe(res => {
        //     console.log('res ', res);
        // })

        return this.http.post('http://localhost:3000/sign-up/', authData)
    }

    loginUser(email: string, password: string){
        const authData: AuthModel = {email: email, password: password};

        console.log('authData in login ', authData)

        this.http.post<{token: string, expiresIn: number, user_id: string, user: any}>('http://localhost:3000/login/', authData)
            .subscribe(res => {
                this.token = res.token;
                this.user_id = res.user_id;
                this.user = res.user;
                console.log('token ', this.token);
                console.log('user_id ', res.user_id);
                console.log('user ', this.user);
                if(this.token){
                    this.authenticatedSub.next(true);
                    this.isAuthenticated = true;
                    this.isAdmin = this.user == 'true' ? true : false;
                    this.router.navigate(['/']);
                    this.logoutTimer = setTimeout(() => {this.logout()}, res.expiresIn * 1000);
                    const now = new Date();
                    const expiresDate = new Date(now.getTime() + (res.expiresIn * 1000));
                    this.storeLoginDetails(this.token, expiresDate, this.user_id);
                }
            })
    }

    logout(){
        this.token = '';
        this.user_id = '';
        this.isAuthenticated = false;
        this.authenticatedSub.next(false);
        this.router.navigate(['/']);
        clearTimeout(this.logoutTimer);
        this.clearLoginDetails();
    }

    storeLoginDetails(token: string, expirationDate: Date, user_id: string){
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('expiresIn', expirationDate.toISOString());
    }

    clearLoginDetails(){
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('expiresIn');
    }

    getLocalStorageData(){
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        const expiresIn = localStorage.getItem('expiresIn');

        if(!token || !user_id || !expiresIn){
            return;
        }
        return {
            'token': token,
            'user_id': user_id,
            'expiresIn': new Date(expiresIn)
        }
    }

    authenticateFromLocalStorage(){
        const localStorageData = this.getLocalStorageData();
        if(localStorageData){
            const now = new Date();
            const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

            console.log('logoutTimer ', this.logoutTimer)

            if(expiresIn > 0){
                this.token = localStorageData.token;
                this.user_id = localStorageData.user_id;
                this.isAuthenticated = true;
                this.authenticatedSub.next(true);
                this.logoutTimer = setTimeout(() => {(expiresIn / 1000)});
            }
        }
    }
}