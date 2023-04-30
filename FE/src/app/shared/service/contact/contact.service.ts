import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactApiService } from './contact-api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

constructor(private readonly contactApiService: ContactApiService) { }

    getDafaultContact(): Observable<any>{
    return this.contactApiService.getDafaultContact();
    }
}
