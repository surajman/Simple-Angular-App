import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ColumnDetailsComponent } from './column-details/column-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/landingPage', pathMatch: 'full' },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'detailPage/:id', component: DetailComponent },
  { path: 'columnDetails/:value/:name/:type/:required/:defaultValue/:minLength/:maxLength/:min/:max', component: ColumnDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
