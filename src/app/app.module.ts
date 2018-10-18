import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemHeroService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TableComponentComponent } from './table-component/table-component.component';
import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { DetailComponent } from './detail/detail.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TableComponentComponent,
    ConfirmationBoxComponent,
    DetailComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemHeroService),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    InMemHeroService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
