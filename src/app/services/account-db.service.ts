import {Injectable} from '@angular/core';
import {Firestore, DocumentData, deleteDoc, doc, setDoc, updateDoc, getDoc, getDocs, collection, query, where, docData} from "@angular/fire/firestore";
import {Auth, User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";
import {Candidate, JSObjectToCandidate, UserToJSObject} from "../classes/candidate";
import {Company, CompanyToJSObject, JSObjectToCompany} from "../classes/company";
import {Account} from "../classes/app-utility";
import {AccountType} from "../interfaces/account-related-interfaces";

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

    private colShort() {
        return collection(this.firestore, this.collectionName);
    }

    public ConvertToProperClass(docData: DocumentData) {
        return AccountType[docData["accountType"] as keyof typeof AccountType] == AccountType.Candidate ? JSObjectToCandidate(docData) : JSObjectToCompany(docData);
    }

    /**
     * @returns an observable for the user object.
     */
    public GetUserObservable() {
        return this.user.asObservable();
    }

    /**
     * @returns the current value of the user object.
     */
    public GetCurrentUser() {
        return this.auth.currentUser;
    }

    public Login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    /**
     * Logs out the currently logged user, if there is one.
     * @returns A promise that indicates if the logout was successfully logged out or not. Always returns true if there's no current logged-in user.
     */
    public async Logout() {
        let wasSuccessful = true;
        if (this.auth.currentUser)
            await this.auth.signOut().then(() => wasSuccessful = true).catch(() => wasSuccessful = false);
        return wasSuccessful;
    }

    public async CreateAccount(email: string, password: string, account: Account) {
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
            let obj = account.accountType == AccountType.Candidate ? UserToJSObject(account as Candidate) : CompanyToJSObject(account as Company);
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

    public async GetAccount(id: string) {
        const doc = await getDoc(this.docShort(id));
        if (!doc.exists())
            return Promise.reject();
        return Promise.resolve(this.ConvertToProperClass(doc.data()));
    }

    GetAccountObservable(id: string) {
        return docData(this.docShort(id));
    }

    public async GetAllAccounts() {
        const allDocs = await getDocs(this.colShort());
        let arrayOfDocs: (Account)[] = [];
        allDocs.forEach(doc => arrayOfDocs.push(this.ConvertToProperClass(doc.data())));
        return arrayOfDocs;
    }

    public async GetAllCandidates() {
        const queriedDocs = query(this.colShort(), where("accountType", "==", AccountType[AccountType.Candidate]));
        const docs = await getDocs(queriedDocs);
        let arrayOfCandidates: Candidate[] = [];
        docs.forEach(doc => arrayOfCandidates.push(JSObjectToCandidate(doc.data())));
        return arrayOfCandidates;
    }

    public async GetAllCompanies() {
        const queriedDocs = query(this.colShort(), where("accountType", "==", AccountType[AccountType.Company]));
        const docs = await getDocs(queriedDocs);
        let arrayOfCompanies: Company[] = [];
        docs.forEach(doc => arrayOfCompanies.push(JSObjectToCompany(doc.data())));
        return arrayOfCompanies;
    }

    public UpdateAccount(id: string, obj: { [key: string]: any }) {
        return updateDoc(this.docShort(id), obj);
    }

    public UpdateCandidateLinks(id: string, links: string[]) {
        return this.UpdateAccount(id, {links: links});
    }

    /** DANGEROUS.<br />
     * deletes the doc on the database. should be used with a lot of caution.
     */
    public async DeleteAccountEntry(id: string) {
        return await deleteDoc(this.docShort(id));
    }
}
