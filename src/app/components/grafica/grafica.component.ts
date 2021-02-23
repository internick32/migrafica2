import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataSets } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];

  constructor( private http: HttpClient, private wsService: WebsocketService) { }

  ngOnInit() {
    this.getData();
    this.escucharSocket();
  }

  getData(){
    this.http.get('http://localhost:5000/grafica')
    .subscribe( (data: any) => this.barChartData = data);
  }

  escucharSocket(){
    this.wsService.listen('cambio-grafica').subscribe( (data:any ) => {
      console.log('socket', data);
      this.barChartData = data;
    });
  }

}
