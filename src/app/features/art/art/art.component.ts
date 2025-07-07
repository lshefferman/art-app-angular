import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtServiceService } from '../../services/art-service.service';
import { from, of } from 'rxjs';
import {
  concatMap,
  delay,
  filter,
  map,
  toArray,
  catchError,
} from 'rxjs/operators';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css'],
})
export class ArtComponent implements OnInit {
  artworks: any[] = [];
  selectedArt: any = null;

  constructor(
    private artService: ArtServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const query = params.get('query') || 'cats';
      this.fetchArtworks(query);
    });
  }

  fetchArtworks(query: string): void {
    this.artService.getArtworks(query).subscribe((result) => {
      const ids = (result?.objectIDs || []).slice(0, 50); // Get a few more in case some have no image

      from(ids)
        .pipe(
          concatMap((id) =>
            this.artService.getArtworkById(id).pipe(
              delay(200), // Delay between requests (200ms)
              filter((artwork) => !!artwork?.primaryImage),
              catchError((error) => {
                console.error(`Error fetching artwork with ID ${id}`, error);
                return of(null); // Continue even on error
              })
            )
          ),
          filter((art) => art !== null),
          toArray(),
          map((artworks) => artworks.slice(0, 10)) // Take first 10 with images
        )
        .subscribe((artworksWithImages) => {
          this.artworks = artworksWithImages;
          console.log(
            `Loaded ${this.artworks.length} artworks for query: ${query}`
          );
        });
    });
  }

  onArtSelected(art: any): void {
    this.selectedArt = art;
    this.artService.setArtwork(art);
    console.log('Selected art:', this.selectedArt);
  }
}
