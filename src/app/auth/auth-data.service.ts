import { User } from '../shared/user.modal';
import { UserData } from '../shared/userData.modal';
import { EventEmitter, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ClientsService } from '../shared/clients.service';
import { UIService } from './ui.service';

@Injectable()
export class AuthService {
    constructor(private router: Router, private firebaseAuth: AngularFireAuth, private route: ActivatedRoute, private clientsService: ClientsService, private uiService: UIService) {}
    private user: User;
    isAuthenticated = false;
    authChange = new EventEmitter<boolean>();
    registerUser(userData: UserData) {
        this.firebaseAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password);
        this.isAuthenticated = true;
        this.authChange.emit(true);
        this.router.navigate(['/clients']);
    }

    loginUser(userData: UserData) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(userData.email, userData.password)
        .then(
            (result => {
                this.isAuthenticated = true;
                this.authChange.emit(true);
                this.router.navigate(['/clients']);
                this.uiService.logError.emit(false);
            })
        )
        .catch(
            (error => {
                this.isAuthenticated = false;
                this.uiService.logError.emit(true);
            })
        );
    }

    logOut() {
        this.firebaseAuth.auth.signOut();
        this.isAuthenticated = false;
        this.clientsService.cancelSubscriptions();
        this.authChange.emit(false);
        this.router.navigate(['/']);
    }

    isAuth() {
        return this.isAuthenticated;
    }
}
