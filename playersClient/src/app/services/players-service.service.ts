import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Player } from '../models/player';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlayersService  {

  private playersUrl = `${environment.apiUrl}/players`;
  playerList: Player[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient)
  {

  }

  private messageSource = new BehaviorSubject('Players');
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  // tslint:disable-next-line: typedef
   getPlayers() {
    return this.http.get(`${this.playersUrl}`, this.httpOptions);
  }
}


