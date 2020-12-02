import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  // Lógica interna
  fileToUpload: File = null;
  hasFileName = false;

  // Tipos de arquivos válidos (caso não seja informado, aceitará todos os tipos)
  @Input() allowedTypes: string[];

  // Evento disparado quando um arquivo é selecionado
  @Output() fileChange: EventEmitter<File> = new EventEmitter();

  // Referência de origem do arquivo
  @ViewChild('fileInput') inputRef: ElementRef<HTMLInputElement>;

  constructor(private toast: ToastService) {}

  handleFileInput(files: FileList) {
    const fileToUpload = files?.item(0);
    if (!fileToUpload) {
      return;
    }
    const ok = this.allowedTypes ? this.allowedTypes.includes(this.getFileExtension(fileToUpload)) : true;
    if (ok) {
      this.fileToUpload = fileToUpload;
      this.upload();
    } else {
      this.toast.show(`${fileToUpload.name} não é um arquivo válido`, 'danger');
    }
  }

  upload() {
    this.hasFileName = true;
    this.fileChange.emit(this.fileToUpload);
  }

  trigger() {
    this.inputRef.nativeElement.click();
  }

  getFileName() {
    if (this.fileToUpload) {
      const name = this.fileToUpload.name.split('.');
      name.pop();
      return name.join('.');
    }
  }

  getFileExtension(file: File) {
    if (file) {
      const props = file.name.split('.');
      return file.type ? file.type : props[props.length - 1];
    }
  }

}
