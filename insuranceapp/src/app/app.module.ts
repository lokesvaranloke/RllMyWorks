import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UseraccountComponent } from './useraccount/useraccount.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'userdashboard/:userId', component: UserdashboardComponent},
  {path: 'useraccount/:userId', component: UseraccountComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserdashboardComponent,
    UseraccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // to work routing
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
