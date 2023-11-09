import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

// setup  storage like Redis or MemCached
const filePath = 'storage.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
  } catch (error) {
    await fs.promises.writeFile(
      filePath,
      JSON.stringify({ tokenBlackList: [] }),
    );
  }
}
bootstrap();
