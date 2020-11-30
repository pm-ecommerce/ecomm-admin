import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtJsService {
  public sidebar(mode: string) {
    (window as any).App.sidebar(mode);
  }

  public init() {
    (window as any).App.init();
  }
}
