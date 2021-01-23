import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model'
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSubscription: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
      this.isFetching = false;
    });
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
    this.onFetchPosts();
  }

  onFetchPosts() {
    this.isFetching = true;
    // call posts.service.ts to Send Http request
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
      this.isFetching = false;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.clearPosts().subscribe(()=>{
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
    
}
