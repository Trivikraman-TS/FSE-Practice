import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseService } from '../course.service';

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  grade: string;
}

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: []
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  
  private subscription: Subscription | null = null;

  // Inject CourseService (Step 98)
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loading = true; // Step 100
    
    // Subscribe to Observable (Step 99)
    this.subscription = this.courseService.getCourses().subscribe({
      next: (data) => {
        // Map external API posts into structured course objects
        this.courses = data.map(post => ({
          id: post.id,
          // Extract a readable course name from the post title
          name: post.title.split(' ').slice(0, 3).map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          code: `CS${100 + post.id}`,
          credits: post.id % 2 === 0 ? 4 : 3,
          grade: post.id % 3 === 0 ? 'A' : (post.id % 3 === 1 ? 'A-' : 'B+')
        }));
        this.loading = false; // Step 100
      },
      error: (err) => {
        console.error("HTTP fetch error, using fallbacks:", err);
        // Fallback static data if JSONPlaceholder is offline
        this.courses = [
          { id: 1, name: 'Introduction to Computer Science', code: 'CS101', credits: 4, grade: 'A' },
          { id: 2, name: 'Web Application Development', code: 'CS202', credits: 4, grade: 'A-' },
          { id: 3, name: 'Database Systems', code: 'CS303', credits: 3, grade: 'B+' },
          { id: 4, name: 'Data Structures & Algorithms', code: 'CS204', credits: 4, grade: 'A' },
          { id: 5, name: 'User Interface Design', code: 'CS105', credits: 3, grade: 'A-' }
        ];
        this.loading = false;
      }
    });
  }

  // Get filtered list based on two-way binded search term
  getFilteredCourses(): Course[] {
    if (!this.searchTerm) {
      return this.courses;
    }
    const term = this.searchTerm.toLowerCase().trim();
    return this.courses.filter(course =>
      course.name.toLowerCase().includes(term) ||
      course.code.toLowerCase().includes(term)
    );
  }

  // Unsubscribe in ngOnDestroy to prevent memory leaks (Hint on page 17)
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
