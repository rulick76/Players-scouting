
import {Component, OnInit} from '@angular/core';
import { Player } from '../models/player' ;
import { Filter } from '../models/filter';
import { MatButtonModule } from '@angular/material/button';
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';
import 'lodash';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { PlayersService } from '../services/players-service.service';

@Component({
  selector: 'dropdown',
  templateUrl: 'dropdown.component.html',
})

export class DropdownComponent  implements OnInit {
  fieldlist: string[];
  usedFields: string[];
  playersList: Player[];
  filterList: Filter[];
  filterCount: string;
  value: number;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  constructor(private playersService: PlayersService) {

  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('filters')) {
        this.filterList = [];
        const players = JSON.parse(sessionStorage.getItem('players')) as Player[];
        for (let [key , value] of Object.entries(players[0])) {
            if (!isNaN(value) && value != null){
              const simpleFilter = {} as Filter;
              simpleFilter.key = key;
              simpleFilter.value = value;
              // tslint:disable-next-line: prefer-const
              let sortedByKey = players.sort(
                // tslint:disable-next-line: only-arrow-functions
                function (a, b) {
                  return parseFloat(b[key]) - parseFloat(a[key]);
                });
              simpleFilter.maxValue = sortedByKey[0][key] != null ? sortedByKey[0][key] : '0' ;
              simpleFilter.minValue = sortedByKey[players.length - 1][key]  != null ? sortedByKey[players.length - 1][key] : '0' ;
              simpleFilter.isActive = false;
              this.filterList.push(simpleFilter);
            }
          }
        sessionStorage.setItem('filters', JSON.stringify(this.filterList));
        }
    this.filterList = JSON.parse(sessionStorage.getItem('filters')) as Filter[];
  }

  disableOption(field: string){
    return this.filterList.filter(con => con.key === field)[0].isActive === true;
  }

  setRange(itemList){
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.floor = this.filterList.filter(con => con.key === itemList)[0].minValue;
    newOptions.ceil = this.filterList.filter(con => con.key === itemList)[0].maxValue;
    this.options = newOptions;
  }

  applyFilter(appliedFilter: string) {
    this.filterList = JSON.parse(sessionStorage.getItem('filters')) as Filter[];
    this.filterList.filter(con => con.key === appliedFilter)[0].isActive = true;
    this.playersList = JSON.parse(sessionStorage.getItem('players')) as Player[];
    this.filterList.forEach(element => {
        if (element.isActive){
            this.playersList = this.playersList.filter(con => con[element.key] >= element.minValue && con[element.key] <= element.maxValue);
        }
    });
    sessionStorage.setItem('players', JSON.stringify(this.playersList));
    sessionStorage.setItem('filters', JSON.stringify(this.filterList));
    window.location.reload();
  }
}

