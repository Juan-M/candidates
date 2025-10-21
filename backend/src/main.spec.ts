import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

jest.mock('@nestjs/core');
jest.mock('@nestjs/swagger');

@Module({})
class MockModule {}
jest.mock('./modules/app.module', () => ({
  AppModule: {
    forRootAsync: jest.fn().mockImplementation(() => MockModule),
  },
}));

describe('Bootstrap', () => {
  let mockApp: {
    enableCors: () => void;
    listen: () => void;
  };

  beforeEach(() => {
    mockApp = {
      enableCors: jest.fn(),
      listen: jest.fn(),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
    (SwaggerModule.createDocument as jest.Mock).mockReturnValue('swagger-doc');
    (DocumentBuilder as jest.Mock).mockReturnValue({
      setTitle: () => ({
        setDescription: () => ({
          setVersion: () => ({
            addTag: () => ({ build: () => 'setupObject' }),
          }),
        }),
      }),
    });
  });

  it('should initialize the app, setup Swagger, enable CORS, and listen on the expected port', async () => {
    process.env.PORT = '4000';
    const { bootstrap } = require('./main') as {
      bootstrap: () => Promise<void>;
    };

    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(SwaggerModule.createDocument).toHaveBeenCalledWith(
      mockApp,
      'setupObject',
    );
    expect(SwaggerModule.setup).toHaveBeenCalledWith(
      'api',
      mockApp,
      'swagger-doc',
    );
    expect(mockApp.enableCors).toHaveBeenCalled();
    expect(mockApp.listen).toHaveBeenCalledWith('4000');
  });
});
