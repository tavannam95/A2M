import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RoomsModule } from './page/rooms/rooms.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AccountModule } from './page/account/account.module';
import { ToastrModule } from 'ngx-toastr';
import { CustomerLayoutComponent } from './layouts/customer/customer-layout/customer-layout.component';
import { TestCookieComponent } from './page-user/test-cookie/test-cookie.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    RoomsModule,
    MatAutocompleteModule,
    NgxDropzoneModule,
    AccountModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true,
      progressBar: true,
      timeOut: 2500,
      resetTimeoutOnDuplicate: true
    }),
    MatAutocompleteModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CustomerLayoutComponent,
    TestCookieComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
