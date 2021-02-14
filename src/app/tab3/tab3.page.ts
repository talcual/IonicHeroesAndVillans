import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { ApiService } from "../services/api.service";
import { VillanoModel } from "../models/villano.model";
import { AddPage } from './add/add.page';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  villanos: VillanoModel[] = [];
  cargando = true;

  constructor( private _api: ApiService, public modalController: ModalController, public toastController: ToastController) { }

  ngOnInit(): void {
    this._api.getVillanos().subscribe(resp => {
      this.villanos = resp;
      this.cargando = false;
    });
  }

  async addVillanoForm(){
    const modal = await this.modalController.create({
      component: AddPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
  }

  addFavoritos(id: string){
    this._api.getVillano(id).subscribe(resp => {
        this._api.addFavoritos(resp).subscribe(resp => {
          this.presentToast('Agregado a Favoritos.');
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
