import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username: String;
	password: String;

	constructor(private authService: AuthService, private flashMessagesService: FlashMessagesService, private router: Router) { }

	ngOnInit() {
	}

	onLoginSubmit(){
		console.log(this.username);
		const user= {
			username: this.username,
			password: this.password
		}

		this.authService.authenticateUser(user).subscribe(data=> {
			console.log(data);
			if(data.success){
				this.authService.storeUserData(data.token, data.user);
				this.flashMessagesService.show('you are now Logged in', {
      classes: ['alert', 'alert-success'], // You can pass as many classes as you need
      timeout: 5000, // Default is 3000
  });
				this.router.navigate(['/dashboard']);
			}
			else{
				this.flashMessagesService.show(data.msg, {
      classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
      timeout: 5000, // Default is 3000
  });
				this.router.navigate(['/login']);
			}
		});
	}

}
