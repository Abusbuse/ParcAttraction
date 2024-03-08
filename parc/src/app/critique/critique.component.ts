import { Component, Input } from '@angular/core';
import { CommentService } from '../Service/comment.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CommentInterface } from '../Interface/comment.interface';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AttractionInterface } from '../Interface/attraction.interface'; // Importez l'interface AttractionInterface

@Component({
  selector: 'app-critique',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './critique.component.html',
  styleUrl: './critique.component.scss'
})
export class CritiqueComponent {
  @Input() attraction!: AttractionInterface;

  constructor(public commentService: CommentService) {}
  
  public comments!: Observable<CommentInterface[]>; // Utilisation de "!" pour indiquer que cette propriété sera définie ultérieurement

  ngOnInit() {
    if (this.attraction && this.attraction.attraction_id !== null) {
      this.comments = this.commentService.getCommentsForAttraction(this.attraction.attraction_id);
    }
  }
}

