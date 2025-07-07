import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css'],
})
export class ArtListComponent implements OnInit {
  @Input() artworks: any[] = [];
  @Output() artworkSelected = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onArtworkSelected(artwork: any): void {
    this.artworkSelected.emit(artwork);
  }
}
