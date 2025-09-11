import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {

  loading = false;
  error = false;
  success = false;
  name = new FormControl('', Validators.minLength(2));
  email = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  ]));
  message = new FormControl('', Validators.compose([
    Validators.minLength(5),
    Validators.maxLength(256)
  ]));
  newEmail = new FormGroup({
    name: this.name,
    email: this.email,
    message: this.message
  });

  constructor() { }

  ngOnInit(): void {
  }

  sendEmail(event: HTMLFormElement, formDirective: FormGroupDirective): any {

    if (this.newEmail.valid) {
      this.loading = true;
      emailjs.sendForm(environment.service_id, environment.template_id, event, environment.public_key)
        .then((result) => {
          if (result.status === 200) {
            this.loading = false;
            this.success = true;
            formDirective.resetForm();
            this.newEmail.reset();
            setTimeout(() => {
              this.success = false;
            }, 1500);
          }
        }, (error) => {
          console.error(error);
          this.loading = false;
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 1500);
        });
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.errors ? 'Not a valid email' : '';
  }
}
