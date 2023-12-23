import { Component, Injectable, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  @ViewChild('resetPasswordMail') resetPasswordMail: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  // Contact Us Form
  contactUsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required,Validators.email]],
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
        this.forgotPasswordModal();
        //  this.toastr.success('Email has been sent successfully!', 'Success');
        this.contactUsForm.reset();
        
    }
  }


  private submitContactForm(data: any): Observable<any> {
    const apiUrl = environment.apiUrl;
    console.log('ramyaaaa')
    return this.http.post(apiUrl, data);
  }

    //  Open Forgot Password modal 
    forgotPasswordModal() {
      this.modalService.open(this.resetPasswordMail, {
        backdrop: true,
        keyboard: false,
        centered: true,
        windowClass: 'modal-holder'
      });
    }

}
