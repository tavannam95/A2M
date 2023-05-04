import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constant } from 'app/constants/Constant';
import { MenuItems, RouteInfo } from 'app/menu/menuItem';
import { BillService } from 'app/services/bill/bill.service';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  bill: any;

  menuItems: RouteInfo[];
  scanner2: any;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(
    private cookieService: Cookie2Service,
    private billService: BillService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    this.menuItems = MenuItems.filter(menuItem => menuItem);
  }

  print(data: any) {

    const formatter = new Intl.NumberFormat();
    let text = '';

    data.listTickets.forEach(t => {
      let ngayChieu = this.datePipe.transform(t.showtime.date, 'dd/MM/yyyy');
      let gioChieu = this.datePipe.transform(t.showtime.timeStart, 'hh:mm');
      text += `<div class="ticket">
        <div class="title">AMENIC | Ngày mới - Phim mới</div>
        <div class="subtitle">VÉ XEM PHIM</div>
        <div class="info">
            <span>Ngày chiếu:</span>
            <span>${ngayChieu}</span>
        </div>
        <div class="info">
            <span>Giờ chiếu:</span>
            <span>${gioChieu}</span>
        </div>
        <div class="info">
            <span>Phòng chiếu:</span>
            <span>${t.showtime.room.name}</span>
        </div>
        <div class="info">
            <span>Hàng ghế:</span>
            <span>${t.seat.row.name}</span>
        </div>
        <div class="info">
            <span>Số ghế:</span>
            <span>${t.seat.number}</span>
        </div>
        <div class="instructions">Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi. Chúc quý khách xem phim vui vẻ!</div>
        </div>
        `
    });

    // @ts-ignore
    printJS({
      printable: 'demo',
      properties: [{
        field: ' ',
        displayName: ' '
      }],
      documentTitle: ' ',
      type: 'html',
      showModal: false,
      maxWidth: 800,
      font: 'Thoma',
      font_size: '12pt',
      header: text,
      style: '.ticket { margin-top: 20px; font-family: Arial, sans-serif; width: 100%; border: 1px solid #ccc; padding: 20px; box-sizing: border-box; } .ticket .title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 10px; } .ticket .subtitle { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 20px; } .ticket .info { display: flex; justify-content: space-between; margin-bottom: 10px; } .ticket .info span { font-size: 14px; font-weight: bold; } .ticket .seat { font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 20px; } .ticket .instructions { font-size: 14px; text-align: center; }',
      onPrintDialogClose: (res) => {
        // Xử lý sự kiện in thành công ở đây
        this.billService.printTicket(this.bill.id).subscribe({
          next: res => {
            this.toastrService.success('In vé thành công');
          },
          error: e => {
            this.toastrService.error('In vé thất bại');

          }
        })
      }
    })
    // printJS(data, 'html')
  }

  openScanner(template: TemplateRef<any>) {
    this.scanner2 = this.dialog.open(template, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
    });
  }

  onCodeResult(resultString: string) {
    const barcode = resultString.substring(0, resultString.length - 1);
    this.billService.findByBarcode(barcode).subscribe({
      next: res => {
        this.bill = res.data;
        if (res.status) {
          this.scanner2.close();
          this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            hasBackdrop: true,
            data: {
              message: 'Bạn có muốn in vé xem phim?'
            }
          }).afterClosed().subscribe(result => {
            if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
              // this.notificationService.showNotification('success', 'Sửa thành công !');
              this.print(this.bill);
            }
          })
        } else {
          this.toastrService.warning(res.message);
        }
      },
      error: e => {
        this.toastrService.error('Lỗi hệ thống, vui lòng thử lại sau')
      }
    })
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }



  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

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
