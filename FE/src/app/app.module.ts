import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDropzoneModule } from 'ngx-dropzone'
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TestCookieComponent } from './page-user/test-cookie/test-cookie.component';
import { CustomerLayoutComponent } from './layouts/customer/customer-layout/customer-layout.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RoomsModule } from './page/rooms/rooms.module';
import { AccountModule } from './page/account/account.module';
import { httpInterceptorProviders } from './interceptor/http-request.interceptor';
import { CustomPaginator } from './interceptor/CustomPaginatorConfiguration';

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

    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        CustomerLayoutComponent,
        TestCookieComponent
    ],
    providers: [httpInterceptorProviders,{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
