import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as Chart from "chart.js";
import { fromEvent, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import * as XLSX from "xlsx";
import { TransactionsService } from "../../services/transactions.service";

@Component({
  selector: "app-chart-visualisation",
  templateUrl: "./chart-visualisation.component.html",
  styleUrls: ["./chart-visualisation.component.scss"]
})
export class ChartVisualisationComponent implements OnInit {
  @ViewChild("canvas") private canvasRef: ElementRef;
  public transactionsChart: Chart;
  canvas;
  ctx;
  data = [];

  constructor(private transactionsService: TransactionsService) {
    this.transactionsService
      .getTransaction("dec", "2016")
      .pipe(switchMap(this.convertToJson))
      .subscribe(x => console.log(x));
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    // this.canvas = document.getElementById("myChart");
    this.canvas.width = window.innerWidth - 200;
    this.canvas.height = window.innerHeight - 100;

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

  private convertToJson(excelFile: Blob): Observable<any[]> {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(excelFile);
    return fromEvent(reader, "load").pipe(
      map((e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        return XLSX.utils.sheet_to_json(ws, { header: 1 });
      })
    );
  }
}
