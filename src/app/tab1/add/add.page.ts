import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HeroeModel } from '../../models/heroe.model';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  heroe: HeroeModel = {
    id:'',
    nombre:'',
    poder:'',
    vivo:true,
    img:''
  };

  constructor(public modalCtrl: ModalController, public _api: ApiService) { }

  ngOnInit() {
  }

  addHeroe(){
    this._api.crearHeroe(this.heroe).subscribe((resp: HeroeModel) => {
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
