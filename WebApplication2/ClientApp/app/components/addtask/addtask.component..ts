import { Component, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


@Component({
    selector: 'addtask',
    templateUrl: './addtask.component.html',
    styleUrls: ['./addtask.component.css']

})
export class AddTaskComponent {

    public task: Task;
    http: Http;
    baseUrl: string;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.task = { Name: "", Description: "", Priority: "" };
    }

    onSubmit() {

        this.http.post(this.baseUrl + 'api/Data/Create', this.task).subscribe();

        // present the snackbar showing the database has been updated
        var x = document.getElementById("snackbar");
        x!.className = "show";
        setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
        this.task = { Name: "", Description: "", Priority: "" };


    }
}

interface Task {
    Name: string;
    Description: string;
    Priority: string;
}
