import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentComponent } from './components/student/student.component';
import { AuthGuardFn } from './guards/auth.guard';
import { StudentReportComponent } from './components/student/student.report/student.report.component';
import { StudentDetailComponent } from './components/student/student.detail/student.detail.component';
import { StudentLecturerComponent } from './components/student/student.lecturer/student.lecturer.component';
import { UserAdminComponent } from './components/admin/user.admin/user.admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { DetailReportStudentComponent } from './components/mentor/detail-report-student/detail-report-student.component';
import { InformationMentorComponent } from './components/mentor/information-mentor/information-mentor.component';
import { ManagementStudentsComponent } from './components/mentor/management-students/management-students.component';
import { StudentMentorComponent } from './components/student/student.mentor/student.mentor.component';
import { StudentCreateInternshipComponent } from './components/student/student.create.internship/student.create.internship.component';
import { StudentCompanyComponent } from './components/student/student.company/student.company.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { ListReportComponent } from './components/lecturer/list-report/list-report.component';
import { CreateReportComponent } from './components/lecturer/create-report/create-report.component';
import { SubmissionListComponent } from './components/lecturer/submission-list/submission-list.component';
import { ManagementStudentComponent } from './components/lecturer/management-student/management-student.component';
import { InformationLecturerComponent } from './components/lecturer/information-lecturer/information-lecturer.component';
import { MentorComponent } from './components/mentor/mentor.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },  
    { path: 'login', component: LoginComponent },  
    { path: 'register', component: RegisterComponent },
    // Student   
    { path: 'student', 
        component: StudentComponent, 
        canActivate: [AuthGuardFn], 
        children: [
            {
                path: '', 
                component: StudentReportComponent
            },
            {
                path: 'detail', 
                component: StudentDetailComponent
            },
            {
                path: 'report', 
                component: StudentReportComponent
            },
            {
                path: 'lecturer', 
                component: StudentLecturerComponent
            },
            {
                path: 'mentor', 
                component: StudentMentorComponent
            },
            {
                path: 'intership', 
                component: StudentCreateInternshipComponent
            },
            {
                path: 'company', 
                component: StudentCompanyComponent
            },
        ] },
    // Lecturer   
    { path: 'lecturer', component: LecturerComponent, canActivate:[AuthGuardFn],
        children: [
            {
                path: '', 
                component: ListReportComponent
            },
            {
                path: 'reportlist', 
                component: ListReportComponent
            },
            {
                path: 'createreport', 
                component: CreateReportComponent
            },
            {
                path: 'submissionlist/:id', 
                component: SubmissionListComponent
            },
            {
                path: 'managerstudent', 
                component: ManagementStudentComponent
            },
            {
                path: 'lecturerinfo', 
                component: InformationLecturerComponent
            },
        ]},
    // Mentor 
    { path: 'mentor', component: MentorComponent, canActivate:[AuthGuardFn],
        children: [
            {
                path: '', 
                component: ManagementStudentsComponent
            },
            {
                path: 'managementStudent',
                component: ManagementStudentsComponent
            },
            {
                path: 'informentor',
                component: InformationMentorComponent
            },
            {
                path: 'submissionByStudent',
                component: DetailReportStudentComponent
            }
        ]
    },
    // Admin   
    { path: 'admin', component: AdminComponent, canActivate:[AuthGuardFn],
        children: [
            {
                path: '', 
                component: UserAdminComponent
            },
        ]
    },
];
