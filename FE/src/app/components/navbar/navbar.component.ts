import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { DatePipe, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItems, RouteInfo } from 'app/menu/menuItem';
import { Cookie2Service } from 'app/services/cookie2/cookie2.service';
import { JwtService } from 'app/services/jwt/jwt.service';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { BillService } from 'app/services/bill/bill.service';
// import printJS = require("print-js");
// @ts-ignore
import printJS from 'print-js';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { Constant } from 'app/constants/Constant';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    bill: any;

    availableDevices: MediaDeviceInfo[];
    currentDevice: MediaDeviceInfo = null;
    hasDevices: boolean;
    hasPermission: boolean;
    scanner2: any;

    qrResultString: string;

    torchEnabled = false;
    torchAvailable$ = new BehaviorSubject<boolean>(false);
    tryHarder = false;

    private listTitles: RouteInfo[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(
        location: Location, 
        private element: ElementRef, 
        private router: Router,
        private dialog: MatDialog,
        private cookieService: Cookie2Service,
        private billService: BillService,
        private toastrService: ToastrService,
        private jwtService: JwtService,
        private datePipe: DatePipe
    ) {
        this.location = location;
        this.sidebarVisible = false;
    }


    ngOnInit() {
        this.listTitles = MenuItems.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    print(data: any) {
        
        const formatter = new Intl.NumberFormat();
        let text ='';
        
        data.listTickets.forEach(t =>{
            let ngayChieu = this.datePipe.transform(t.showtime.date,'dd/MM/yyyy');
            let gioChieu = this.datePipe.transform(t.showtime.timeStart,'hh:mm');
            console.log(t);
            text+=`<div class="ticket">
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
                console.log(res);
                this.billService.printTicket(this.bill.id).subscribe({
                    next: res =>{
                        console.log(res);
                        this.toastrService.success('In vé thành công');
                    },
                    error: e =>{
                        console.log(e);
                        
                    }
                })
            }
        })
        // printJS(data, 'html')
    }

    onCodeResult(resultString: string) {
        const barcode = resultString.substring(0,resultString.length-1);
        console.log(barcode);
        this.billService.findByBarcode(barcode).subscribe({
            next: res =>{
                console.log(res.data);
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
                }else{
                    this.toastrService.warning(res.message);
                }
            },
            error: e =>{
                console.log(e);
                
            }
        })
    }

    openScanner(template: TemplateRef<any>) {
        this.scanner2 = this.dialog.open(template, {
            width: '500px',
            disableClose: true,
            hasBackdrop: true,
        });
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

    logout() {
        this.cookieService.delete();
        this.jwtService.reloadPage();
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
}
