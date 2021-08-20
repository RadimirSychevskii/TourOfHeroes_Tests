import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { SnackBarService } from '../snack-bar.service';
import { HeroService } from '../hero.service';
import { Hero } from '../hero'
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http'

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
  let snackBarService: jasmine.SpyObj<SnackBarService>

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    snackBarService = jasmine.createSpyObj('SnackBarService', ['showError']);
    snackBarService.showError.and.returnValue();
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ DashboardComponent ],
      providers: [
        {provide: SnackBarService, useValue: snackBarService},
        {provide: HeroService, useValue: heroService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
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
    const resultSet = mockHeroes.map(hero => ` ${hero.name} `);
    for(let hero of heroes) {
      expect(resultSet).toContain(hero.nativeElement.textContent);
    }
  })

  it('should call snackBar on a server exception', async() => {
    const error = new HttpErrorResponse({error: 'server error', status: 500})
    await heroService.getHeroes.and.throwError(error);
    await fixture.detectChanges();
    expect(snackBarService.showError).toHaveBeenCalledWith(error);
  })
});
