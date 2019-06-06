import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Queue} from '../models/queue';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url = 'http://localhost:9428/api/queues/';

  public queue: Queue = {id:-1, name:"", queue:[]};
  public queue$: BehaviorSubject<Queue> = new BehaviorSubject(this.queue);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.getQueueByUser();
  }

  public getQueueByUser(){
    var userId;
    if (this.authenticationService.currentStudent !== (null || undefined)){
      userId = this.authenticationService.currentStudent.headTeacherId;
      console.log(userId);

    } else {
      userId = this.authenticationService.currentUserValue.id;
    }
    this.http.get<Queue[]>(this.url + userId)
      .subscribe(queues => {
        this.queue=queues[0];
        this.queue$.next(this.queue);
      });
  }

  public updateQueue(queue: Queue) {
    this.http.put(this.url + queue.id, {
      name: queue.name,
      queue: queue.queue
    }).subscribe(updatedQueue => {
      queue.queue = updatedQueue['queue'];

      this.queue$.next(this.queue);
    });
  }
}
