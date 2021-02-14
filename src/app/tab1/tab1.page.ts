import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ApiService } from "../services/api.service";
import { HeroeModel } from "../models/heroe.model";
import { AddPage } from "./add/add.page";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  heroes: HeroeModel[] = [];
  cargando = true;

  constructor( private _api: ApiService, public modalController: ModalController) { }

  ngOnInit(): void {
    this._api.getHeroes().subscribe(resp => {
      this.heroes = resp;
      this.cargando = false;
    });
  }

  borrarHeroe(heroe: HeroeModel, i: number) {
    this.heroes.splice(i, 1);
    this._api.borrarHeroe(heroe.id).subscribe();         
  }  

  async addHeroeForm(){
    const modal = await this.modalController.create({
      component: AddPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
    
  }

}
