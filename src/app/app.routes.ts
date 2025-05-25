import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentComponent } from './components/student/student.component';
import { AuthGuardFn } from './guards/auth.guard';
import { StudentWeeklyReportComponent } from './components/student/student.weekly-report/student.weekly-report.component';
import { StudentInformationStudentComponent } from './components/student/student.information-student/student.information-student.component';
import { StudentInformationLecturerComponent } from './components/student/student.information-lecturer/student.information-lecturer.component';
import { UserAdminComponent } from './components/admin/user.admin/user.admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentInformationMentorComponent } from './components/student/student.information-mentor/student.information-mentor.component';
import { StudentCreateInternshipComponent } from './components/student/student.create.internship/student.create.internship.component';
import { StudentCompanyComponent } from './components/student/student.company/student.company.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LecturerReportListComponent } from './components/lecturer/lecturer.report-list/lecturer.report-list.component';
import { LecturerCreateReportComponent } from './components/lecturer/lecturer.create-report/lecturer.create-report.component';
import { LecturerSubmissionListComponent } from './components/lecturer/lecturer.submission-list/lecturer.submission-list.component';
import { LecturerManagementStudentComponent } from './components/lecturer/lecturer.management-student/lecturer.management-student.component';
import { LecturerInformationLecturerComponent } from './components/lecturer/lecturer.information-lecturer/lecturer.information-lecturer.component';
import { MentorComponent } from './components/mentor/mentor.component';
import { StudentReportListComponent } from './components/student/student.report-list/student.report-list.component';
import { StudentCommentComponent } from './components/student/student.comment/student.comment.component';
import { LecturerStudentListComponent } from './components/lecturer/lecturer.student-list/lecturer.student-list.component';
import { LecturerInfofmationReportComponent } from './components/lecturer/lecturer.information-report/lecturer.information-report.component';
import { LecturerInformationStudentComponent } from './components/lecturer/lecturer.information-student/lecturer.information-student.component';
import { MentorStudentListComponent } from './components/mentor/mentor.student-list/mentor.student-list.component';
import { MentorInformationMentorComponent } from './components/mentor/mentor.information-mentor/mentor.information-mentor.component';
import { MentorStudentReportListComponent } from './components/mentor/mentor.report-list/mentor.student-report-list.component';
import { MentorCommentComponent } from './components/mentor/mentor.comment/mentor.comment.component';
import { MentorInformationStudentComponent } from './components/mentor/mentor.information-student/mentor.information-student.component';

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
                component: StudentWeeklyReportComponent
            },
            {
                path: 'detail', 
                component: StudentInformationStudentComponent
            },
            {
                path: 'weekly-report', 
                component: StudentWeeklyReportComponent
            },
            {
                path: 'report-list', 
                component: StudentReportListComponent
            },
            {
                path: 'lecturer', 
                component: StudentInformationLecturerComponent
            },
            {
                path: 'mentor', 
                component: StudentInformationMentorComponent
            },
            {
                path: 'intership', 
                component: StudentCreateInternshipComponent
            },
            {
                path: 'company', 
                component: StudentCompanyComponent
            },
            {
                path: 'student-comment', 
                component: StudentCommentComponent
            }
        ] },
    // Lecturer   
    { path: 'lecturer', component: LecturerComponent, canActivate:[AuthGuardFn],
        children: [
            {
                path: '', 
                component: LecturerReportListComponent
            },
            {
                path: 'report-list', 
                component: LecturerReportListComponent
            },
            {
                path: 'create-report', 
                component: LecturerCreateReportComponent
            },
            {
                path: 'information-report/:reportId', 
                component: LecturerInfofmationReportComponent
            },
            {
                path: 'submission-list/:id', 
                component: LecturerSubmissionListComponent
            },
            {
                path: 'managers-tudent', 
                component: LecturerManagementStudentComponent
            },
            {
                path: 'lecturer-info', 
                component: LecturerInformationLecturerComponent
            },
            {
                path: 'student-list', 
                component: LecturerStudentListComponent
            },
            {
                path: 'information-student/:user_id', 
                component: LecturerInformationStudentComponent
            },
            {
                path: 'information-lecturer', 
                component: LecturerInformationLecturerComponent
            },
        ]},
    // Mentor 
    { path: 'mentor', component: MentorComponent, canActivate:[AuthGuardFn],
        children: [
            {
                path: '', 
                component: MentorStudentListComponent
            },
            {
                path: 'student-list',
                component: MentorStudentListComponent
            },
            {
                path: 'information-mentor',
                component: MentorInformationMentorComponent
            },
            {
                path: 'information-student/:studentCode',
                component: MentorInformationStudentComponent
            },
            {
                path: 'student-report-list/:studentCode',
                component: MentorStudentReportListComponent
            },
            {
                path: 'comment/:submissionId',
                component: MentorCommentComponent
            },
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
