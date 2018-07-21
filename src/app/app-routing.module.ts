import { TransactionGuard } from './guards/transaction.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { ChartVisualisationComponent } from './containers/chart-visualisation/chart-visualisation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'chart',
    component: DashboardComponent,
    children: [
      {
        path: ':year/:month/:day',
        component: ChartVisualisationComponent,
        canActivate: [ TransactionGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
