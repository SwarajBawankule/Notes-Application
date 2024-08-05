import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { NotesformComponent } from './notesform/notesform.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: 'notesform', component: NotesformComponent },
  { path: 'note-list', component: NoteListComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
