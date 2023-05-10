import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';
import { cropperArray } from '../types/cropper';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css'],
})
export class CropComponent {
  constructor(private storage: StorageService) {}

  @ViewChild('image') imageElement: any;
  @ViewChild('main') mainEl!: ElementRef;
  cropper: Cropper | any;
  crops: cropperArray[] = [];
  cropArray: cropperArray = new cropperArray();
  isOverlay = false;

  ngAfterViewInit() {
    console.log('device width :', this.mainEl.nativeElement.offsetWidth);
    console.log('device height :', this.mainEl);
    console.log('image width: ', this.imageElement.nativeElement.offsetWidth);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight
    console.log('pppp: ',screenWidth);
    console.log('ooooooo ;',screenHeight);
    
    

    this.getCrop();

    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      aspectRatio: 4 / 3,
      viewMode: 1,
      autoCropArea: 0,
      crop: (event) => {
        console.log('details:', event.detail);
      },
    });
  }

  getCrop() {
    console.log('getCrop varunnund');
    this.storage.getItem().subscribe(
      (res) => {
        console.log('getCrop res varunnund', res);
        this.crops = res;
      },
      (err) => {
        alert(err);
      }
    );
  }

  addCrop() {
    console.log('keri');
    this.cropper.crop();
    const crop = this.cropper.getData();
    const newCrop = new cropperArray();
    newCrop.height = crop.height;
    newCrop.width = crop.width;
    newCrop.x = crop.x;
    newCrop.y = crop.y;
    
    this.storage.addItem(newCrop).subscribe(
      (res) => {
        console.log('varunnund');
        console.log(res);
        
        this.getCrop();
        this.cropArray.height = 0;
        this.cropArray.width = 0;
        this.cropArray.x = 0;
        this.cropArray.y = 0;
      },
      (err) => {
        alert(err);
        console.log('errrr :', err);
      }
    );
  }
  deleteAllCrops() {
    this.storage.deleteAllItem().subscribe(
      (res) => {
        console.log('eeeeeeeee');
        console.log(this.cropper);

        console.log(res);

        this.crops = [];
      },
      (err) => {
        alert(err);
        console.log('delete error :', err);
      }
    );
  }

  getWidth(width:number) {
    let divWidth;
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
      console.log('width < 480');
      
    }
    else if (screenWidth <=900) {
      console.log('width < 900');
      
    } else {
      console.log('width > 900');
      
      divWidth = (width / this.mainEl.nativeElement.offsetWidth) * 100 
      console.log(divWidth);
      
    }
    return divWidth;
  }

  getHeight(height:number) {
    let divHeight;
    const screenHeight = window.innerHeight;
    if (screenHeight <= 480) {
      
      console.log('height < 480');
    }
    else if (screenHeight <=900) {
      console.log('height < 900');
      divHeight = (height / window.innerHeight) * 100 
      console.log('divheight :',divHeight);
      console.log('vvvvvv :',screenHeight);
      
    } else {
      console.log('height > 900');
      divHeight = (height / window.innerHeight) * 100 
      console.log('divheight :',divHeight);
      console.log('vvvvvv :',screenHeight);
      
      
    }
    return divHeight;
  }
}
