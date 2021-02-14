import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HeroeModel } from "../models/heroe.model";
import { VillanoModel } from "../models/villano.model";



import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private _http: HttpClient) { }
  private url = 'firebaseurlrealtime';


  // CREADORES 
  crearHeroe(heroe: HeroeModel) {
    return this._http.post(`${this.url}/heroe.json`, heroe).pipe(
      map((resp: any) => {
        console.log(resp);
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  crearVillano(villano: VillanoModel) {
    return this._http.post(`${this.url}/villano.json`, villano).pipe(
      map((resp: any) => {
        console.log(resp);
        villano.id = resp.name;
        return villano;
      })
    );
  }


  // ACTUALIZADORES
  actualizarHereo(heroe: HeroeModel) {
    
    const heroeTemp = {
      ...heroe
    }

    delete heroeTemp.id;

    return this._http.put(`${this.url}/heroe/${heroe.id}.json`, heroeTemp);

  }
 
  borrarHeroe(id: string) {
    return this._http.delete(`${this.url}/heroe/${id}.json`);
  }
  

  getHeroe(id: string) {
    return this._http.get(`${this.url}/heroe/${id}.json`);
  }

  getHeroes() {
    return this._http.get(`${this.url}/heroe.json`).pipe(
      map(this.crearArreglo)
    );
  }

  getVillanos() {
    return this._http.get(`${this.url}/villano.json`).pipe(
      map(this.crearArreglo)
    );
  }

  private crearArreglo(heroesOBJ: object) {
    
    const heroes: HeroeModel[] = [];

    if (heroesOBJ === null) { return []; }

    Object.keys(heroesOBJ).forEach(key => {
      const heroe: HeroeModel = heroesOBJ[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    if (heroesOBJ === null) { return []; }
    return heroes.reverse();

  }


}
