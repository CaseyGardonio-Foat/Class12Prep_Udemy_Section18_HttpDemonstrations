import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post<{[key: string]: Post}>('https://class12-udemy18-19-default-rtdb.firebaseio.com/class12-udemy18-19-default-rtdb/class12-udemy18-19-default-rtdb.json', postData)
    .subscribe(responseData=>{
        console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
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
      .subscribe(posts =>{
      console.log(posts);
    });
  }
}
