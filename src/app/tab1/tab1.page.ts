import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

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

  constructor( private _api: ApiService, public modalController: ModalController, public toastController: ToastController) { }

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

  addFavoritos(id: string){
      this._api.getHeroe(id).subscribe(resp => {
          this._api.addFavoritos(resp).subscribe(resp => {
            this.presentToast('Heroe agregado a favoritos!')
          })
      });
  }

  async presentToast(texto:string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }


}
