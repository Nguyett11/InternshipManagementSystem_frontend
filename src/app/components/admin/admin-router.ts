import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { StudentAdminComponent } from "./student.admin/student.admin.component";
import { StudentAdminDetailComponent } from "./student.admin/student.admin.detail/student.admin.detail.component";
import { StudentAdminUpdateCreateComponent } from "./student.admin/student.admin.update.create/student.admin.update.create.component";
import { UserAdminUpdateAccountComponent } from "./user.admin/user.admin.update-account/user.admin.update-account.component";
import { CompanyAdminComponent } from "./company.admin/company.admin.component";
import { LecturerAdminComponent } from "./lecturer.admin/lecturer.admin.component";
import { MentorAdminComponent } from "./mentor.admin/mentor.admin.component";
import { LecturerAdminDetailComponent } from "./lecturer.admin/lecturer.admin.detail/lecturer.admin.detail.component";
import { MentorAdminDetailComponent } from "./mentor.admin/mentor.admin.detail/mentor.admin.detail.component";
import { UserAdminComponent } from "./user.admin/user.admin.component";
import { HomeAdminComponent } from "./home.admin/home.admin.component";


export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'home',
                component: HomeAdminComponent
            },
            //student
            {
                path: 'students',
                component: StudentAdminComponent
            },
            //sub routes student
            {
                path: 'students/:studentCode',
                component: StudentAdminDetailComponent
            },
            {
                path: 'students/update/:studentCode',
                component: StudentAdminUpdateCreateComponent
            },
            {
                path: 'lecturers/:id',
                component: LecturerAdminDetailComponent
            },
            {
                path: 'mentors/:id',
                component: MentorAdminDetailComponent
            },
            // {
            //     path: 'students/insert',
            //     component: StudentAdminInsertComponent
            // },
            //company
            {
                path: 'companies',
                component: CompanyAdminComponent
            },
            //supervisor
            {
                path: 'lecturers',
                component: LecturerAdminComponent
            },
            //mentor
            {
                path: 'mentors',
                component: MentorAdminComponent
            },
            {
                path: 'users',
                component: UserAdminComponent
            }
        ]
    },
];
