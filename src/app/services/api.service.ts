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
  private url = 'https://beermagazine-622c3.firebaseio.com/';


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

  addFavoritos(favorito: any) {
    return this._http.post(`${this.url}/favoritos.json`, favorito).pipe(
      map((resp: any) => {

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

  actualizarVillano(villano: VillanoModel) {
    const villanoTemp = {
      ...villano
    }

    delete villanoTemp.id;
    return this._http.put(`${this.url}/heroe/${villano.id}.json`, villanoTemp);
  }
  

  // Borrar Heroe
  borrarHeroe(id: string) {
    return this._http.delete(`${this.url}/heroe/${id}.json`);
  }

  // Borrar Villano
  borrarVillano(id: string) {
    return this._http.delete(`${this.url}/villano/${id}.json`);
  }
  

  // Getters
  getHeroe(id: string) {
    return this._http.get(`${this.url}/heroe/${id}.json`);
  }

  getVillano(id: string) {
    return this._http.get(`${this.url}/villano/${id}.json`);
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


  // Get Favoritos

  getFavoritos() {
    return this._http.get(`${this.url}/favoritos.json`).pipe(
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
