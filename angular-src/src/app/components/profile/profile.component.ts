import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: Object;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  	this.authService.getPRofile().subscribe(profile=> {
  		this.user= profile.user;
  	},
  	err=> {
  		console.log(err);
  		return false;
  	})
  }

}
