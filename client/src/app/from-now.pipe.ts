import { Pipe, PipeTransform } from "@angular/core";
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import * as differenceInMonths from 'date-fns/difference_in_months';
import * as format from 'date-fns/format';

@Pipe({ name: "fromNow" })
export class FromNowPipe implements PipeTransform {
    transform(value: Date) {
        const today = new Date();
        if (differenceInMonths(today, value) >= 1) {
            return format(value, 'MMMM D, YYYY at h:mm a');
        }
        return distanceInWordsToNow(value, {
            addSuffix: true
        });
    }
}