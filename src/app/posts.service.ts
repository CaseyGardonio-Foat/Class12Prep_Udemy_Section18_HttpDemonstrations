import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService{
  constructor(private http: HttpClient) {}

  error = new Subject<string>();

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    // Send Http request
    this.http.post<{[key: string]: Post}>('https://class12-udemy18-19-default-rtdb.firebaseio.com/class12-udemy18-19-default-rtdb/class12-udemy18-19-default-rtdb.json', postData)
    .subscribe(responseData=>{
        console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    return this.http
    .get<{[key: string]: Post}>('https://class12-udemy18-19-default-rtdb.firebaseio.com/class12-udemy18-19-default-rtdb/class12-udemy18-19-default-rtdb.json')
    .pipe(
      map(responseData =>{
        const postsArray: Post[] = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
            }
          }
        return postsArray;
      })
    )
  } 

  clearPosts() {
    return this.http.delete('https://class12-udemy18-19-default-rtdb.firebaseio.com/class12-udemy18-19-default-rtdb/class12-udemy18-19-default-rtdb.json');
  }
}