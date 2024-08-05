import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notesData: any[] = [];
  searchTerm: string = '';
  @ViewChild('content')
  content!: ElementRef;

  constructor(private router: Router, private service: UserserviceService) {}

  ngOnInit() {
    this.getNotes();
  }

  // Get Notes method
  getNotes() {
    this.service.getNotes().subscribe(res => {
      this.notesData = res.data;
      console.log("Userdata", this.notesData);
    });
  }

  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

 
  get filteredNotes() {
    if (!this.searchTerm.trim()) {
      return this.notesData;
    }

    const searchTermLower = this.searchTerm.toLowerCase();

    return this.notesData.filter((note: any) => {
      
      const titleMatch = note.title.toLowerCase().includes(searchTermLower);
      const contentMatch = note.content.toLowerCase().includes(searchTermLower);
      const categoryMatch = note.category.toLowerCase().includes(searchTermLower);

      const numberMatch = Object.keys(note).some(key => {
        return typeof note[key] === 'number' && note[key].toString().includes(this.searchTerm);
      });

      const dateMatch = Object.keys(note).some(key => {
        if (key === 'date' || key === 'created_at' || key === 'updated_at') {
          const noteDate = this.formatDate(note[key]);
          return noteDate.includes(this.searchTerm);
        }
        return false;
      });

      return titleMatch || contentMatch || categoryMatch || numberMatch || dateMatch;
    });
  }

  // Edit data
  editnotes(data: any) {
    this.router.navigate(
      ['/notesform'],
      {
        queryParams: { data: btoa(JSON.stringify(data)) }
      }
    );
  }

  // Delete Data
  confirmDelete(id: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Do you want to delete this note?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletenotes(id);
      }
    });
  }

  deletenotes(id: any) {
    this.service.deleteNotes(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your note has been deleted.',
          confirmButtonText: 'OK'
        });
        this.getNotes();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  homedir() {
    this.router.navigate(["/home"]);
  }
}
