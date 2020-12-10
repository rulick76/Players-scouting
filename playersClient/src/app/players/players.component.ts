import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayersService } from '../services/players-service.service';
import { Player } from '../models/player' ;
import {MaterialModule} from '../modules/material-module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: '',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit  {
  playersList: Player[];
  displayedColumns = ['player_name', 'player_birthday', 'league', 'player_club', 'player_role', 'player_shirt_number', 'star'];
  dataSource = new MatTableDataSource<Player>(); //this.playersList
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private playersService: PlayersService)
  { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    if (!sessionStorage.getItem('players')) {
        this.playersService.getPlayers().subscribe((data: {}) => {
          this.dataSource.data = data as Player[] ;
          this.playersList = data as Player[] ;
          sessionStorage.setItem('players', JSON.stringify(data));
        });
    }else{
      this.dataSource.data = JSON.parse(sessionStorage.getItem('players'));
    }
  }

}



