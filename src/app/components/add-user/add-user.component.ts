import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user: User = {
    username: '',
    password: '',
  };
  submitted = false;

  constructor(private userService: UserService) {
    console.log("AddUserComponent: constructor");

   }

  ngOnInit(): void {
    console.log("AddUserComponent: ngOnInit");

  }
  saveUser(): void {
    console.log("AddUserComponent: saveUser");
    const data = {
      username: this.user.username,
      password: this.user.password
    };

    this.userService.addUser(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newUser(): void {
    console.log("AddUserComponent: newUser");
    this.submitted = false;
    this.user = {
      username: '',
      password: ''
    };
  }


}
