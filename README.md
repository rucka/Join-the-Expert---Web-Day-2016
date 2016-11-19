# Join the Expert WebDay 2016 @UgiDotNet
Here both the slides and demos of my session "Typescript: A stitch in time saves nine" @UgiDotNet - [Join the Expert Web Day 2016]( http://www.ugidotnet.org/eventi/48/Join-the-Expert--Web-Day).

## System requirements
In order to run the demos you need Visual Studio 2015: open one of the projects with the IDE, build and run.
In alternative, you can try each demo just following this steps:
- Convert Views/Home/Hello.aspx, Views/Customer/Register.aspx Views/Customer/Completed.aspx pages to html (follow [this guide](https://www.quora.com/How-do-I-convert-ASP-NET-razor-view-pages-cshtml-into-plain-html-view-pages-in-Entity-Framework-ADO-NET-data-model) if you need).
- Install [Typescript compiler locally](https://www.typescriptlang.org/index.html#download-links) (just one time).
- Compile the typescript files with the tsc compiler.
- Serve the html pages from a local web server (if you havent one follow [this guide](http://jasonwatmore.com/post/2016/06/22/nodejs-setup-simple-http-server-local-web-server)).

## Demos
- 1 - [Javascript only](demo/1-BeforeTypescript) implementation: that's the starting point of the hello world demo and register customer form demo.
- 2 - [Getting started with Typescript](demo/2-GettingStartedWithTypescript): it shows how to use generic type in Typescript to support two different ajax endpoints consumed by the above hello world demo. The above register customer demo is implemented using class ES6 feature (OOP way).
- 3 - [Functional validation sample with Typescript](demo/3-FunctionalTypescript): it shows how to implement the register customer demo in a Functional Programming way using [Generics](https://www.typescriptlang.org/docs/handbook/generics.html), [Union type and Discriminated unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html) Typescript features. 

## Slides
The slide markup has been compatible with [Deckset app for OSX](http://www.decksetapp.com). If you need, you can give a try of the trial version available in the [website](http://www.decksetapp.com/try.html).

The slides are also published on [slideshare](http://www.slideshare.net/rucka/typescript-a-stitch-in-time-saves-nine).

## Questions?
Contact me at contact.gianluca@carucci.org
