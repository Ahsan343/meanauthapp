import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'; 
import { FlashMessagesService } from 'ngx-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	name: String;
	username: String;
	email: String;
	password: String;

  constructor(private ValidateService: ValidateService, private flashMessagesService: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
  	const user= {
  		name: this.name,
  		email: this.email,
  		username: this.username,
  		password: this.password
  	}

  	if(!this.ValidateService.validateRegister(user)){
  		console.log('Please fill in all fields');
      this.flashMessagesService.show('Please fill in all fields', {
      classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000
    });
  		return false;
  	}

  	if(!this.ValidateService.validateEmail(user.email)){
  		console.log('Please used a valid email');
      this.flashMessagesService.show('Please used a valid email', {
      classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000
    });
  		return false;
  	}

    this.authService.registerUser(user).subscribe(data=> {
      if(data.success){
        this.flashMessagesService.show('You are now registered and can log in', {
      classes: ['alert', 'alert-success'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000
    });
        this.router.navigate(['/login']);
      }
      else{
        this.flashMessagesService.show('You are not registered something went wrong', {
      classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000
    });
        this.router.navigate(['/register']);
      }
    });

  }

}
