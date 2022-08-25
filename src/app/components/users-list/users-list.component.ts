import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  title = '';

  constructor(private userService: UserService) { 
    console.log("UsersListComponent : constructor ");
  }

  ngOnInit(): void {
    console.log("UsersListComponent : ngOnInit ");
    this.retrieveUsers();
    console.log("users after retrival ", this.users);
    
  }
  retrieveUsers(): void {
    console.log("retrieveUsers() : UsersListComponent");
    this.userService.getUsers()
      .subscribe(
        data => {
          console.log("UsersListComponent data block")
          this.users = data;
          console.log(data);
        },
        error => {
          console.log("UsersListComponent An error! block");
          console.log(error);
        }
        );
  }

  setActiveUser(user: User, index: number): void {
    console.log("UsersListComponent : setActiveUser ");
    this.currentUser = user;
    this.currentIndex = index;
  }
  

}
