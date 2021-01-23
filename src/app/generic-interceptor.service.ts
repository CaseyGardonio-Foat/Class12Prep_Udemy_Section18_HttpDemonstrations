import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class GenericInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({headers: req.headers.append('AuthKey', 'Lucky7')});
    return next.handle(modifiedRequest);
  }
}