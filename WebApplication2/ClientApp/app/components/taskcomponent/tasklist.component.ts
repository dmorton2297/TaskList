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


    onStatusUpdate(id: string) {
        let test = id.substring(0, 9);
        if (test == "completed") {
            let identifier = id.substring(10);
            let s: StatusItem = { Id: identifier, Status: "Y" }
            this.http.post(this.baseUrl + 'api/Data/MarkStatus', s).subscribe();
            document.getElementById(id)!.className = "btn btn-success";
            document.getElementById("span_" + identifier)!.className = "glyphicon glyphicon-ok";
            var x = document.getElementById(id)!;
            x.id = "incomplete_" + identifier;
        } else {
            let identifier = id.substring(11);
            let s: StatusItem = { Id: identifier, Status: "N" }
            this.http.post(this.baseUrl + 'api/Data/MarkStatus', s).subscribe();
            document.getElementById(id)!.className = "btn btn-danger";
            document.getElementById("span_" + identifier)!.className = "glyphicon glyphicon-remove";

            var x = document.getElementById(id)!;
            x.id = "completed_" + identifier;
        }
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

interface StatusItem {
    Id: string;
    Status: string;
}
