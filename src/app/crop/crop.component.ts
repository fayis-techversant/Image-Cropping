import { Component, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css'],
})
export class CropComponent {
  @ViewChild('image') imageElement: any;
  @ViewChild('targetImage') targetImageElement: any;
  cropper: Cropper | any;

  ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      aspectRatio: 4 / 3,
      viewMode: 1,
      autoCropArea: 1,
    });
  }

  cropImage() {
    const croppedImage = this.cropper.getCroppedCanvas().toDataURL('image/png');
    this.targetImageElement.nativeElement.src = croppedImage;
  }
}
