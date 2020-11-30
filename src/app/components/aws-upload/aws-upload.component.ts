import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AwsService} from '../../services/aws.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'aws-upload',
  template: `
    <span class="fa fa-spinner" *ngIf="loading"></span><input type="file" (change)="uploadFile($event)"
                                                              [multiple]="multiple"/>`
})
export class AwsUploadComponent implements OnInit {
  @Input() multiple?: boolean;
  @Input() folder: string;
  // tslint:disable-next-line:no-output-on-prefix no-output-rename
  @Output('onupload') onUpload: EventEmitter<Array<string> | string>;

  public files: Array<string> | string;
  public loading: boolean;

  constructor(private service: AwsService) {
    this.multiple = false;
    this.folder = environment.awsFolder;
    this.onUpload = new EventEmitter();
    this.loading = false;
  }

  public getContentType(name: string): string {
    const ext = name.split('.').pop().toLowerCase();
    if (ext === 'png') {
      return 'image/png';
    }
    return 'image/jpeg';
  }

  public uploadFile(event: any) {
    this.loading = true;
    Object
      .values(event.target.files)
      .map(async (file: any) => {
        const res = await this.service
          .upload({
            Key: `${this.folder}/${file.name}`.split('/').filter(path => path && path.length).join('/'),
            Body: file,
            ContentType: this.getContentType(file.name)
          });

        this.loading = false;
        if (!res.Location) {
          return false;
        }

        if (!this.multiple) {
          this.files = res.Key;
          this.onUpload.emit(this.files);
          return true;
        }

        if (typeof this.files !== 'string') {
          this.files.push(res.Key);
        }
        this.onUpload.emit(this.files);
      });
  }

  public ngOnInit(): void {
    if (this.multiple) {
      this.files = [];
      return;
    }
    this.files = '';
  }
}
