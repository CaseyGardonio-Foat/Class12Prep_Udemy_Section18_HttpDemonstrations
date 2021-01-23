import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from 'rxjs/operators'

export class GenericInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({headers: req.headers.append('AuthKey', 'Lucky7')});
    console.log("Request intercepted, modified, and sent")
    return next.handle(modifiedRequest).pipe(tap(event=>{
      console.log(event);
      if(event.type === HttpEventType.Response) {
        console.log('Response Arrived; Body Data: ');
        console.log(event.body);
      }
    }));
  }
}