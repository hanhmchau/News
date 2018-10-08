import { AuthorPostComponent } from "./author-post/author-post.component";
import { SinglePostComponent } from "./single-post/single-post.component";
import { PostContainerComponent } from "./post-container/post-container.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ManagePostComponent } from "./manage-post/manage-post.component";
import { RegisterComponent } from "./register/register.component";
import { NoAuthGuard } from "./noauth.guard";
import { JournalistGuard } from "./journalist.guard";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
    {
        path: "",
        component: PostContainerComponent,
        pathMatch: "full"
    },
    {
        path: "post/:id",
        component: SinglePostComponent
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: "new-post",
        component: ManagePostComponent,
        canActivate: [JournalistGuard]
    },
    {
        path: "manage-post/:id",
        component: ManagePostComponent,
        canActivate: [JournalistGuard]
    },
    {
        path: "me",
        component: AuthorPostComponent,
        canActivate: [JournalistGuard]
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: "forbidden",
        component: ForbiddenComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }
    // {
    //     path: "user/:id",
    //     component: UserComponent
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
