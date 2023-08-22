import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {
private users : Array<IUser> = [
  {id: 1,
  userName: 'admin',
  email: 'admin@gmail.com',
  password: '12345'}
];
  constructor() { }

getUsers():Array<IUser>{
  return this.users;
}
addUsers(user:IUser): void{
  this.users.push(user)
}
}
