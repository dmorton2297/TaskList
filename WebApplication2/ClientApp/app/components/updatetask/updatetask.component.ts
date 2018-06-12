import { Component, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'updatetask',
    templateUrl: './updatetask.component.html',
    styleUrls: ['../addtask/addtask.component.css']
})
export class UpdateTaskComponent {
    public task: Task;
    http: Http;
    baseUrl: string;

    constructor(private route: ActivatedRoute, http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.route.params.subscribe(params => {
            let id = params["id"];
            this.http.get(this.baseUrl + 'api/Data/GetTask/' + id).subscribe(result => {
                this.task.Name = "Name";
                this.task.Description = "Description";
                this.task.Priority = "L";
            });
        });


    }
    
    onSubmit() {

       // this.http.post(this.baseUrl + 'api/Data/Create', this.task).subscribe();

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