import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  currentUser: User = {
    id:0,
    username: '',
    password: ''
  };
  message = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    console.log("UserDetailsComponent: constructor");
    this.currentUser.id= this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log("UserDetailsComponent: ngOnInit");
    this.message = '';
    this.getUser(this.route.snapshot.params['id']);

  }
  getUser(id: string): void {
    console.log("UserDetailsComponent: getUser");
    this.userService.getUser(Number(id))
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  updateUser(): void {
    console.log("UserDetailsComponent: updateUser");
    this.message = '';

    this.userService.updateUser( this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    console.log("UserDetailsComponent: deleteUser");
    this.userService.deleteUser(Number(this.currentUser.id))
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }
}
