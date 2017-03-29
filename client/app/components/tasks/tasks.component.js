"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var task_service_1 = require("../../services/task.service");
var TasksComponent = (function () {
    function TasksComponent(taskService) {
        var _this = this;
        this.taskService = taskService;
        this.appState = 'default';
        this.taskService.getTasks()
            .subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    }
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        event.preventDefault();
        var newTask = {
            title: this.title,
            passwordSite: this.passwordSite
        };
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.tasks.push(task);
            _this.title = '';
            _this.passwordSite = '';
        });
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var tasks = this.tasks;
        if (confirm("ATTENTION, YOU ARE GOING TO DELETE YOUR DATA") == true) {
            this.taskService.deleteTask(id).subscribe(function (data) {
                if (data.n == 1) {
                    for (var i = 0; i < tasks.length; i++) {
                        if (tasks[i]._id == id) {
                            tasks.splice(i, 1);
                        }
                    }
                }
            });
        }
        else {
            return false;
        }
    };
    TasksComponent.prototype.editTask = function (task) {
        this.appState = 'edit';
        this.title = task.title;
        this.passwordSite = task.passwordSite;
        this.oldTask = task;
        //Scroll up window
    };
    TasksComponent.prototype.cancel = function () {
        this.appState = 'default';
        this.title = '';
        this.passwordSite = '';
    };
    TasksComponent.prototype.updateTask = function (task) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i]._id == this.oldTask._id) {
                this.tasks[i].title = this.title;
                this.tasks[i].passwordSite = this.passwordSite;
                console.log('Updated');
            }
        }
        this.taskService.updateTask(task).subscribe(function (data) {
            task.title = '';
            task.passwordSite = '';
        });
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks',
        templateUrl: 'tasks.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map