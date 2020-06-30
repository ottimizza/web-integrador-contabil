import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptor } from './http.interceptor';

export const GlobalHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: GlobalHttpInterceptor,
  multi: true,
};
