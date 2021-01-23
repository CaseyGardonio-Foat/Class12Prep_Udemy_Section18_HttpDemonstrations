import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //add logging code here
    console.log("Logging Interceptor works!");
    return next.handle(req).pipe(tap(event => {
      if(event.type === HttpEventType.Response) {
        console.log('Incoming Response: ');
        console.log(event.body);
      }
    }));
  }
}