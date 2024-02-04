import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


/*
 * new component, contacts, do --dry-run first
   * this one to just show table
 *
 * start by putting Sushi from input on, do this in app.component
    * with standalone comps, only import what you need once in template (not even module)
    *
 * - remove sushi
 *
 * - make app component only call contacts
 *
 * - now add table with necessary columns and a single row of hardcoded data
 *
 * - now for service:
     * create contacts service stub
     * inject in contacts components
     * fix error with provideHttpModule
     *
     * implement all()
       * try url in browser make sure data comes back
       * if cors is missing, add it to bootstrap of backend
       * method looks like below after declaring const URL = ...3000/contacts
          all(): Observable<ContactInterface[]> {
            return this.http.get<ContactInterface[]>(URL);
          }

       * in component in ngOnInit(), this.dataSource = this.service.all(); see table!

     * implement delete()
       * could do some error handling, like, catchError in the pipe (gotta subscribe)
       * after deleting, update dataSource
 *
 *
 *
 */
