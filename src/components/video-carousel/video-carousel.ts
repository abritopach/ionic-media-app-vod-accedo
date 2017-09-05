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
    historyVideos: any = [];

    @Input()
    set videosData(videos: Array<Object>) {
        this.videos = videos;
        console.log(this.videos);
    }

    constructor() {
        console.log('Hello VideoCarouselComponent Component');
        this.historyVideos = localStorage.getItem('historyVideos') ? JSON.parse(localStorage.getItem('historyVideos')) : [];
    }

    handleSelectedVideo(video) {
        console.log("handleSelectedVideo");
        console.log(video);

        let elem = document.getElementById(video.id);

        this.handleFullScreenVideo(video, elem);
    }

    handleFullScreenVideo(selectedVideo, elem) {

        // Reset video.
        elem.pause();
        elem.currentTime = 0;
        elem.load();

        if (elem != null) {

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }

            // Show loading animation.

            let playPromise = elem.play();

            if (playPromise !== undefined) {

                var exists = false;
                for (var i = 0; i < this.historyVideos.length; i++) {
                    if (this.historyVideos[i].id === selectedVideo.id) {
                        exists = true;
                        this.historyVideos[i].countViews = this.historyVideos[i].countViews + 1;
                        localStorage.setItem('historyVideos', JSON.stringify(this.historyVideos));
                        break;
                    }
                }

                if (exists === false) {

                    selectedVideo.countViews = 1;
                    this.historyVideos.push(selectedVideo);
                    localStorage.setItem('historyVideos', JSON.stringify(this.historyVideos));
                }

                playPromise.then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                        console.log(error);
                    });
            }

            // Video Ended.
            document.getElementById(selectedVideo.id).addEventListener('ended', () => {
                elem.webkitExitFullScreen();
            }, false)

            // Full Screen Change.
            document.addEventListener('webkitfullscreenchange', () => {

                let isFullScreen = document.fullscreenElement || document.webkitIsFullScreen;

                if (!isFullScreen) {
                    elem.pause();
                    elem.currentTime = 0;
                    elem.load();
                }

            }, false);

        }
    }

}
