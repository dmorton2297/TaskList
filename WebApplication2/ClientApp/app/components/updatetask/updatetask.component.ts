import { Component, Inject, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'updatetask',
    templateUrl: './updatetask.component.html',
    styleUrls: ['../addtask/addtask.component.css']
})
export class UpdateTaskComponent implements OnInit {
    task: Task;
    id: string;
    http: Http;
    baseUrl: string;

    constructor(private route: ActivatedRoute, http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.id = JSON.stringify(this.route.snapshot.data.cres);
        this.id = this.id.substring(1);
        this.id = this.id.substring(0, this.id.length - 1);
        console.log(this.id.length)
        this.http = http;
        this.baseUrl = baseUrl;
        console.log("The received id is " + this.id);
        let a = this.baseUrl + "/api/Data/GetTask/" + this.id + "";
        console.log(a);
        this.http.get(this.baseUrl + "/api/Data/GetTask/" + this.id)
            .subscribe(result => {
                this.task = result.json() as Task;
                console.log(this.task);
            });
    }

    ngOnInit() {
    }
    
    onSubmit() {

       // this.http.post(this.baseUrl + 'api/Data/Create', this.task).subscribe();

        // present the snackbar showing the database has been updated
        var x = document.getElementById("snackbar");
        x!.className = "show";
        setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
    }
}

interface Task {
    id: string;
    name: string;
    description: string;
    priority: string;
    completed: string;
}