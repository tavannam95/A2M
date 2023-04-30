import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {StatiscalService} from '../../../shared/service/statiscal/statiscal.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'statical-customer',
  templateUrl: './statical-customer.component.html',
  styleUrls: ['./statical-customer.component.scss']
})
export class StaticalCustomerComponent implements OnInit {


  newDate = new Date() ;
  listYear: any[] = [] ;
  typeSearch: number = 3 ;
  listLabel: any[] = [] ;
  listSeries: any[] = [] ;
  max: any ;
  type: any = 3;
  showChart: any = 0 ;
  listStatic: any[] = [] ;
  listMonth = [ 1, 2, 3, 4, 5 ,6 , 7 , 8 , 9 ,10 , 11 ,12]
  day: any ;

  formShow = this.fb.group({
    startDate:  new Date( new Date().getFullYear(), new Date().getMonth() , new Date().getDate() - 9 ) ,
    endDate: new Date() ,
    type: 3 ,
    month: new Date().getMonth() + 1 ,
    year: new Date().getFullYear()  ,
  })

  form = this.fb.group({
    startDate:  new Date( new Date().getFullYear(), new Date().getMonth() , new Date().getDate() - 9 ) ,
    endDate: new Date() ,
    type: 3 ,
  })

  constructor( private fb: FormBuilder ,
               private staticalService: StatiscalService) {
  }

  ngOnInit(): void {
    this.getStatical() ;
    this.listDate() ;
  }

  getStatical(){
    this.staticalService.CustomerBuyMostProduct( this.form.getRawValue() ).subscribe((value: any) => {
      this.listStatic = value
      if( this.listStatic.length != 0 ){

        this.addDateIntoList( value , this.listLabel , this.listSeries , this.max ) ;
      }else {

      }

      const datawebsiteViewsChart = {
        labels: this.listLabel,
        series: [
          this.listSeries
        ]
      };
      const optionswebsiteViewsChart = {
        stackBars: true,
        seriesBarDistance: 10,
        axisY: {
          labelInterpolationFnc: function(value) {
            return value / 1000000 + 'M'
          }
        },
        high: this.max ,
        chartPadding: {top: 0, right: 5, bottom: 0, left: 0} ,
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 2,
          fillHoles: false
        })

      };

      new Chartist.Bar('#viewStaticalCustomer', datawebsiteViewsChart,
          optionswebsiteViewsChart );
    })
  }

  onType( data: any ){
    this.type = data
  }

  onShow( data: number){
    this.showChart = data ;
  }

  listDate(){
    for( let i=0 ; i<= this.newDate.getFullYear() ; i++ ){
      var k = this.newDate.getFullYear() - i
      this.listYear.push(k);
      if( this.newDate.getFullYear() - 40 == k ){
        break ;
      }
    }
  }

  addDateIntoList( data: any , label: any[] , series: any[] , max: number ){
    max = data[0].total ;
    for( let x of data ){
      if( max <= x.total ){
        max = x.total ;
      }
      // @ts-ignore
      label.push(x.name)
      // @ts-ignore
      series.push(x.total) ;
    }
  }

  clear(){
    this.listSeries = [] ;
    this.listLabel  = [] ;
  }

  onSearch(){
    if( this.type == 1 ){
      this.form.patchValue({
        startDate: new Date(  this.formShow.getRawValue().year , 0 ,1 ) ,
        endDate: new Date(  this.formShow.getRawValue().year , 11, 31) ,
        type: this.type
      })
    }

    if( this.type == 2 ){
      this.findDay( this.formShow.getRawValue().month )
      this.form.patchValue({
        startDate: new Date( this.formShow.getRawValue().year , this.formShow.getRawValue().month -1 ,1 ) ,
        endDate: new Date( this.formShow.getRawValue().year , this.formShow.getRawValue().month - 1, this.day ) ,
        type: this.type
      })
    }

    if( this.type == 3){
      this.form.patchValue({
        startDate: this.formShow.getRawValue().startDate ,
        endDate: this.formShow.getRawValue().endDate ,
        type: this.type
      })
    }

    this.clear() ;
    this.showChart = 0
    this.getStatical() ;
  }

  findDay( data: any ){
    if( data == 1 || data == 3 || data == 5 || data == 7 || data == 8 || data == 10 || data == 12 ){
      this.day = 31
    }else if( data == 2) {
      if( data % 400 == 0 || ( data % 4 == 0 && data % 100 != 0 )){
        this.day = 29
      }else {
        this.day = 28
      }
    }else {
      this.day = 30
    }
  }
}
