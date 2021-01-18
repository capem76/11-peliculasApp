import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  
  
  onScroll(){
    const positionScroll = (document.documentElement.scrollTop || document.body.scrollTop) ;
    const positionMaxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) ;
    let endScroll: boolean = false;  
    let DOMRect = document.documentElement.getBoundingClientRect();
    const bottomMax: number = Number(DOMRect.bottom.toFixed());
    
    endScroll = (positionMaxScroll-positionScroll) === document.documentElement.clientHeight ? true : false;
    console.log(endScroll);
    

  }

  miMetodo(){
    console.log("dentro de helper");
    
  }
}
