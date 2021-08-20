import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Hero } from './hero'


describe('HeroService', () => {
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return heroes', async() => {
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
    ];
    service.getHeroes().then(heroes => {
      expect(heroes).toEqual(mockHeroes)
    });
    const req = httpTestingController.expectOne('http://localhost:8081');
    expect(req.request.method).toEqual('GET');
    req.flush(mockHeroes);
  });

  it('should return hero', async() => {
    const mockHero = new Hero(16, 'Magneto');
    service.getHero(16).then(hero => {
      expect(hero).toEqual(mockHero)
    });
    const req = httpTestingController.expectOne('http://localhost:8081/16');
    expect(req.request.method).toEqual('GET');
    req.flush(mockHero);
  });

});
