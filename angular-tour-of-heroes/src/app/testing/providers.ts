import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { SnackBarService } from '../snack-bar.service';
import { NgModel } from '@angular/forms';

let heroService: jasmine.SpyObj<HeroService>;
let activatedRoute: jasmine.SpyObj<ActivatedRoute>; 
let snackBarService: jasmine.SpyObj<SnackBarService>;

let snapshotReturnValue: number|string;

let activatedRouteMock: object = {
    snapshot: {
      paramMap: {
        get(id: number):number|string {
          return snapshotReturnValue;
        } 
      }
    }
  };

heroService = jasmine.createSpyObj('HeroService', ['getHero']);
snackBarService = jasmine.createSpyObj('SnackBarService', ['showError']);
activatedRoute = jasmine.createSpyObj('ActivatedRoute', [], activatedRouteMock);

export const providers = [
    {provide: ActivatedRoute, useValue: activatedRoute},
    {provide: HeroService, useValue: heroService},
    {provide: Location, useValue: {}},
    {provide: SnackBarService, useValue: snackBarService},
    {provide: NgModel},
]