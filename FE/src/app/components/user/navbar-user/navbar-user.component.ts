import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {
  isLogin: boolean = false;
  constructor(
    private cookieService: Cookie2Service,
    private jwtService: JwtService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLogin = this.jwtService.isLoggedIn();
  }

  logout() {
    this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
          message: 'Bạn có muốn đăng xuất không?'
        }
      }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
            this.cookieService.delete();
            this.jwtService.reloadPage();
        }
      })
}

}
