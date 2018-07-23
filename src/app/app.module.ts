import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsModule } from "@ngxs/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ExpansibleMenuComponent } from "./components/expansible-menu/expansible-menu.component";
import { ChartVisualisationComponent } from './containers/chart-visualisation/chart-visualisation.component';
import { HeaderComponent } from "./containers/header/header.component";
import { HomeComponent } from "./containers/home/home.component";
import { TransactionsService } from "./services/transactions.service";
import { appStates } from "./store/state";
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ChartCanvasComponent } from './components/chart-canvas/chart-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    ExpansibleMenuComponent,
    HeaderComponent,
    ChartVisualisationComponent,
    LoadingSpinnerComponent,
    ChartCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    NgxsModule.forRoot(appStates),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [TransactionsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
