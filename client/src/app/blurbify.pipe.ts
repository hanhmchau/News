import { Pipe, PipeTransform } from "@angular/core";
const textVersion = require("textversionjs");
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

@Pipe({ name: "blurbify" })
export class BlurbifyPipe implements PipeTransform {
    transform(htmlString: string) {
        const encodedText = textVersion(htmlString, {
            imgProcess: () => ''
        }).slice(0, 250).trim() + '...';
        return entities.decode(encodedText);
    }
}