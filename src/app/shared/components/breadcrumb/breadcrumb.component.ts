import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';

interface BreadCrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: BreadCrumb[] = [];

  @Input()
  public append: BreadCrumb;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const ROUTE_DATA_PATH = 'path';
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      // First, I had lazy loaded routes where I had data on the route in the form of breadcrumb.
      // When running through getBreadcrumbs, the breadcrumb label would show twice.
      // I resolved this by adding the following lines:
      if (child.snapshot.url.map(segment => segment.path).length === 0) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
      if (child.snapshot.data[ROUTE_DATA_BREADCRUMB] === null) {
        continue;
      }
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      url += `/${routeURL}`;
      const breadcrumb: BreadCrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: {}, //child.snapshot.params,
        url: child.snapshot.data[ROUTE_DATA_PATH] || url
      };
      breadcrumbs.push(breadcrumb);
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  private isParam(params: Params, segment: string) {
    for (const key of Object.keys(params)) {
      const value = params[key];
      if (value === segment) {
        return true;
      }
    }
    return false;
  }

  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const root: ActivatedRoute = this.activatedRoute.root;
    this.breadcrumbs = this.getBreadcrumbs(root);
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(event => {
        this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
      });
  }

}
