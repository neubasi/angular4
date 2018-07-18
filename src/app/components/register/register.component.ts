import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email;
  password;

  constructor(
    private authService: AuthService,
    private flash: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.register(this.email, this.password)
    .then(resolve => {
      this.flash.show("Du bist nun registriert", {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/'])
    })
    .catch(err => {
      this.flash.show(err.messages, {
        cssClass: 'alert-danger', timeout: 4000
      });
    })
  }

}
