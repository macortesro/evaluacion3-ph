import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Camera, Photo, CameraResultType } from '@capacitor/camera';



@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule, IonicModule]
})
export class CamaraComponent  implements OnInit {

  foto:Photo|null = null

  async tomarFoto(){
    this.foto = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      correctOrientation: true
    })
  }

  constructor() { }

  ngOnInit() {}

}
