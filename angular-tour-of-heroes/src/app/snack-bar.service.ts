import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseError } from './responseError';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  showError(error: Error) {
    let message = error.message;
    if(error instanceof HttpErrorResponse) {
      const httpError = error as HttpErrorResponse;
      message = `${httpError.status} ${httpError.error ? httpError.error : 'Unknown error!'}`;
    }
    this.snackBar.open(message, 'Done', {duration: 2000});
  }
}
