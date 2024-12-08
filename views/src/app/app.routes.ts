import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
export const routes: Routes = [
    // {
    //     path: 'first-component',
    //     component: FirstComponent, // this is the component with the <router-outlet> in the template
    //     title "bbb"
    //     children: [
    //       {
    //         title: resolvedChildATitle,
    //         path: 'child-a', // child route path
    //         component: ChildAComponent, // child route component that the router renders
    //       },
    //       {
    //         path: 'child-b',
    //         component: ChildBComponent, // another child route component that the router renders
    //       },
    //     ],
    //   },
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: '**', component: PageNotFoundComponent }, 
];



