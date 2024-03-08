import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from './data.service';
import { CommentInterface } from '../Interface/comment.interface';
import { MessageInterface } from '../Interface/message.interface';

@Injectable({
  providedIn: 'root',
})

export class CommentService {

  constructor(private dataService: DataService) {
  }

  public getAllComments(): Observable<CommentInterface[]> {
    const url = "http://127.0.0.1:5000/attraction/comment";
    return this.dataService.getData(url) as Observable<CommentInterface[]>;
  }

  public getCommentsForAttraction(attractionId: number): Observable<CommentInterface[]> {
    const url = `http://127.0.0.1:5000/attraction/${attractionId}/comment`;
    return this.dataService.getData(url) as Observable<CommentInterface[]>;
  }

  public addComment(comment: CommentInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/attraction/comment";
    return this.dataService.postData(url, comment) as Observable<MessageInterface>;
  }

  public deleteComment(commentId: number): Observable<MessageInterface> {
    const url = `http://127.0.0.1:5000/attraction/comment/${commentId}`;
    return this.dataService.deleteData(url) as Observable<MessageInterface>;
  }
}