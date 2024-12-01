import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


// @Injectable({providedIn: 'root'})
// export class TemplatePageTitleStrategy extends TitleStrategy {
//   constructor(private readonly title: Title) {
//     super();
//   }
//   override updateTitle(routerState: RouterStateSnapshot) {
//     const title = this.buildTitle(routerState);
//     if (title !== undefined) {
//       this.title.setTitle(`My Application | ${title}`);
//     }
//   }
// }
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
//   ]
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(), 

  ]
};