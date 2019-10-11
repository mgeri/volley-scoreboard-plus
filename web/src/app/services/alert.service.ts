import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AlertService {

  constructor() {
  }

  showError(error: any) {
    if (error) {
      if (typeof error === 'string') {
        Swal.fire('Oops...', error, 'error');
        return;
      }
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          Swal.fire('Oops...', error.error.message, 'error');
          return;
        }
        if (error.error && error.error.error && error.error.error.message) {
          Swal.fire('Oops...', error.error.error.message, 'error');
          return;
        }
        // server-side error
        Swal.fire('Oops...', `${error.statusText} (${error.status})`, 'error');
        return;
      }
    }

    Swal.fire('Oops...', 'Something bad happened; please try again later.', 'error');
  }

}
