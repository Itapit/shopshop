import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NavbarModule } from "./navbar/navbar-module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), NavbarModule, BrowserAnimationsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [AppComponent],
})
export class AppModule {}
