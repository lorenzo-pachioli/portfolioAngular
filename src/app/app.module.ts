import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ElementByIdService } from './shared/services/element-by-id.service';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BackgroundAnimation } from "./core/background-animation/background-animation";
import { BackgroundAnimationCanvas } from "./core/background-animation-canvas/background-animation-canvas";
import { WelcomeComponent } from './core/welcome/welcome.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    CommonModule,
    MatIconModule,
    TranslateModule.forRoot(),
    BackgroundAnimation,
    BackgroundAnimationCanvas,
    WelcomeComponent
  ],
  providers: [
    ElementByIdService,
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'en-US' },
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en-US',
      defaultLanguage: 'en-US'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
