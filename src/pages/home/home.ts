import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoviesServiceProvider } from '../../providers/movies-service/movies-service';

import { HistoryPage } from '../history/history';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [MoviesServiceProvider]
})
export class HomePage {

    videos: any;

    constructor(public navCtrl: NavController, public moviesService: MoviesServiceProvider) {

    }

    ionViewDidLoad() {
        this.moviesService.getAll()
            .then(data => {
                //console.log(data);
                this.videos = data;
            });
    }

    handleClickHistory() {
        this.navCtrl.push(HistoryPage);
    }

}
