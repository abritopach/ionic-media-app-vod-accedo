import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the MoviesServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class MoviesServiceProvider {

    data: any;
    static MOVIES_API_ENDPOINT: string = 'https://demo2697834.mockable.io/movies';

    constructor(public http: Http) {
        console.log('Hello MoviesServiceProvider Provider');
    }

    getAll() {
        // Don't have the data yet.
        return new Promise(resolve => {

            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            //this.http.get(this.environment.getURL() + 'shopping_list/getAll', { search: params })
            this.http.get(MoviesServiceProvider.MOVIES_API_ENDPOINT)
                .map(res => res.json())
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    //console.log(data);
                    this.data = data;
                    resolve(this.data.entries);
                },
                    err => {
                    console.log("ERROR -> " + JSON.stringify(err));
                });
        });
    }

}
