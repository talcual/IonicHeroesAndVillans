import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VillanoModel } from '../../models/villano.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  villano: VillanoModel = {
    id:'',
    nombre:'',
    poder:'',
    vivo:true,
    img:''
  };

  constructor(public modalCtrl: ModalController, public _api: ApiService) { }

  ngOnInit() {
  }


  addVillano(){
    this._api.crearVillano(this.villano).subscribe((resp: VillanoModel) => {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    });
  }

  closing(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }



}
