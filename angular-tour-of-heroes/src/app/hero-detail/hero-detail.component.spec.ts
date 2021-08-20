import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { SnackBarService } from '../snack-bar.service';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';


describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;  

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

  let heroService: jasmine.SpyObj<HeroService>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>; 
  let snackBarService: jasmine.SpyObj<SnackBarService>;
  let location: jasmine.SpyObj<Location>;


  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', ['getHero']);
    snackBarService = jasmine.createSpyObj('SnackBarService', ['showError']);
    activatedRoute = jasmine.createSpyObj('ActivatedRoute', [], activatedRouteMock);
    location = jasmine.createSpyObj('Location', ['back']);
    snackBarService.showError.and.returnValue();
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ HeroDetailComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: HeroService, useValue: heroService},
        {provide: Location, useValue: location},
        {provide: SnackBarService, useValue: snackBarService},
        {provide: NgModel},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    snapshotReturnValue = 1;
  });

  it('should create component', () => {
    const mockHero = new Hero(14, 'Magneto');
    heroService.getHero.and.returnValue(Promise.resolve(mockHero));
    expect(component.hero).toEqual(undefined);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(heroService.getHero).toHaveBeenCalledTimes(1);
  });

  it('should initialise hero with correct data', async() => {
    const mockHero = new Hero(14, 'Magneto');
    heroService.getHero.and.returnValue(Promise.resolve(mockHero));
    await fixture.detectChanges();
    fixture.detectChanges();
    const expectedHero = new Hero(14, 'Magneto');
    expect(component.hero).toEqual(expectedHero);
    expect(heroService.getHero).toHaveBeenCalledTimes(1);
  })

  it('page should represent correct hero information', async() => {
    const mockHero = new Hero(14, 'Magneto');
    heroService.getHero.and.returnValue(Promise.resolve(mockHero));
    await fixture.detectChanges();
    fixture.detectChanges();
    const h2 = fixture.debugElement.query(By.css('h2')).nativeElement;
    const heroId = fixture.debugElement.query(By.css('.heroId')).nativeElement;
    expect(h2.textContent).toEqual(`MAGNETO Details`);
    expect(heroId.textContent).toEqual(`id: 14`);
  })

  it('should call snackBar on a server error', async() => {
    const error = new HttpErrorResponse({error: 'server error', status: 500})
    heroService.getHero.and.throwError(error);
    await fixture.detectChanges();
    expect(snackBarService.showError).toHaveBeenCalledWith(error);
  })

  it('should call snackBar on a NaN exception', async() => {
    snapshotReturnValue = 'fff';
    await fixture.detectChanges();
    const expectedError = new Error(`Expected to get hero Id, but got NaN instead`);
    expect(snackBarService.showError).toHaveBeenCalledWith(expectedError);
  })

  //todo make test check goBack (use from component) (DONE)
  it('should emit trigger when button pressed', async() => {
    spyOn(component, 'goBack');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.goBack).toHaveBeenCalled();
  })

  it('should call location.back()', async() => {
    fixture.detectChanges();
    component.goBack();
    expect(location.back).toHaveBeenCalledTimes(1);
  })

  //fix me (DONE)
  it('should change title on input change', async() => {
    const mockHero = new Hero(14, 'Magneto');
    heroService.getHero.and.returnValue(Promise.resolve(mockHero));
    await fixture.detectChanges();
    fixture.detectChanges();
    const h2 = fixture.debugElement.query(By.css('h2')).nativeElement;
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'Super!'
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(h2.textContent).toEqual(`SUPER! Details`);
    console.log(component.hero?.name);
  })
});
