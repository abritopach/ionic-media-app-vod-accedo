import { Component, Input } from '@angular/core';

/**
 * Generated class for the VideoCarouselComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'video-carousel',
    templateUrl: 'video-carousel.html'
})
export class VideoCarouselComponent {

    videos: any;

    @Input()
    set videosData(videos: Array<Object>) {
        this.videos = videos;
        console.log(this.videos);
    }

    constructor() {
        console.log('Hello VideoCarouselComponent Component');
    }

}
