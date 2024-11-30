import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
    { path: 'login', component: LoginComponent },
    // { path: '',   redirectTo: '/first-component', pathMatch: 'full' }, 
    // { path: '**', component: PageNotFoundComponent }, 
];



