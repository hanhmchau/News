import { SafeStylePipe } from './safe-style.pipe';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostComponent } from './post/post.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoService } from './todo.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './category.service';
import { PostService } from './post.service';
import { PostContainerComponent } from './post-container/post-container.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { JwtModule } from '@auth0/angular-jwt';
import { RoutingService } from './routing.service';
import { EditorComponent } from './editor/editor.component';

const tokenGetter = () => localStorage.getItem("token");

@NgModule({
    declarations: [
        // add components here
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        PostContainerComponent,
        PostComponent,
        SinglePostComponent,
        LoginComponent,
        ManagePostComponent,
        EditorComponent,
        SafeStylePipe
    ],
    imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                whitelistedDomains: [
                    'localhost:3000',
                    '%herokuapp%'
                ]
            }
        }) ],
    exports: [],
    providers: [
        // add injectable things here
        TodoService,
        CategoryService,
        PostService,
        UserService,
        RoutingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}