import {Injectable} from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User
} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user = new BehaviorSubject<User | null>(null);

    constructor(private auth: Auth) {
        onAuthStateChanged(this.auth, user => this.user.next(user));
    }

    CreateUser(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    Login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    /**
     * Logs out the currently logged user, if there is one.
     * @returns A promise that indicates if the logout was successfully logged out or not. Always returns true if there's no current logged in user.
     */
    async Logout() {
        let wasSuccessful = true;
        if (this.auth.currentUser)
            await this.auth.signOut().then(() => wasSuccessful = true).catch(() => wasSuccessful = false);
        return wasSuccessful;
    }

    /**
     * @returns an observable for the user object.
     */
    GetUserObservable() {
        return this.user.asObservable();
    }

    /**
     * @returns the current value of the user object.
     */
    GetCurrentUser() {
        return this.auth.currentUser;
    }

}
