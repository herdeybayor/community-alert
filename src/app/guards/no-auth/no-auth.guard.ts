import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuthenticationService } from '@app/services';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const user = await this.firebaseAuthenticationService.getCurrentUser();
    console.log('NoAuthGuard', user);
    if (user) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
