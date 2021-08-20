import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient) { }

  private heroesUrl = 'http://localhost:8081';

  getHeroes(): Promise<Hero[]> {
    const response =  this.http.get<Hero[]>(this.heroesUrl);
    console.log(response)
    return response.toPromise();
  }

  getHero(id: number): Promise<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).toPromise();
  }
  
}
