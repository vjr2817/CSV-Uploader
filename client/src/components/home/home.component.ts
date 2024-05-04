import { Component,ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

import { HomeService } from './home.service';


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatSortModule,
        MatInputModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    providers: [HomeService]
})

export class HomeComponent {

    fileName = '';
    errorMsg = '';
    showError = false;
    loader = false;
    tableData:any;
    headers = [];


    constructor(private homeService: HomeService) {   
    }

    @ViewChild(MatSort) sort: MatSort = new MatSort();

    onFileSelected(event: any) {
        if(event.target.files && event.target.files.length > 0){
            const file = event.target.files[0];
            if (file['type'] == 'text/csv') {
                this.loader = true;
                let formData = new FormData();
                formData.append('csvDocument', file);
                this.homeService.uploadCSVFile(formData)
                    .subscribe({
                        next: (resData: any) => {
                            this.loader = false;
                            if (resData.data && resData.data.length > 0) {
                                this.fileName = file.name;
                                let csvData = this.convertCSVtoTableData(resData.data);
                                this.headers = csvData.headers;
                                this.tableData = new MatTableDataSource(csvData.tableData);
                                this.tableData.sort = this.sort;
                            }
                            else this.displayErrorMessage('No Data in CSV file');
                        }, error: (err) => {
                            this.loader = false;
                            if(err?.error?.message)
                                this.displayErrorMessage(err?.error?.message);
                        }

                    })
            }
            else {
                this.displayErrorMessage('Only CSV file supported');
            }
        }
    }

    displayErrorMessage(msg: string) {
        this.showError = true;
        this.errorMsg = msg;
        setTimeout(() => this.showError = false, 4000);
    }

    convertCSVtoTableData(data: Array<any>): any {
        let headers = data.shift();
        let tableData = [];
        for (let i = 0; i < data.length; i++) {
            let dataObj: any = {};
            for (let j = 0; j < headers.length; j++) {
                if (data[i][j])
                    dataObj[headers[j]] = data[i][j];
            }
            tableData.push(dataObj);
        }
        return { headers, tableData };
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.tableData.filter = filterValue.trim().toLowerCase();
      }


}