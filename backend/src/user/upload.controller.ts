import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return {
      status: 'Success',
      data: `http://localhost:3001/api/${file.path}`,
    };
  }

  @Get('uploads/borders/:path')
  async getBorder(@Param('path') path, @Res() res) {
    res.sendFile('borders/' + path, { root: 'uploads' });
  }

  @Get('uploads/emblems/:path')
  async getEmblem(@Param('path') path, @Res() res) {
    res.sendFile('emblems/' + path, { root: 'uploads' });
  }

  @Get('uploads/:path')
  async getImage(@Param('path') path, @Res() res) {
    res.sendFile(path, { root: 'uploads' });
  }
}
