import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import * as Chart from "chart.js";

export enum ChartType {
  BAR = "bar",
  PIE = "pie"
}

@Component({
  selector: "app-chart-canvas",
  templateUrl: "./chart-canvas.component.html",
  styleUrls: ["./chart-canvas.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCanvasComponent {
  @ViewChild("canvas") private canvasRef: ElementRef;
  @ViewChild("canvas2") private canvas2Ref: ElementRef;
  @Input() public total: string;
  @Input() public title: string;
  @Input() public chartType: ChartType;
  @Input() public canvasData: Map<string, number>;
  @Input() public canvas2Data: Map<string, number>;
  @Output() public checkBoxClicked: EventEmitter<ChartType> = new EventEmitter<ChartType>();
  public ChartType = ChartType;
  public transactionsChart: Chart;
  public transactionsChart2: Chart;
  private canvas: HTMLCanvasElement;
  private canvas2: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;

  constructor() {}

  ngOnChanges() {
    this.canvas = this.canvas || this.canvasRef.nativeElement;
    this.ctx = this.ctx || this.canvas.getContext("2d");
    this.ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height);
    this.transactionsChart = new Chart(this.ctx, {
      type: this.chartType,
      data: {
        labels: Array.from(this.canvasData).map(a => a[0]),
        // labels: this.data[0],
        datasets: [
          {
            label: "Expense Type",
            // data: this.data[1],
            data: Array.from(this.canvasData).map(a => a[1]),
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgb(244, 67, 54)",
              "rgb(233, 30, 99)",
              "rgb(156, 39, 176)",
              "rgb(103, 58, 183)",
              "rgb(33, 150, 243)",
              "rgb(139, 195, 74)",
              "rgba(255, 99, 102, 1)",
              "rgba(54, 162, 205, 1)",
              "rgba(255, 256, 86, 1)",
              "rgb(244, 67, 54)",
              "rgb(233, 30, 109)",
              "rgb(156, 139, 176)",
              "rgb(103, 158, 103)",
              "rgb(33, 150, 293)",
              "rgb(39, 195, 174)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        events: []
      }
    });
    this.canvas2 = this.canvas2Ref.nativeElement;
    this.ctx2 = this.canvas2.getContext("2d");
    this.ctx2.clearRect(0, 0 , this.canvas.width, this.canvas.height);
    this.transactionsChart2 = new Chart(this.ctx2, {
      type: this.chartType,
      data: {
        labels: Array.from(this.canvas2Data).map(a => a[0]),
        // labels: this.data[0],
        datasets: [
          {
            label: "Suppliers",
            // data: this.data[1],
            data: Array.from(this.canvasData).map(a => a[1]),
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgb(244, 67, 54)",
              "rgb(233, 30, 99)",
              "rgb(156, 39, 176)",
              "rgb(103, 58, 183)",
              "rgb(33, 150, 243)",
              "rgb(139, 195, 74)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgb(244, 67, 54)",
              "rgb(233, 30, 99)",
              "rgb(156, 39, 176)",
              "rgb(103, 58, 183)",
              "rgb(33, 150, 243)",
              "rgb(139, 195, 74)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        events: []
      }
    });
  }

  public onTypechanged(type: ChartType): void {
    this.checkBoxClicked.emit(type);
  }
}
