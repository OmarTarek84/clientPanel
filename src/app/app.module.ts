import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import 'materialize-css';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth-data.service';
import { RegisterComponent } from './register/register.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsItemsComponent } from './clients/clients-items/clients-items.component';
import { ClientDetailsComponent } from './clients/clients-items/client-details/client-details.component';
import { SettingsComponent } from './settings/settings.component';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { AuthGuard } from './shared/auth.guard';
import { environment } from 'src/environments/environment';
import { ClientsService } from './shared/clients.service';
import { SettingsService } from './settings/settings.service';
import { UIService } from './auth/ui.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'clients/client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add-client', component: AddClientComponent, canActivate: [AuthGuard] },
  { path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClientsComponent,
    ClientsItemsComponent,
    ClientDetailsComponent,
    SettingsComponent,
    AddClientComponent,
    EditClientComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFontAwesomeModule
  ],
  providers: [AuthService, AuthGuard, ClientsService, SettingsService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
