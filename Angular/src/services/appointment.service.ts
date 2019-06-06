import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Queue} from '../models/queue';
import {BehaviorSubject} from 'rxjs';
import {Filter} from "../models/filter";
import {Countries, Status, Student} from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url = 'http://localhost:9428/api/queues/';

  public queue: Queue = {id:-1, name:"", queue:[]};
  public queue$: BehaviorSubject<Queue> = new BehaviorSubject(this.queue);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.getQueueByUserId(this.authenticationService.currentUserValue.id);
  }

  public getQueueByUserId(id){
    this.http.get<Queue[]>(this.url + ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'))
      .subscribe(queues => {
        this.queue=queues[0];
        this.queue$.next(this.queue);
      });
  }
  public updateQueue(queue: Queue) {
    this.http.put(this.url, {
      name: queue.name,
      queue: queue.queue
    }).subscribe(updatedQueue => {
      queue.queue = updatedQueue['queue'];

      this.queue$.next(this.queue);
    });
  }
}
