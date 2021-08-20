import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private snackBarService: SnackBarService
  ) { }
  
  ngOnInit(): void {
    this.snackBarService.showError(new Error('Wrong path!'));
  }
}
