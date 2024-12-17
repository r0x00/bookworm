import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookComponent } from './book/book.component';
import { NewBookComponent } from './new-book/new-book.component';
import { ChapterComponent } from './chapter/chapter.component';
import { NewChapterComponent } from './new-chapter/new-chapter.component';
import { MeComponent } from './me/me.component';

export const routes: Routes = [
    { 
        path: '', 
        component: DashboardComponent 
    },
    { 
        path: 'book/:id', 
        component: BookComponent,
    },

    {
        path: 'book/new',
        component: NewBookComponent,
    },
    {
        path: 'chapter',
        component: ChapterComponent,
    },
    {
        path: 'chapter/new',
        component: NewChapterComponent
    },
    {
        path: 'me',
        // title: resolvedChildATitle,
        component: MeComponent,
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'signup', 
        component: SignUpComponent 
    },
    { 
        path: '**', 
        component: PageNotFoundComponent 
    }, 
];



