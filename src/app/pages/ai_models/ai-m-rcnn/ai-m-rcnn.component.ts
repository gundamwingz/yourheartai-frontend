import { Component } from '@angular/core';
import { AIModelService } from 'src/app/shared/services/ai.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SelectService } from 'src/app/shared/services/select.services';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/data/interface/file-handle.model';
import { ToastrService } from 'ngx-toastr';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-ai-m-rcnn',
  templateUrl: './ai-m-rcnn.component.html',
  styleUrl: './ai-m-rcnn.component.css',
})
export class AiMRcnnComponent {

  loading = false;
  userImage: FileHandle[] = [];
  aiPrediction: any;
  aiImage_url: string;
  
  constructor(
    public selectService: SelectService,
    private authService: AuthService,
    private aiService: AIModelService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,

  ) { }

  getPrediction(){

  }

  onFileSelected(event){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.userImage.push(fileHandle)
    }
  }

  onSubmit() {
    this.loading = true;

  }

  submitCNNImage(){
    const file: FileHandle = this.userImage[0];
    this.aiService.postStenosisCNNImage(file).pipe(first()).subscribe({      
      next: (res) => {
        this.toastr.success("Run complete, see results below.");
        this.aiPrediction = res;
        this.aiImage_url = this.authService.getFullBaseUrl()+this.aiPrediction.image_url;  
      },
      error: error => {
        this.loading = false;
        this.toastr.error(error.error.message);
      }
    });
    this.userImage = [];
  }

}


