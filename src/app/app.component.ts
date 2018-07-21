import { LoadTransactionsDates } from './store/actions/transactions.actions';
import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from '@ngxs/store';
import { map } from "rxjs/operators";
import * as XLSX from "xlsx";
import { TransactionsService } from "./services/transactions.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  // @ViewChild("canvas") private canvasRef: ElementRef;
  data = [];
  canvas;
  ctx;
  transactionsChart: Chart;

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new LoadTransactionsDates());
  }

  ngAfterViewInit() {
    // this.canvas = document.getElementById("myChart");
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    // this.ctx = this.canvas.getContext("2d");
    let myChart;
    // myChart = new Chart(this.ctx, {
    //   type: "bar",
    //   data: {
    //     // labels: ["New", "In Progress", "On Hold"],
    //     labels: this.data[0],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: this.data[1],
    //         // data: [1, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 1)",
    //           "rgba(54, 162, 235, 1)"
    //           // "rgba(255, 206, 86, 1)"
    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     responsive: false
    //   }
    // });
  }

  ngOnInit(): void {
    // this.canvas = this.canvasRef.nativeElement;
    // this.context = this.canvas.getContext("2d");
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    // this.canvas = this.canvasRef.nativeElement;
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    // this.ctx = this.canvas.getContext("2d");
    // this.transactionsChart = new Chart("myChart", {
    //   type: "bar",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)"
    //         ],
    //         borderColor: [
    //           "rgba(255,99,132,1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)",
    //           "rgba(255, 159, 64, 1)"
    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
    // console.log(this.transactionsChart);
    // this.http
    //   .get("../assets/db/2016/dec_2016.xlsx", { responseType: "blob" })
    //   .subscribe((excelFile: Blob) => {
    //     const reader: FileReader = new FileReader();
    //     reader.onload = (e: any) => {
    //       /* read workbook */
    //       const bstr: string = e.target.result;
    //       const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });
    //       /* grab first sheet */
    //       const wsname: string = wb.SheetNames[0];
    //       const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    //       /* save data */
    //       this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    //       this.transactions = this.data.slice(1, 10);
    //     };
    //     reader.readAsBinaryString(excelFile);
    //   });



  }

  // onFileChange(evt?: any) {
  //   console.log("evt => ", evt);
  //   /* wire up file reader */
  //   const target: DataTransfer = <DataTransfer>evt.target;
  //   if (target.files.length !== 1) throw new Error("Cannot use multiple files");
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     console.log("e => ", e);
  //     /* read workbook */
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

  //     /* grab first sheet */
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];

  //     /* save data */
  //     this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  //     console.log(this.data);
  //   };
  //   reader.readAsBinaryString(target.files[0]);
  // }
}
