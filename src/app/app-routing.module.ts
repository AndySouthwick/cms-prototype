import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PageComponent} from './pages/page/page.component';
import {ImageToolComponent} from './pages/image-tool/image-tool.component';
import {TypeCreatorComponent} from './pages/type-creator/type-creator.component';
import {AdminComponent} from './pages/admin/admin.component'
import {AddPageEditPageComponent} from './components/add-page-edit-page/add-page-edit-page.component';
import {AddContentComponent} from './components/add-content/add-content.component';
import {TemplateAreaCreatorComponent} from "./pages/template-area-creator/template-area-creator.component";
@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: HomeComponent},
    {path: 'dashboard/image-service', component: ImageToolComponent},
    {path: 'preview/page/:id', component: PageComponent},
    {path: 'dashboard/type-creator', component: TypeCreatorComponent},
    {path: 'dashboard/template-area-creator', component: TemplateAreaCreatorComponent},
    {path: 'dashboard/template-area-creator/:templateId', component: TemplateAreaCreatorComponent},
    {path: 'dashboard', component: AdminComponent},
    {path: 'dashboard/add-edit', component: AddPageEditPageComponent},
    {path: 'dashboard/add-edit/:pageId', component: AddPageEditPageComponent},
    {path: 'dashboard/add-edit/:pageId/:contentTypeName', component: AddContentComponent},
    {path: 'dashboard/add-edit/:pageId/:contentTypeName/:contentId', component: AddContentComponent},



  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
