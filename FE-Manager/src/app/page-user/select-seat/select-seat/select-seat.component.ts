import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'app/constants/Constant';
import { BillApiService } from 'app/services/bill/bill-api.service';
import { ConfirmDialogComponent } from 'app/services/confirm-dialog/confirm-dialog.component';
import { JwtService } from 'app/services/jwt/jwt.service';
import { PublicApiService } from 'app/services/public/public-api.service';
import { RoomService } from 'app/services/room/room.service';
import { RowService } from 'app/services/row/row.service';
import { ShowtimeService } from 'app/services/showtime/showtime.service';
import { TicketApiService } from 'app/services/ticket/ticket-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.scss']
})
export class SelectSeatComponent implements OnInit {

  showtimeId: any;
  showtime: any;
  room: any;

  today = new Date().getDay();
  isHoliday: boolean = false;

  tickets: any;
  selled: any[] = [];
  fare: any;
  isLoading = false;

  seatRow: any;
  selectedSeat: any[] = [];
  showSelectedSeat: any[] = [];
  listSeatFare = [];
  show: string = '';
  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private showtimeService: ShowtimeService,
    private roomService: RoomService,
    private rowService: RowService,
    private ticketApiService: TicketApiService,
    private billService: BillApiService,
    private matDialog: MatDialog,
    private toastrServcie: ToastrService,
    private publicApiService: PublicApiService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showtime = {
      movie: {poster: ''},
      room: {name: ''}
    }
    
    this.loadPage();

  }

  loadPage(){
    this.listSeatFare = [];
    this.route.queryParamMap.subscribe(params => {
      this.showtimeId = Number(params.get('id'));
      this.findById();
      this.findByShowtime();
    });
    if (this.today==0||this.today==6) {
      this.isHoliday = true;
    }else{
      this.isHoliday = false;
    }
    this.publicApiService.findByIsHoliday(this.isHoliday).subscribe({
      next: res=>{
        this.fare = res.data;
      },
      error: e=>{
        console.log(e);
        
      }
    })
  }

  findByShowtime(){
    this.publicApiService.findByShowtime(this.showtimeId).subscribe({
      next: res=>{
        this.tickets = res.data;
        for (let i = 0; i < this.tickets.length; i++) {
          this.selled.push(this.tickets[i].seat.id);
        }
      },
      error: e=>{
        console.log(e);
      }
    })
  }

  checkSelled(seatId: any){
    let index = this.selled.findIndex(s=>s==seatId);
    if (index!=-1) {
      return true;
    }else{
      return false;
    }
  }

  selectSeat(seat: any, row: any, seatNumber: any){
    let index = this.selectedSeat.findIndex(s=>s==seat.id);
    if (index!=-1) {
      for (let i = 0; i < this.fare.length; i++) {
        if (this.fare[i].seatType==seat.seatType.id) {
          this.total-=this.fare[i].price;
        }
      }
      this.selectedSeat.splice(index,1);
      this.listSeatFare.splice(index,1);
      this.showSelectedSeat.splice(index,1);
      this.show = '';
      for (let i = 0; i < this.showSelectedSeat.length; i++) {
        this.show += this.showSelectedSeat[i] + ', ';
      }
      this.show = this.show.substring(0,this.show.length-2);
    }else{
      let fareId = -1;
      for (let i = 0; i < this.fare.length; i++) {
        if (this.fare[i].seatType==seat.seatType.id) {
          this.total+=this.fare[i].price;
          fareId = this.fare[i].id;
        }
      }
      let seatFare = {
        seatId: seat.id,
        fareId: fareId
      }
      this.listSeatFare.push(seatFare);
      this.selectedSeat.push(seat.id);
      let show = row.toUpperCase() + seatNumber;
      this.showSelectedSeat.push(show);
      this.show = '';
      for (let i = 0; i < this.showSelectedSeat.length; i++) {
        this.show += this.showSelectedSeat[i] + ', ';
      }
      this.show = this.show.substring(0,this.show.length-2);
    }
  }

  isSelected(seatId:any){
    let index = this.selectedSeat.findIndex(s=>s==seatId);
    if (index!=-1) {
      return true;
    }else{
      return false;
    }
  }

  findById(){
    this.publicApiService.findById(this.showtimeId).subscribe({
      next: res =>{
        this.showtime= res.data;
        console.log(this.showtime);
        
        this.publicApiService.getByRoom(this.showtime.room).subscribe({
          next: res=>{
            this.seatRow = res.data;
          },
          error: e=>{
            console.log(e);
            
          }
        })
      },
      error: e=>{
        console.log(e);
        
      }
    })
  }

  createBill(){

    // if (!this.jwtService.isLoggedIn()) {
    //   this.router.navigate(['/login'],);
    //   this.toastrServcie.warning('Bạn phải đăng nhập để thực hiện chức năng này');
    //   return;
    // }

    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn đặt vé xem phim?'
      }
    }).afterClosed().subscribe(result => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.isLoading = true;

          let billRequest = {
            idAccount: 1,
            totalPrice: this.total,
            listSeatFare: this.listSeatFare,
            showtimeId: this.showtimeId,
          }
          this.publicApiService.createBill(billRequest).subscribe({
            next: res =>{
              console.log(res);
              this.isLoading = false;
              this.toastrServcie.success(res.message);
              this.loadPage();
            },
            error: e =>{
              console.log(e);
              this.isLoading = false;
            }
          })
          
        }
    })
    
    
  }

}
