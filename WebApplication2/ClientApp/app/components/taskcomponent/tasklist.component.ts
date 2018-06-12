import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Event } from '@angular/router';

@Component({
    selector: 'tasklist',
    templateUrl: './tasklist.component.html',
    styleUrls: ['./tasklist.component.css']

})
export class TaskListComponent {
    public tasks: Task[]; 
    http: Http;
    baseUrl: string;
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
        this.baseUrl = baseUrl;
        http.get(baseUrl + 'api/Data/GetTasks').subscribe(result => {
            this.tasks = result.json() as Task[];
            console.log(this.tasks);
        }, error => console.error(error));
    }

    onDelete(id: string) {
        let d: DeleteItem = { Id: id };
        this.http.post(this.baseUrl + 'api/Data/Delete', d).subscribe();
        var button = document.getElementById(d.Id);
        var row = button!.parentElement;
        var table = row!.parentElement;
        table!.removeChild(row!);
        // reload the tasks from the Database
       this.http.get(this.baseUrl + 'api/Data/GetTasks').subscribe(result => {
            this.tasks = result.json() as Task[];
            console.log(this.tasks);
        }, error => console.error(error));
    }

    onUpdate(id: string) {
        window.alert("Updating id " + id)
    }
}

interface Task {
    Id: number;
    Name: string;
    Description: string;
    Priority: string;
    Completed: string;
}

interface DeleteItem {
    Id: string;
}
