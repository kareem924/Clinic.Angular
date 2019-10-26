import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
    { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./components/auth/signup/signup.module').then(m => m.SignupModule) },
    {
        path: 'error',
        loadChildren: () => import('./components/application/server-error/server-error.module').then(m => m.ServerErrorModule)
    },
    {
        path: 'access-denied',
        loadChildren: () => import('./components/application/access-denied/access-denied.module').then(m => m.AccessDeniedModule)
    },
    { path: 'not-found', loadChildren: () => import('./components/application/not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
