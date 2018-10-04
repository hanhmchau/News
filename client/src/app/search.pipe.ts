import { Pipe, PipeTransform } from "@angular/core";

import Post from "./post";

@Pipe({ name: "search" })
export class SearchPipe implements PipeTransform {
    transform(value: Post[], phrase: string) {
        if (phrase) {
            return value.filter(post => post.name.indexOf(phrase) > -1);
        }
        return value.slice();
    }
}