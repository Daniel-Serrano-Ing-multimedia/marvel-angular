import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
// interfaces
import { Comic } from 'src/app/interfaces/comic';
import {
  Character,
  Creator,
  Date,
  Event,
  Story
} from 'src/app/interfaces/general';
//services
import { ComicService } from '../../services/comic.service';
@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit {
  comic:          Comic | any;
  comicThumbnail: string = '';
  creatorsList: Creator[] = [];
  charactersList: Character[] = [];
  datesList: Date[] = [];
  eventsList: Event[] = [];
  storiesList: Story[] = [];
  loading:        boolean = false;
  isError: boolean = false;
  relatedComics: Comic[] = [];
  constructor(private comicService: ComicService,
              private activatedRoute: ActivatedRoute) {
    
    this.activatedRoute.params.subscribe( params => {
      console.log(params['id']);
      this.getComic(params['id'] )
    });

  }
  
  ngOnInit(): void {
  }
  
  getComic( id: number ): void{
    this.comicService.getComic( id ).subscribe((result: any) => {
      this.comic = result.data.results[0];
      this.comicThumbnail = `${this.comic?.thumbnail.path}.${this.comic?.thumbnail.extension}`;
      this.loading = false;
      this.creatorsList = this.comic?.creators.items || [];
      this.charactersList = this.comic?.characters.items || [];
      this.datesList = this.comic?.dates.items || [];
      this.eventsList = this.comic?.events.items || [];
      this.storiesList = this.comic?.stories.items || [];
      // related comics
      this.getComicsRelated();
    }, (serrviceError => {
      this.isError = true;
      this.loading = false;
      console.log('serviceError : ', serrviceError);
    } ) );
  }

  getComicsRelated(): void{
    let param: string = 'title';
    let value: string = param === 'characters' ? this.charactersList[0]?.name : this.comic?.title.split(' ')?.[0];
    console.log({param, value});
    this.comicService.getRelatedComics(param, value).subscribe((result: any) => {
      this.relatedComics = result.data.results.slice(0 , 5);
      console.log( 'related', this.relatedComics )
    } );
  }
}
