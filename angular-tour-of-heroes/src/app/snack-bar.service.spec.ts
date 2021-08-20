import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './snack-bar.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http'

describe('SnackBarService', () => {
  let service: SnackBarService;
  let mockSnackBar: { open: jasmine.Spy };

  beforeEach(() => {
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    service = new SnackBarService(mockSnackBar as any);
  });

  it('should open snackBar on HttpErrorResponse with error message', () => {
    const error = new HttpErrorResponse({error: 'test error', status: 500});
    service.showError(error);
    expect(mockSnackBar.open).toHaveBeenCalledWith(`500 test error`, 'Done', {duration: 2000});
  })

  it('should use default message on empty HttpErrorResponse message', () => {
    const error = new HttpErrorResponse({status: 500});
    service.showError(error);
    expect(mockSnackBar.open).toHaveBeenCalledWith(`500 Unknown error!`, 'Done', {duration: 2000});
  })

  it('should open snackBar with message on error', () => {
    const error = new Error('Wrong path!');
    service.showError(error);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Wrong path!', 'Done', {duration: 2000});
  })
});
