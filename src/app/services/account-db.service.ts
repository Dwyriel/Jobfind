import {Injectable} from '@angular/core';
import {deleteDoc, doc, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {Candidate, UserToJSObject} from "../classes/candidate";
import {Company, CompanyToJSObject} from "../classes/company";
import {AccountType} from "../interfaces/account-related-interfaces";
import {Auth, User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccountDBService {
    private user = new BehaviorSubject<User | null>(null);
    private readonly collectionName: string = "accounts";

    constructor(private firestore: Firestore, private auth: Auth) {
        onAuthStateChanged(this.auth, user => this.user.next(user));
    }

    private docShort(id: string) {
        return doc(this.firestore, this.collectionName, id);
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

    async CreateAccount(email: string, password: string, account: Candidate | Company) {
        let wasSuccessful = false;
        let uid: string = "error";
        await createUserWithEmailAndPassword(this.auth, email, password).then(answer => {
            uid = answer.user.uid;
            wasSuccessful = true;
        }).catch(err => {
            wasSuccessful = false;
            console.log(err);
        });
        if (wasSuccessful) {
            let obj = account.accountType == AccountType.User ? UserToJSObject(account as Candidate) : CompanyToJSObject(account as Company);
            await setDoc(this.docShort(uid), obj).then(() => {
                wasSuccessful = true;
            }).catch(err => {
                this.auth.currentUser?.delete();
                wasSuccessful = false;
                console.log(err);
            });
        }
        return wasSuccessful ? Promise.resolve() : Promise.reject();
    }

    UpdateAccount(id: string, obj: { [key: string]: any }) {
        return updateDoc(this.docShort(id), obj);
    }

    UpdateCandidateLinks(id: string, links: string[]) {
        return this.UpdateAccount(id, {links: links});
    }

    /** DANGEROUS.<br />
     * deletes the doc on the database. should be used with a lot of caution.
     */
    async DeleteAccountEntry(id: string) {
        return await deleteDoc(this.docShort(id));
    }
}
