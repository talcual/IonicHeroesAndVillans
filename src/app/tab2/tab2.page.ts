import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { HeroeModel } from "../models/heroe.model";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  favoritos: any[] = [];
  cargando = true;

  constructor( private _api: ApiService) { }
  
  ngOnInit(): void {
    this._api.getFavoritos().subscribe(resp => {
      this.favoritos = resp;
    });
  }

  ionViewDidEnter(): void{
    this._api.getFavoritos().subscribe(resp => {
      this.favoritos = resp;
    });
  }


}
