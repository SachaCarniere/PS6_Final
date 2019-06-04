import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Queue} from '../models/queue';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url = 'http://localhost:9428/api/queues/';

  private queue: Queue = {id:-1, name:"", queue:[]};

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.getQueueByUserId(this.authenticationService.currentUserValue.id);
  }

  public getQueueByUserId(id){
    this.http.get<Queue[]>(this.url + ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'))
      .subscribe(queues => {this.queue=queues[0];
      });
  }

  public getQueue(): Queue {
    return this.queue;
  }
}
