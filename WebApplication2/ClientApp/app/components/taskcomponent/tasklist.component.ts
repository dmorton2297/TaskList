import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'tasklist',
    templateUrl: './tasklist.component.html'
})
export class TaskListComponent {
    public tasks: Task[]; 

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Data/Tasks').subscribe(result => {
            this.tasks = result.json() as Task[];
            console.log(this.tasks);
        }, error => console.error(error));
    }
}

interface Task {
    Id: number;
    Name: string;
    Description: string;
    Priority: string;
    Completed: string;
}

