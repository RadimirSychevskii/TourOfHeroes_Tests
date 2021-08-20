import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { SnackBarService } from '../snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StatusTextError } from '../responseError';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private snackBarService: SnackBarService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('initiation')
    await this.getHero()
    console.log(this.hero?.name)
  }
  
  async getHero(): Promise<void> {
    try{
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if(isNaN(id)){
        //todo change error message (show what we got in id)
        throw new Error(`Expected to get hero Id, but got ${id} instead`);
      }
      this.hero = await this.heroService.getHero(id);
    }
    catch(e){
      this.snackBarService.showError(e);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
