import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/interfaces/comic';
import { Character } from 'src/app/interfaces/general';
import { Serie } from 'src/app/interfaces/serie';
// Enviroment
import { environment } from '../../../environments/environment';
// services
@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss']
})
export class ComicCardComponent implements OnInit {
  @Input() product: (Comic | Serie )| any;
  comicThumbnail: string = '';
  comicUrl = `${environment.baseUrl}/comic/`;
  constructor() { }

  ngOnInit(): void {
    this.comicThumbnail = `${this.product?.thumbnail.path}.${this.product?.thumbnail.extension}`;
    this.comicUrl += this.product?.id;
  }
 
}
