import { Component, Inject, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'updatetask',
    templateUrl: './updatetask.component.html',
    styleUrls: ['../addtask/addtask.component.css']
})
export class UpdateTaskComponent {
    task: Task;
    id: string;
    http: Http;
    baseUrl: string;
    public categories: Category[];
    public selectedCategory: Category;

    constructor(private route: ActivatedRoute, http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.id = JSON.stringify(this.route.snapshot.data.cres);
        this.id = this.id.substring(1);
        this.id = this.id.substring(0, this.id.length - 1);
        console.log(this.id.length)
        this.http = http;
        this.baseUrl = baseUrl;

        this.http.get(this.baseUrl + 'api/Data/GetCategories').subscribe(result => {
            this.categories = result.json() as Category[];
            console.log(this.categories);

            this.http.get(this.baseUrl + "/api/Data/GetTask/" + this.id)
                .subscribe(result => {
                    this.task = result.json() as Task;
                    for (var i = 0; i < this.categories.length; i++) {
                        if (this.categories[i].id == this.task.category) {
                            this.selectedCategory = this.categories[i];
                            console.log(this.task);
                            break;
                        }
                    }
                });

            
        });
    }

    onSelect(Id: number) {
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id == Id) {
                this.task.category = this.categories[i].id;
                console.log(this.task);
                break;
            }
        }
    }

    onSubmit() {
        var dbtask = {
            Id: this.task.id,
            Name: this.task.name,
            Description: this.task.description,
            Priority: this.task.priority,
            Completed: this.task.completed,
            Category: this.task.category
        };


        this.http.post(this.baseUrl + 'api/Data/Update', dbtask).subscribe();

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
    category: number;
}

interface Category {
    id: number;
    name: string;
}

