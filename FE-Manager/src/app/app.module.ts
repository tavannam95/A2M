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
import { ToastrModule } from 'ngx-toastr';

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
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true,
      progressBar: true,
      timeOut: 2500,
      resetTimeoutOnDuplicate: true
    }),
    MatAutocompleteModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
