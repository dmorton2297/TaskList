import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/taskcomponent/tasklist.component'
import { AddTaskComponent } from './components/addtask/addtask.component.';
import { UpdateTaskComponent } from './components/updatetask/updatetask.component';

import { TaskResolver } from './components/updatetask/task.resolver';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        TaskListComponent,
        HomeComponent,
        UpdateTaskComponent, 
        AddTaskComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'tasklist', component: TaskListComponent },
            { path: 'addtask', component: AddTaskComponent },
            {
                path: 'updatetask/:id', component: UpdateTaskComponent,
                resolve: {
                    cres: TaskResolver
                }
            },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        TaskResolver
    ]
})
export class AppModuleShared {
}
