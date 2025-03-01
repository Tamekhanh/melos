import { Component } from '@angular/core';
import { PlaylistCardComponent } from '../../shared/components/playlist-card/playlist-card.component';
import {MusicCardComponent} from '../../shared/components/music-card/music-card.component';
import { MaterialModule } from '../../shared/material.module'; // Import MaterialModul
import {DialogCreateNewPlaylistComponent} from '../../shared/components/dialog-create-new-playlist/dialog-create-new-playlist.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [PlaylistCardComponent,MaterialModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})

export class PlaylistComponent {

  constructor(private newPLaylist: MatDialog) {
  }
  openDialogCreatNewList(){
    this.newPLaylist.open(DialogCreateNewPlaylistComponent, {
      width: '40vw',
      maxWidth:'none',
      data: {message: 'noi dung'}
    })
  }

  playlists = [
    {
      id: 1,
      name: 'Radio',
      img: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/5/5/6/8/5568d11517ab8e384132d7f1c9e9434e.jpg',
      comment: '',
      tag: '',
      category: 'Anison',
      singer_name: '',
    },
    {
      id: 2,
      name: 'Taylor Swift',
      img: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Taylor_Swift_-_Taylor_Swift.png',
      comment: '',
      tag: '',
      category: 'Country music',
      singer_name: 'Taylor Swift',
    },
    {
      id: 3,

      name: 'Your playlist',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQat97yEF4kAwu3VAg-y8CxpP4GUGAvZEIMOye1RQ7ICXElVlz_drAm8_xga1fNXHvr0GA&usqp=CAU',
      comment: '',
      tag: '',
      category: 'Country music',
      singer_name: 'Taylor Swift',
    },
  ];
}
