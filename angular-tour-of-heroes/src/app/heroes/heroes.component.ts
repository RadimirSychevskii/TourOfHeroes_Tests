import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { SnackBarService } from '../snack-bar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;


  constructor(
    private heroService: HeroService,
    private snackBarService: SnackBarService
  ) { }

  async getHeroes(): Promise<void> {
    try{
      this.heroes = await this.heroService.getHeroes();
      console.log(this.heroes.length)
    }
    catch(e){
      this.snackBarService.showError(e);
    }
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
