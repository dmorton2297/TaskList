import { Component, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Component({
    selector: 'addtask',
    templateUrl: './addtask.component.html'
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
        window.alert(this.task);
    }
}

interface Task {
    Name: string;
    Description: string;
    Priority: string;
}
