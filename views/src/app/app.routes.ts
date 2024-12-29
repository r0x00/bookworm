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
import { UpdateBookComponent } from './update-book/update-book.component';
import { SearchComponent } from './search/search.component';
import { UpdateChapterComponent } from './update-chapter/update-chapter.component';

export const routes: Routes = [
    { 
        path: '', 
        component: DashboardComponent 
    },
    { 
        path: 'book/:id/view', 
        component: BookComponent,
    },
    {
        path: 'book/:id/update',
        component:  UpdateBookComponent,
    },
    {
        path: 'book/new',
        component: NewBookComponent,
    },
    {
        path: 'book/:bookId/chapter/:id',
        component: ChapterComponent,
    },
    {
        path: 'book/:bookId/new/chapter',
        component: NewChapterComponent
    },
    {
        path: 'chapter/:id/update',
        component: UpdateChapterComponent
    },
    {
        path: 'me',
        // title: resolvedChildATitle,
        component: MeComponent,
    },
    {
        path: 'search',
        component: SearchComponent,
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



