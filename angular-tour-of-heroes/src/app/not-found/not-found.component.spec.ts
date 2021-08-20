import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { SnackBarService } from '../snack-bar.service';


describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let snackBarService: jasmine.SpyObj<SnackBarService>;

  beforeEach(async () => {
    snackBarService = jasmine.createSpyObj('SnackBarService', ['showError']);
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      providers: [
        {provide: SnackBarService, useValue: snackBarService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call snackbar with message about wrong path', () => {
    fixture.detectChanges();
    const expectedError = new Error('Wrong path!');
    expect(snackBarService.showError).toHaveBeenCalledWith(expectedError);
  })
});
