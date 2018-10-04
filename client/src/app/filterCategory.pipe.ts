import { Pipe, PipeTransform } from "@angular/core";

import Post from "./post";

@Pipe({ name: "filterCategory" })
export class FilterCategoryPipe implements PipeTransform {
    transform(value: Post[], categoryId: number) {
        if (categoryId) {
            return value.filter(post => post.categoryid === categoryId);
        }
        return value.slice();
    }
}