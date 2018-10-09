import { Pipe, PipeTransform } from "@angular/core";
const textVersion = require("textversionjs");

@Pipe({ name: "blurbify" })
export class BlurbifyPipe implements PipeTransform {
    transform(htmlString: string) {
        if (!htmlString) return '';
        let short = htmlString.slice(0, 450).trim();
        return short.substring(0, short.lastIndexOf(' ')) + '...';
    }
}