import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-task-image',
  templateUrl: './task-image.component.html',
  styleUrls: ['./task-image.component.css']
})
export class TaskImageComponent implements OnInit, AfterViewInit {

  @ViewChild("image", { static: false })
  public imageElement!: ElementRef;

  @Input("src")
  public imageSource!: string;

  public imageDestination: string;
  private cropper!: Cropper;

  my_src!: string;
  b64image!:any;
  canvasData!:any;

  public constructor() {
    this.imageDestination = "";
  }

  ngAfterViewInit():void {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
          this.imageDestination = canvas.toDataURL("image/png");
          this.b64image = this.imageDestination.replace(/^data:image\/(png|jpeg);base64,/, '');
      }
    });
  }

  saveB64image():  void {
    localStorage.setItem('imageIdCached', this.b64image);
  }
  public ngOnInit() {
  }

}
