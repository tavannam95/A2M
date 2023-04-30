import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/ApiConstant';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    constructor(private readonly http: HttpClient) {
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${ApiConstant.auth.login}`, {
            email,
            password
        });
    }

    logout() {

    }

}
