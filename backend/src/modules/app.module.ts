import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { CandidatesModule } from './candidates/candidates.module';
import { CandidatesService } from '../services/candidates/candidates.service';

// this may be useful later to add disk storage
// import { MulterModule } from '@nestjs/platform-express';
// [....]
// @Module({
//   imports: [
//     MulterModule.register({
//       dest: './candidates', // optional if you're using memory storage
//     }),
//     UploadModule,
//  ],


@Module({
  imports: [CandidatesModule],
  controllers: [AppController],
  providers: [AppService, CandidatesService],
})
export class AppModule {}
