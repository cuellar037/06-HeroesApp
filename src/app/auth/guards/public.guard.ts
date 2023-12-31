import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { CanMatch, CanActivate, Router, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{


  constructor(
    private authService:AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAutentication()
    .pipe(
      tap( isAuthenticated => {
        if(isAuthenticated) {
          this.router.navigate(['./'])
        }
      }),
      map( isAuthenticated => !isAuthenticated)
    )

  }
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
  return this.checkAuthStatus();

  }



}
