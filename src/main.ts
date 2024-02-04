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
     * create service
 *
 *
 *
 */
