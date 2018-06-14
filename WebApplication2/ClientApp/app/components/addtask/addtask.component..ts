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
    public categories: Category[];
    public selectedCategory : Category  = { id: 0, name: ""};

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.task = { Name: "", Description: "", Priority: "", Category: 1 };

        this.http.get(this.baseUrl + 'api/Data/GetCategories').subscribe(result => {
            this.categories = result.json() as Category[];
            console.log(this.categories);
        });

        this.selectedCategory.id = 0;
    }

    onSelect(Id: number) {
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id == Id) {
                this.selectedCategory.name = this.categories[i].name;
                this.selectedCategory.id = this.categories[i].id;
                console.log(this.selectedCategory);
                break;
            }
        }
    }

    onSubmit() {
        this.task.Category = this.selectedCategory.id;
        this.http.post(this.baseUrl + 'api/Data/Create', this.task).subscribe();

        // present the snackbar showing the database has been updated
        var x = document.getElementById("snackbar");
        x!.className = "show";
        setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
        this.task = { Name: "", Description: "", Priority: "", Category: 1 };


    }
}

interface Task {
    Name: string;
    Description: string;
    Priority: string;
    Category: number;
}

interface Category {
    id: number;
    name: string;
}
