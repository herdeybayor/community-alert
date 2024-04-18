import { Routes, mapToCanActivate } from '@angular/router';
import { NoAuthGuard, AuthGuard } from '@app/guards';

export const routes: Routes = [
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then((m) => m.IntroPage),
    // canActivate: mapToCanActivate([NoAuthGuard]),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
    canActivate: mapToCanActivate([NoAuthGuard]),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    canActivate: mapToCanActivate([NoAuthGuard]),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: mapToCanActivate([AuthGuard]),
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
];
