import {NgModule} from '@angular/core';
import {SlugPipe} from './slug.pipe';
import {UrlPipe} from './url.pipe';
import {PhonePipe} from './phone.pipe';
import {UnSlugPipe} from './unslug.pipe';
import {ImageUrlPipe} from './image.url.pipe';

@NgModule({
  declarations: [
    SlugPipe,
    UrlPipe,
    PhonePipe,
    UnSlugPipe,
    ImageUrlPipe,
  ],
  exports: [
    SlugPipe,
    UrlPipe,
    PhonePipe,
    UnSlugPipe,
    ImageUrlPipe,
  ]
})
export class PipeModule {

}
