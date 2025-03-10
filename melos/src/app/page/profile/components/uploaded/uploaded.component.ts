import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../../../models/auth.model';
import {SongModel} from '../../../../models/song.model';
import  * as UploadActions from '../../../../ngrx/uploaded/uploaded.actions';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {UploadState} from '../../../../ngrx/uploaded/uploaded.state';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';
import {MusicTabComponent} from '../../../../shared/components/music-tab/music-tab.component';
import {SongState} from '../../../../ngrx/song/song.state';
import  * as SongActions from '../../../../ngrx/song/song.actions';

@Component({
  selector: 'app-uploaded',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingComponent,
    MusicTabComponent,
    NgIf
  ],
  templateUrl: './uploaded.component.html',
  styleUrl: './uploaded.component.scss'
})
export class UploadedComponent implements OnInit, OnDestroy {
  auth$!: Observable<AuthModel | null>;
  uploadSongList$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  authData: AuthModel | null = null;
  uploadSongList: SongModel[] = [];
  isLoading$!: Observable<boolean>;
  songsList$!: Observable<SongModel[]>;

  constructor(
    private store: Store<{
      auth: AuthState;
      upload: UploadState;
      songs: SongState;
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.isLoading$ = this.store.select('upload', 'isLoading');
    this.songsList$ = this.store.select('songs', 'songList');
    this.uploadSongList$ = this.store.select('upload', 'uploadSongList');

  }

  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((auth) => {
        if (auth?.uid) {
          this.authData = auth;
          console.log('authData', this.authData);
          this.store.dispatch(

            UploadActions.getUploadSongList({
              uid: this.authData.uid ?? '',
              idToken: this.authData.idToken ?? '',
            }),
          );
        }
      }),

      this.uploadSongList$.subscribe((uploadSongList) => {
        // console.log(uploadSongList);
        if (uploadSongList.length > 0) {
          this.uploadSongList = uploadSongList;
          console.log('uploadSongList', this.uploadSongList);
        } else {
          this.uploadSongList = []; // Đảm bảo luôn có giá trị mặc định
        }
      }),
    );

    // this.songsList$.subscribe((songs) => {
    //   console.log('Danh sách bài hát từ API:', songs);
    // });

    // Gọi API để lấy danh sách bài hát
    this.store.dispatch(SongActions.getSongList());


    if (this.authData) {
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}






