import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { UtilService } from './util.service';

@NgModule({
  imports: [CommonModule],
  providers: [LoggerService, UtilService]
})
export class UtilModule {}
