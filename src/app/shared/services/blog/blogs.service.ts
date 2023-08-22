import { Injectable } from '@angular/core';
import { IBlog } from '../../interfaces/blog/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private blogs: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: new Date(2023, 8, 15, 10, 0),
      message: 'Sing up to create you account and start to use Angular Blog',
      
    },
  ]

  constructor() { }

  getBlogs(): Array<IBlog> {
    return this.blogs
  }

  addBlogs(blog: IBlog): void {
    this.blogs.push(blog)
  }
  deleteBlog(id: number): void {
    const index = this.blogs.findIndex((post) => post.id === id);
    this.blogs.splice(index, 1);
  }
  updateBlog(blog:IBlog, id:number):void{
    const index = this.blogs.findIndex((blog) => blog.id === id);
    this.blogs.splice(index, 1, blog);
 }
}
