import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { 
      title: "Base",
      showInNavbar: false,
      include: true,// used include here to read parent path into routing
  },
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
