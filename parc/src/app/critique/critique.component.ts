import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CommentInterface } from '../Interface/comment.interface';
import { CommentService } from '../Service/comment.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-critique',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './critique.component.html',
  styleUrl: './critique.component.scss'
})
export class CritiqueComponent implements OnInit {
  public formulaireComments: FormGroup[] = [];
  public id!: number;

  constructor(public commentService: CommentService, public formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _Activatedroute: ActivatedRoute)
  {}

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = parseInt(idParam, 10); // Convert string to number
      }
    });
  }

  public comments: Observable<CommentInterface[]> = this.commentService.getCommentsForAttraction(1).pipe(tap((commentaires:CommentInterface[]) => {
    console.log(commentaires);
    if (commentaires.length === 0) return;
    commentaires.forEach(commentaire => {
      this.formulaireComments.push(
        new FormGroup({
          note: new FormControl(commentaire.note, [Validators.required]),
          commentaire: new FormControl(commentaire.commentaire, [Validators.required]),
        })
      );
    });
  }));

  public onSubmitComment(commentaireFormulaire: FormGroup) {
    console.log(commentaireFormulaire)
    this.commentService.addComment(commentaireFormulaire.getRawValue()).subscribe(result => {
      commentaireFormulaire.patchValue({comment_id: result.result});
      this._snackBar.open(result.message, undefined, {
        duration: 1000
      });
    });
  }

  public addComment() {
    this.formulaireComments.push(
      new FormGroup({
        note: new FormControl(),
        commentaire: new FormControl(),
      })
    );
  }
}
