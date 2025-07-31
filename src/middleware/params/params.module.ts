import { Module } from '@nestjs/common';
import { ParamsService } from './params.service';

@Module({
  providers: [ParamsService],
  exports: [ParamsService],
})
export class ParamsModule {}
