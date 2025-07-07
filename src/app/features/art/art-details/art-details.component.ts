import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-art-details',
  templateUrl: './art-details.component.html',
  styleUrls: ['./art-details.component.css'],
})
export class ArtDetailsComponent implements OnInit {
  @Input() art: any;
  constructor() {}

  ngOnInit(): void {}
}
