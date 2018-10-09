import { Pipe, PipeTransform } from "@angular/core";
const textVersion = require("textversionjs");

@Pipe({ name: "blurbify" })
export class BlurbifyPipe implements PipeTransform {
    transform(htmlString: string) {
        return textVersion(htmlString, {
            imgProcess: () => ''
        }).slice(0, 250).trim() + '...';
    }
}