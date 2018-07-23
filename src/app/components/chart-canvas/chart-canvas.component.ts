import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import * as Chart from "chart.js";

@Component({
  selector: 'app-chart-canvas',
  templateUrl: './chart-canvas.component.html',
  styleUrls: ['./chart-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCanvasComponent implements OnInit {
  @ViewChild("canvas") private canvasRef: ElementRef;
  public transactionsChart: Chart;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;

    this.ctx = this.canvas.getContext("2d");
    let myChart = new Chart(this.ctx, {
      type: "bar",
      data: {
        labels: ["New", "In Progress", "On Hold"],
        // labels: this.data[0],
        datasets: [
          {
            label: "# of Votes",
            // data: this.data[1],
            data: [1, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

}
