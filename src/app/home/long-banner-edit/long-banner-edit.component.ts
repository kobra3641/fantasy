import { Component, OnInit } from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-long-banner-catalogue-edit',
  templateUrl: './long-banner-edit.component.html',
  styleUrls: ['../home.component.css']
})
export class LongBannerEditComponent implements OnInit {

  public resultat: any;

  constructor(public dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close(this.resultat);
  }

  changeImage(target: any) {
    let fr = new FileReader();
    fr.readAsDataURL(target.files[0]);
    fr.addEventListener('load', ()=>{
      this.resultat = fr.result
      console.log(fr)
    })
  }
}
