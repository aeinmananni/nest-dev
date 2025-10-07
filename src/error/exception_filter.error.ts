/* eslint-disable prettier/prettier */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 *  زمانی که ما ارروی را ست میکنیم این متد فرا خوانی میشود
 * catch(exception: HttpException, host: ArgumentsHost) {...}
 * host: ArgumentsHost : میتوانیم به اطلاعات رکوئست و ریسپانس دسترسی داشته باشیم و به حالتی که میخواهیم ان را تبدیل کنیم
 * ---------------------------------------------------------------------------------------------
 * const ctx = host.switchToHttp(); : هستند وما میتوانیم برای وب سوکت ها نیز این اکسپشن فیلتر را استفاده کنیمhttp درخواست های ما از نوع
 * ----------------------------------------------------------------------------------------------
 * const response = ctx.getResponse<Response>(); : دسترسی به پاسخ ها
 * ---------------------------------------------------------------------
 * const request = ctx.getRequest<Request>(); : دسترسی به درخواست
 * ----------------------------------------------------------------------
 * const status = exception.getStatus(); استاتوس ورودی درخواست را نیز میتوانیم بگیریم
 */

@Catch() //http اینجا میگوییم فقط برای اررو های مربوط به
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };
    this.logger.error(
      `[${request.method}] ${request.url}`,
      JSON.stringify(errorResponse),
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json(errorResponse);
  }
}
