import {AppError} from './app-error';
import {ErrorHandler} from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: AppError) {
    if (error.originalError && error.originalError.error) {
      // alert(error.originalError.error.message);
      // else
      //     alert('An unexpected error occured');
      console.log(error);
    }
  }
}
