import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HeroesComponent } from './heroes.component';
import { SnackBarService } from '../snack-bar.service';
import { HeroService } from '../hero.service';
import { Hero } from '../hero'
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';


describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  const mockHeroes: Hero[] = [
    {
      id: 14,
      name: 'Magneto'
    }, 
    {
      id: 15,
      name: 'quicksilver'
    },
    {
      id: 16,
      name: 'iron man'
    }
  ]

  let heroService: jasmine.SpyObj<HeroService>;
  let snackBarService: jasmine.SpyObj<SnackBarService>;
  

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    snackBarService = jasmine.createSpyObj('SnackBarService', ['showError']);

    snackBarService.showError.and.returnValue();
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ HeroesComponent, RouterLinkDirectiveStub ],
      providers: [
        {provide: SnackBarService, useValue: snackBarService},
        {provide: HeroService, useValue: heroService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it('should create component', async() => {
    heroService.getHeroes.and.returnValue(Promise.resolve(mockHeroes));
    await fixture.detectChanges();
    expect(heroService.getHeroes).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
  });

  it('should represent correct information about heroes', async() => {
    heroService.getHeroes.and.returnValue(Promise.resolve(mockHeroes));
    await fixture.detectChanges();
    fixture.detectChanges();
    const heroes = fixture.debugElement.queryAll(By.css('a'));
    expect(heroes.length).toBe(mockHeroes.length);
    const resultSet = mockHeroes.map(hero => `${hero.id} ${hero.name}`);
    for(let hero of heroes){
      expect(resultSet).toContain(hero.nativeElement.innerText);
    }
  })

  it('should navigate to a hero page when click a hero link', async() => {
    heroService.getHeroes.and.returnValue(Promise.resolve(mockHeroes));
    await fixture.detectChanges();
    fixture.detectChanges();
    let heroesLinks = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    let routerLinks = heroesLinks.map(link => link.injector.get(RouterLinkDirectiveStub));
    for(let linkId = 0; linkId < mockHeroes.length; linkId++){
      heroesLinks[linkId].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(routerLinks[linkId].navigatedTo).toBe(`/detail/${mockHeroes[linkId].id}`);
    }
  })
  
  it('should call snackBar on a server exception', async() => {
    const error = new HttpErrorResponse({error: 'server error', status: 500})
    heroService.getHeroes.and.throwError(error);
    await fixture.detectChanges();
    expect(snackBarService.showError).toHaveBeenCalledWith(error);
  })

});
