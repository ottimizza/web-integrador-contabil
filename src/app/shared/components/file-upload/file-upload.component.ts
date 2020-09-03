import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { User } from '@shared/models/User';
import { DOCUMENT } from '@angular/common';
import { WorkflowService } from '@app/http/workflow.service';

export class FileUrlChangeOptions {
  url: string;
  name: string;
  extension: string;
}

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  public readonly ID = 'file-upload-component';

  @Input() autoStore = true;

  @Output() fileChange: EventEmitter<File> = new EventEmitter();
  @Output() urlChange: EventEmitter<FileUrlChangeOptions> = new EventEmitter();

  fileToUpload: File = null;

  inputRef: HTMLInputElement;

  accountingId: number;

  hasFileName = false;

  constructor(
    private service: WorkflowService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.accountingId = User.fromLocalStorage().organization.id;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);

    this.hasFileName = true;
    if (this.autoStore) {
      this.store();
    } else {
      this.fileChange.emit(this.fileToUpload);
    }
  }

  store() {
    // this.service.fakeStore(this.fileToUpload, this.accountingId).subscribe(result => {
    //   this.urlChange.emit({
    //     url: result,
    //     name: this.getFileName(),
    //     extension: this.getFileExtension()
    //   });
    // });
  }

  trigger() {
    if (!this.inputRef) {
      this.inputRef = this.document.getElementById(this.ID) as HTMLInputElement;
    }
    this.inputRef.click();
  }

  getFileName() {
    if (this.fileToUpload) {
      const name = this.fileToUpload.name.split('.');
      name.pop();
      return name.join('.');
    }
  }

  getFileExtension() {
    if (this.fileToUpload) {
      const props = this.fileToUpload.name.split('.');
      return this.fileToUpload.type ? `${this.fileToUpload.type}:NATIVE` : props[props.length - 1];
    }
  }

}
