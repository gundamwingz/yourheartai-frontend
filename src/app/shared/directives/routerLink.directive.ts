import { Directive, Input, HostBinding, OnInit } from '@angular/core';
import { Router, RouteSegment, UrlTree } from '@angular/router';

@Directive({
    selector: '[routerLink]'
})
export class RouterActiveClass implements OnInit {
    private currentUrl: UrlTree;
    @Input('routerLink') private routerLink: any[];

    constructor(private routeSegment: RouteSegment, private router: Router) {
        this.router.changes.subscribe(() => this.updateCurrentUrl());
    }

    private updateCurrentUrl(): void {
        this.currentUrl = this.router.createUrlTree(this.routerLink, this.routeSegment);
    }

    @HostBinding('class.active')
    get isRouteActive(): boolean {
        return this.currentUrl ? this.router.urlTree.contains(this.currentUrl) : null;
    }

    ngOnInit() {
        this.updateCurrentUrl();
    }
}