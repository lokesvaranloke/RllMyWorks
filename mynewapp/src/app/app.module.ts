import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApplypolicyComponent } from './applypolicy/applypolicy.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PolicycrudComponent } from './policycrud/policycrud.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CreatepolicyComponent } from './createpolicy/createpolicy.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SendqueryComponent } from './sendquery/sendquery.component';
import { ViewqueriesComponent } from './viewqueries/viewqueries.component';
import { ApprovepolicyComponent } from './approvepolicy/approvepolicy.component';
import { ViewcustomersComponent } from './viewcustomers/viewcustomers.component';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'applypolicy/:userId', component: ApplypolicyComponent},
  {path: 'history/:userId', component: HistoryComponent},
  {path: 'policycrud', component: PolicycrudComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'userdashboard/:userId', component: UserdashboardComponent},
  {path: 'useraccount/:userId', component: UseraccountComponent},
  {path: 'contactus', component:ContactusComponent},
  {path: 'aboutus', component:AboutusComponent},
  {path: 'createpolicy', component: CreatepolicyComponent},
  {path:'admin-login', component:AdminLoginComponent},
  {path: 'updateprofile', component:UserdashboardComponent},
  {path: 'sendquery/:userId', component:SendqueryComponent},
  {path:'viewqueries', component:ViewqueriesComponent},
  {path:'approvepolicy', component:ApprovepolicyComponent},
  {path:'viewcustomers', component:ViewcustomersComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ApplypolicyComponent,
    HistoryComponent,
    HomeComponent,
    PolicycrudComponent,
    LoginComponent,
    SignupComponent,
    UseraccountComponent,
    UserdashboardComponent,
    CreatepolicyComponent,
    AdminLoginComponent,
    SendqueryComponent,
    ViewqueriesComponent,
    ApprovepolicyComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
