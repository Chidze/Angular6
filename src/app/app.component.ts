import { Component, OnInit } from '@angular/core';
import { IBlog } from './shared/interfaces/blog/blog.interface';
import { IUser } from './shared/interfaces/user/user.interface';
import { BlogsService } from './shared/services/blog/blogs.service';
import { UsersService } from './shared/services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lesson6';

  public blogs: Array<IBlog> = [];
  public users: Array<IUser> = [];
  public emailIn!: string;
  public emailUp!: string;
  public passwordIn!: string;
  public passwordUp!: string;
  public login!: string;
  public checkE = false;
  public checkP = false;
  public postedBy!: string;
  public admin = false;
  public user = false;
  public falseUser = false;
  public addTitle !: string;
  public addText!: string;
  public id = 0;
  public edit = false;
  public post = {
    title: '',
    text: '',
  };

  constructor(
    private userService: UsersService,
    private blogService: BlogsService
  ) { }
  ngOnInit(): void {
    this.getBlog();
    this.getUser()
  }
  getBlog(): void {
    this.blogs = this.blogService.getBlogs();
  }
  getUser(): void {
    this.users = this.userService.getUsers();
  }
  addBlog(): void {
    if (!this.addTitle || !this.addText) {
      alert('Введіть дані');
    }
    else {
      if (this.blogs.length > 0) {
        this.id = this.blogs.slice(-1)[0].id
      }
      const newBlog = {
        id: this.id + 1,
        postedBy: this.postedBy,
        date: new Date,
        topic: this.addTitle,
        message: this.addText
      }
      this.blogService.addBlogs(newBlog);
      this.addTitle = '';
      this.addText = '';
    }
  }
  
  signIn(): void {
    for (let value of this.users) {
     if (value.email === this.emailIn && value.password === this.passwordIn) {
    this.login = value.userName;
    this.falseUser = false;
    if (this.login === 'admin') {
              this.admin = true;
              this.user = false;
              return;
            }
            else {
              this.user = true;
              this.admin = false;
              return;
            }
      }
      else{
       this.falseUser = true;
      }
    }
      this.emailIn = '';
      this.passwordIn = '';
      if(this.falseUser){
        alert('Такого користувача не існує')
      }
    }
  
  signOut(): void {
    this.user = false;
    this.admin = false;
    this.emailIn = '';
    this.passwordIn  = '';
    this.login = '';
    this.emailUp = '';
    this.passwordUp = '';
  }

  signUp() {
    let unique = this.users.some(
      (user) => user.email === this.emailUp || user.userName === this.login);
    let nameRegExp = /[a-zA-Z]{3,12}/i;
    let passwordRegExp = /^[\w_\-\.]{4,16}$/i;
    let emailRegExp = /^[\w\-\.]{1,}@[a-z]{1,}\.[a-z]{1,}$/i;
    if (nameRegExp.test(this.login) &&
      emailRegExp.test(this.emailUp) &&
      passwordRegExp.test(this.passwordUp) && !unique
    ) {
      this.user = true;
      if (this.users.length > 0) {
        this.id = this.users.slice(-1)[0].id  
      }
      const newUser = {
        id: this.id+1,
        userName: this.login,
        email: this.emailUp,
        password: this.passwordUp,
      };
      this.userService.addUsers(newUser);
      this.postedBy = this.login;
    } 
   else{
    alert ('Некоректно заповнені поля')
   } 
  }
  adminEdit(choise: IBlog): void {
    this.post.title = choise.topic;
    this.post.text = choise.message;
    this.id = choise.id;
    console.log(choise.topic, choise.message)
  }
  updateBlog(): void {
    if (!this.post.title || !this.post.text) {
      console.log(this.post.title, this.post.text);
      alert('Введіть дані');
    }
    else {
      const upBlog = {
        id: this.id,
        postedBy: this.login,
        topic: this.post.title,
        date: new Date(),
        message: this.post.text
      };
      this.blogService.updateBlog(upBlog, this.id);
    }
  }
  adminDelete(choise: IBlog): void {
    this.blogService.deleteBlog(choise.id);
  }
}