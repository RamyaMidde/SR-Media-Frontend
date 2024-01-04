import { Component, Injectable, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
class ContactService {
  constructor(private http: HttpClient) { }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  showMessage = false;
  @ViewChild('resetPasswordMail') resetPasswordMail: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  // Contact Us Form
  contactUsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  onSubmit() {
    this.contactUsForm.markAllAsTouched();
    if (this.contactUsForm.valid) {
      console.log('Validdd 1');
      const postData = {
        document: {
          name: this.contactUsForm.get('name')!.value,
          email: this.contactUsForm.get('email')!.value,
          message: this.contactUsForm.get('message')!.value,
        }
      };

      this.submitContactForm(postData)
        .subscribe(
          (res: any) => {
            console.log('Validdd 2');
            console.log(res);
          },
          (err: any) => {
            // Handle error response
            console.error(err);
          }
        );
      this.showMessage = true;
      this.contactUsForm.reset();
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);

    }
  }


  private submitContactForm(data: any): Observable<any> {
    const apiUrl = environment.apiUrl;
    console.log('ramyaaaa')
    return this.http.post(apiUrl, data);
  }
}
