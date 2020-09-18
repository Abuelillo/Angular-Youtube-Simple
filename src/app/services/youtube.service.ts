import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey ='AIzaSyDcynq-n16c-i157nnc-aQ913qT2vpxx84';
  private playlist='UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken='';

  constructor(private http:HttpClient) { }

  getVideos(){
    
    const url =`${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams()
                        .set('part','snippet')
                        .set('maxResults','20')
                        .set('playlistId',this.playlist)
                        .set('key',this.apikey)
                        .set('pageToken',this.nextPageToken);
                        
    return this.http.get<YoutubeResponse>(url,{params})
                    .pipe(
                      map(res => {
                      this.nextPageToken = res.nextPageToken;
                      return res.items;
                      }),
                      map(item => {
                        return item.map(video => video.snippet);
                      })
                    );
  }
}
