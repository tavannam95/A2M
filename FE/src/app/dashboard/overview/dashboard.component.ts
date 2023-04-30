import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {StatiscalService} from '../../shared/service/statiscal/statiscal.service';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    lableCus: any[] = [] ;
    seriesCus: any[] = [] ;
    lablePro: any[] = [] ;
    seriesPro: any[] = [] ;
    lableStatic: any[] = [] ;
    seriesStatic: any[] = [] ;
    maxCus: any ;
    maxPro: any ;
    maxStatic: any ;
    overview: any
    date = new Date();

    form = this.fb.group( {
        startDate: null ,
        endDate: null ,
        type: null
    })

    form2 = this.fb.group( {
        startDate:  new Date().setDate( new Date().getDate() - 7) ,
        endDate: new Date()  ,
        type: 3
    })

    constructor( private staticalService: StatiscalService ,
                 private fb: FormBuilder ) {
    }

    //Lấy 7 khách hàng mua hàng nhiều nhất
    getCustomeMostProduct(){
        this.staticalService.CustomerBuyMostProduct( this.form.getRawValue() ).subscribe( (data:any) => {
            this.changeData( data , this.lableCus , this.seriesCus , this.maxCus  )
            const datawebsiteViewsChart = {
                labels: this.lableCus,
                series: [
                    this.seriesCus
                ]
            };
            const optionswebsiteViewsChart = {
                axisX: {
                    showGrid: true ,
                },
                axisY: {
                    labelInterpolationFnc: function(value) {
                        return value / 1000000 + 'M'
                    },
                },
                low: 0,
                high: this.maxCus ,
                chartPadding: {top: 0, right: 0, bottom: 0, left: 5}
            };

            const websiteViewsChart = new Chartist.Bar('#customeProduct', datawebsiteViewsChart,
                optionswebsiteViewsChart);

            // start animation for the Emails Subscription Chart
            this.startAnimationForBarChart(websiteViewsChart);
        })
    }

    getOverview(){
        this.staticalService.getOverview().subscribe( (data:any ) => {
            this.overview = data  ;
        })
    }

    // Các sản phẩm bán chạy nhất
    getMostProduct(){
        this.staticalService.buyTheMostProduct( this.form.getRawValue() ).subscribe( (data: any) => {
            this.changeData( data , this.lablePro , this.seriesPro , this.maxPro );

            const datawebsiteViewsChart = {
                labels: this.lablePro ,
                series: [
                    this.seriesPro
                ]
            };
            const optionswebsiteViewsChart = {
                axisX: {
                    showGrid: false
                },
                low: 0,
                high: this.maxPro ,
                chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
            };

            const websiteViewsChart = new Chartist.Bar('#dailyProductChart', datawebsiteViewsChart,
                optionswebsiteViewsChart );

            this.startAnimationForBarChart(websiteViewsChart);
        })
    }

    // Các Doanh thu trong 7 ngày
    statisticInSevenBefore(){
        this.staticalService.turnover( this.form2.getRawValue() ).subscribe( (data:any) => {
            this.changeData(data , this.lableStatic , this.seriesStatic , this.maxStatic);
            const datawebsiteViewsChart = {
                labels: this.lableStatic,
                series: [
                    this.seriesStatic
                ]
            };
            const optionswebsiteViewsChart = {
                axisX: {
                    showGrid: false
                },
                axisY: {
                    labelInterpolationFnc: function(value) {
                        return value / 1000000 + 'M'
                    },
                },
                low: 0,
                high: this.maxStatic ,
                chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
            };
            const responsiveOptions: any[] = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];

            const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart,
                optionswebsiteViewsChart, responsiveOptions);

            // start animation for the Emails Subscription Chart
            this.startAnimationForBarChart(websiteViewsChart);
        })
    }

    changeData( data: any , lable: any[] , series: any[] , max: any ){
        max = data[0].total ;
        for( let x of data ){
            if( max <= x.total ){
                max = x.total ;
            }
            // @ts-ignore
            lable.push(x.name)
            // @ts-ignore
            series.push(x.total) ;
        }
    }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };

    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    ngOnInit() {
            this.getCustomeMostProduct();
            this.getOverview() ;
            this.getMostProduct() ;
            this.statisticInSevenBefore()
    }
}
