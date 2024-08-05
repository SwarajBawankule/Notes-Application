import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-notesform',
  templateUrl: './notesform.component.html',
  styleUrls: ['./notesform.component.css']
})
export class NotesformComponent implements OnInit {

  notesForm!: FormGroup;
  ckDep: boolean = false;
  notesdata: any = [];
  notesdatas: any[] = [];
  id: any;
  data: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,private route: ActivatedRoute,private service: UserserviceService
  ) {}

  ngOnInit(): void {
    this.getNotes();
    this.notesForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.route.queryParams.subscribe(parsam => {
      this.data = JSON.parse(atob(parsam['data']));
      //this.id = params['id'];
      console.log("editdata",this.data);
      this.setUserData();
    });
  }
  setUserData() {
    this.notesForm.patchValue({
      category: this.data.category,
      title: this.data.title,
      content: this.data.content,
      date: this.data.date,
    })
  }
 
  getNotes() {
    this.service.getNotes().subscribe(res => {
      this.notesdatas = res.data;
      console.log("Userdata", this.notesdatas);
    });
  }
  //Add Notes Data
  AddNotes() {
    if (this.notesForm.invalid) {
      this.ckDep = true;
      return;
    } else {
      console.log("register", this.notesForm.value);
      this.service.addNotes(this.notesForm.value).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Data Added successfully!',
          text: 'Your Notes Data has been added successfully.',
          confirmButtonText: 'OK'
        });
        this.notesForm.reset();
        this.router.navigate(["/note-list"]);
        console.log(res);
      });
    }
  }

  // Update Data Method
  updatenotes() {
    if (this.notesForm.invalid) {
      this.ckDep = true;
      return
    } else {
      try {
        this.notesForm.value.id = this.data._id;
        const post = {
          "_id": this.notesForm.value.id,
          "category": this.notesForm.value.category,
          "title": this.notesForm.value.title,
          "content": this.notesForm.value.content,
          "date": this.notesForm.value.date,
        }
        this.service.updateNotes(post).subscribe((res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Data Update successfully!',
            text: 'Your Notes Data has been Updated successfully.',
            confirmButtonText: 'OK'
          });
          this.notesForm.reset();
          console.log(res);
          this.router.navigate(["/note-list"])
        },
  
        )
      } catch (err) {
      }
    }
  }
  cancel(){
    this.router.navigate(["/home"])
  }
}
