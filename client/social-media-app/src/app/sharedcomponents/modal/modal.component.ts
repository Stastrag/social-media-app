import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommentsService } from 'src/app/comments/comments.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  constructor(public dialog: MatDialog) {}
  @Input() postId!: string;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log(this.postId);
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.postId,
    });
  }
}


@Component({
  selector: 'ModalComponent-dialog',
  templateUrl: './ModalComponent-dialog.html',
  styleUrls: ['./modal.component.scss']
})
export class DialogAnimationsExampleDialog implements OnInit {
  @Input() postId!: string;
  public comments : any;

  constructor(
      public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
      @Inject(MAT_DIALOG_DATA) data: string,
      public commentsService: CommentsService,
      public matDialogModule: MatDialogModule
    ) {
      this.postId = data;
    }


  ngOnInit() {
    this.fetchCommentsByPostId(this.postId);
  }

  fetchCommentsByPostId(postId: string) {
    this.commentsService.fetchCommentsByPostId(postId).subscribe(
      (response) => {
        console.log(response)
        this.comments = response;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );  
  }
}
