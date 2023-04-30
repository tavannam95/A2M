import {Component, OnInit, ViewChild} from '@angular/core';
import * as Chartist from 'chartist';
import {FormBuilder} from '@angular/forms';
import {StatiscalService} from '../../../shared/service/statiscal/statiscal.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'statical-turnover',
  templateUrl: './statical-turnover.component.html',
  styleUrls: ['./statical-turnover.component.scss']
})
export class StaticalTurnoverComponent implements OnInit {
    displayedColumns: string[] = ['no' ,'position', 'name'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

  newDate = new Date() ;
  listYear: any[] = [] ;
  typeSearch: number = 3 ;
  listLabel: any[] = [] ;
  listSeries: any[] = [] ;
  max: any ;
  type: any = 3;
  showChart: any = 0 ;
  listStatic: any[] = [] ;
  checkEmpty = false ;

  formShow = this.fb.group({
      startDate:  new Date( new Date().getFullYear(), new Date().getMonth() , new Date().getDate() - 9 ) ,
      endDate: new Date() ,
      type: 3 ,
      startYear: new Date().getFullYear() - 2 ,
      endYear: new Date().getFullYear() ,
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
      this.staticalService.turnover( this.form.getRawValue() ).subscribe((value: any) => {
          this.listStatic = value
          this.dataSource = new MatTableDataSource(value) ;
          this.dataSource.paginator = this.paginator;

          if( this.listStatic.length != 0  ){
              this.checkEmpty = false ;
              this.addDateIntoList( value , this.listLabel , this.listSeries , this.max ) ;
              if( this.listStatic.length >= 13){
                  this.showChart = 1 ;
              }
          }else {
              this.checkEmpty = true ;
          }
          const datawebsiteViewsChart = {
              labels: this.listLabel,
              series: [
                  this.listSeries
              ]
          };
          const optionswebsiteViewsChart = {
              stackBars: true,
              axisY: {
                  labelInterpolationFnc: function(value) {
                      return  value / 1000000 + 'M'
                  },
              },
              low: 0,
              high: this.max ,
              chartPadding: {top: 0, right: 5, bottom: 0, left: 0} ,
              lineSmooth: Chartist.Interpolation.simple({
                  divisor: 2,
                  fillHoles: false
              })

          };

          new Chartist.Bar('#kakaka', datawebsiteViewsChart,
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
              startDate: new Date(  this.formShow.getRawValue().startYear , 0 ,1 ) ,
              endDate: new Date(  this.formShow.getRawValue().endYear , 11, 31) ,
              type: this.type
          })
      }

      if( this.type == 2 ){
          this.form.patchValue({
              startDate: new Date( this.formShow.getRawValue().year , 0 ,1 ) ,
              endDate: new Date( this.formShow.getRawValue().year , 11, 31 ) ,
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
}
