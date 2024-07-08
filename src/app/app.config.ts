import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideEchartsCore } from 'ngx-echarts';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import echarts from './shared/echarts/echarts.config';
import { routes } from './app-routing.module';

// import { provideHttpClient, withInterceptors } from '@angular/common/http';

// import { MatLegacyDialogModule } from '@angular/material/legacy-dialog';
// import { MatLegacySnackBarModule } from '@angular/material/legacy-snack-bar';
// import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
// import { routes } from './app.routes';

// import oktaAuth from './shared/okta/okta.config';
// import { errorInterceptor } from './shared/services/error.Interceptor';
// import { jwtInterceptor } from './shared/services/jwt.interceptor';




import { Component } from '@angular/core';

const socketIoConfig: SocketIoConfig = {
    url: environment.socketEndpoint,
    options: { autoConnect: false },
  };
  
  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes, withComponentInputBinding()),
      // { provide: OKTA_CONFIG, useValue: { oktaAuth } },
      importProvidersFrom([        
        MatSnackBarModule,
        MatDialogModule,
        // OktaAuthModule,
        // MatLegacyDialogModule,
        // MatLegacySnackBarModule,
        SocketIoModule.forRoot(socketIoConfig),
      ]),
      // provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
      provideAnimations(),
      provideEchartsCore({ echarts }),
    ],
  };