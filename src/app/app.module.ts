import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ComponentDisplayComponent } from './components/component-display/component-display.component';
import { HomeComponent } from './pages/home/home.component';
import { PageComponent } from './pages/page/page.component';
import { CardSectionComponent } from './components/card-section/card-section.component';
import { TextLeftSectionComponent } from './components/text-left-section/text-left-section.component';
import { TextRightSectionComponent } from './components/text-right-section/text-right-section.component';
import { TextCenteredSectionComponent } from './components/text-centered-section/text-centered-section.component';
import {
  UsanaHeroSliderModule, UsanaCardModule, UsanaFormInputModule, UsanaButtonModule,
  UsanaTextArea, UsanaSelectInputModule, UsanaAlertModule, CoverSliderModule
} from '@usana/component-library';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { setContext } from 'apollo-link-context';
import { ImageToolComponent } from './pages/image-tool/image-tool.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { setTheme } from 'ngx-bootstrap/utils';
import { ImageFolderSectionComponent } from './components/image-folder-section/image-folder-section.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { TypeCreatorComponent } from './pages/type-creator/type-creator.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { AddPageEditPageComponent } from './components/add-page-edit-page/add-page-edit-page.component';
import { AddContentComponent } from './components/add-content/add-content.component';
import { DragulaModule } from 'ng2-dragula';
@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    ComponentDisplayComponent,
    HomeComponent,
    PageComponent,
    CardSectionComponent,
    TextLeftSectionComponent,
    TextRightSectionComponent,
    TextCenteredSectionComponent,
    AdminComponent,
    LoginComponent,
    ImageToolComponent,
    AddImageComponent,
    ImageFolderSectionComponent,
    ImageDetailsComponent,
    TypeCreatorComponent,
    NavigationComponent,
    SideNavigationComponent,
    AddPageEditPageComponent,
    AddContentComponent,
  ],
  imports: [
    CKEditorModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    UsanaHeroSliderModule,
    UsanaCardModule,
    UsanaFormInputModule,
    UsanaButtonModule,
    UsanaTextArea,
    UsanaSelectInputModule,
    UsanaAlertModule,
    CoverSliderModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    DragulaModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    setTheme('bs4')
    const http = httpLink.create({uri: 'http://localhost:4000'});
    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: headers.append('Authorization', `Bearer ${token}`)
        };
      }
    });
    //no-cache fetch policy to force update every time
    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "no-cache"
        }
      }
    });
  }
}
