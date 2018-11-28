import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	styles:[`
	nav a {
		padding: 5px 10px;
		text-decoration: none;
		margin-top: 10px;
		display: inline-block;
		background-color: #eee;
		border-radius: 4px;
	  }
	  nav a:visited, a:link {
		color: #607D8B;
	  }
	  nav a:hover {
		color: #039be5;
		background-color: #CFD8DC;
	  }
	  nav a.active {
		color: #039be5;
	  }
	`],
	template: `
		<h1 class="text-center">{{title}}</h1>
	
		<nav>
		<a routerLink="/addProject">Add Project</a>
		<a routerLink="/addUser">Add User</a> 
			<a routerLink="/addTask">Add Task</a> 
			<a routerLink="/tasks">View Task</a>
		
		</nav>

		<div class="container">
			<router-outlet></router-outlet>
		</div>
	`
})

export class AppComponent{
	title: string = 'Project Manager';
}

