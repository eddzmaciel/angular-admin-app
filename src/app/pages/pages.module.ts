import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//custom modules
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

//internal components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaOneComponent } from './grafica-one/grafica-one.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

//material for test
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficaOneComponent,
    PagesComponent,
    AccountSettingsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    //material for test
    MatSliderModule,
    MatTooltipModule,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficaOneComponent,
    PagesComponent,
    AccountSettingsComponent,
  ],
})
export class PagesModule {}
