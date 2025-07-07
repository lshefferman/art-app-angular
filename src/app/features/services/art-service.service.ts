import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtServiceService {
  // private apiUrl: string =
  //   'https://collectionapi.metmuseum.org/public/collection/v1';

  private selectedArt = new BehaviorSubject<any>(null);

  setArtwork(art: any) {
    this.selectedArt.next(art);
  }

  constructor(private http: HttpClient) {
    console.log('ArtServiceService created', Math.random());
  }

  getArtworks(query: string): Observable<{ objectIDs: number[] }> {
    console.log(`Fetching artworks from ${query}`);
    return this.http.get<{ objectIDs: number[] }>(
      `/api/search?q=${encodeURIComponent(query)}`
    );
  }

  getArtworkById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.get<any>(`/api/objects/${id}`, { headers });
  }
}
