import { Pipe, PipeTransform } from "@angular/core";

import Post from "./post";

@Pipe({ name: "paginate" })
export class PaginatePipe implements PipeTransform {
    transform(value: Post[], page: number, pageSize: number) {
        const offset = (page - 1) * pageSize;
        return value.slice(offset, offset + pageSize);
    }
}
