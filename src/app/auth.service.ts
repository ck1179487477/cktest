import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    isLoggedIn = false;

    login() {
        this.isLoggedIn = true;
    }

    logout() {
        this.isLoggedIn = false;
    }

    Loggedin() {
        return this.isLoggedIn;
    }
}