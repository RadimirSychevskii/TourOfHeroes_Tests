import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  async getHeroes(): Promise<void> {
    try{
      await this.heroService.getHeroes()
        .then(heroes => this.heroes = heroes.slice(0, 4));
    }
    catch(e){
      this.snackBarService.showError(e)
    }
  }
}