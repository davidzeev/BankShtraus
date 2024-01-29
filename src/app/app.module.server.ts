import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { MainModule } from './modules/main/main.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [

  ],
  imports: [
    AppModule,
    ServerModule,
    SharedModule,
    MainModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
