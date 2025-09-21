import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';

//commonModule درواقع واسطی ساختیم میان اپلیکیشن و
/**
 *  را اینپورت کنیم coreModule  حالا اگر در فایل های دیگری این
 *  CommonModule به این ماژول دسترسی داشته باشم app.service   و حالا میتوانیم برای مثال در
 */
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
