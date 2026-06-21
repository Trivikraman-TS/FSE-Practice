DROP TABLE IF EXISTS professors CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS departments CASCADE;


CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100),
    budget DECIMAL(12, 2)
);


CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    department_id INT,
    enrollment_year INT,
    CONSTRAINT fk_student_department FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
);


CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL,
    course_code VARCHAR(20) UNIQUE,
    credits INT,
    department_id INT,
    CONSTRAINT fk_course_department FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);


CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE,
    grade CHAR(2),
    CONSTRAINT fk_enrollment_student FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);


CREATE TABLE professors (
    professor_id SERIAL PRIMARY KEY,
    prof_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10, 2),
    CONSTRAINT fk_professor_department FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
);




/*

Documentation for Verification of Normalisation

1. First Normal Form (1NF) Compliance:
   - Definition: A relation is in 1NF if and only if the domain of each attribute contains only atomic (indivisible) values,
     and there are no repeating groups or multi-valued attributes.
   - Compliance: Every column in the college_db schema holds single, atomic values. For instance, the 'email' and 'first_name'
     columns contain a single string per row.
   - Hypothetical Violation: If we stored multiple phone numbers (e.g., '123-456-7890, 098-765-4321') in a single column
     called 'phone_numbers' in the 'students' table, it would violate 1NF because the values are not atomic.

2. Second Normal Form (2NF) Compliance:
   - Definition: A relation is in 2NF if it is in 1NF and every non-key attribute is fully functionally dependent on the primary key
     (i.e., no partial dependency of non-key attributes on any candidate key).
   - Compliance: 
     - For 'students', 'departments', 'courses', and 'professors', the primary key is a single column (student_id, department_id,
       course_id, professor_id). Since the primary keys are not composite, partial key dependencies are mathematically impossible.
     - For the 'enrollments' table:
       - The primary key is 'enrollment_id' (single column), which trivially satisfies 2NF.
       - If we consider the composite candidate key (student_id, course_id), the non-key attributes ('enrollment_date' and 'grade')
         depend on the entire combination of (student_id, course_id). You cannot determine the grade of an enrollment or its date
         by knowing only the student_id or only the course_id. Thus, there are no partial dependencies, and 2NF is fully satisfied.

3. Third Normal Form (3NF) Compliance:
   - Definition: A relation is in 3NF if it is in 2NF and there is no transitive dependency of non-key attributes on the primary key
     (i.e., no non-key attribute determines another non-key attribute).
   - Compliance:
     - In all tables, all non-key attributes depend directly on the primary key.
     - Hypothetical Violation: If we stored 'dept_name' directly in the 'students' table, we would have a transitive dependency:
       student_id -> department_id -> dept_name. Since department_id is a foreign key and dept_name is stored separately in the
       'departments' table, this transitive dependency is avoided, and 3NF is satisfied.
     - 'enrollments' 3NF Analysis:
       - Primary Key: enrollment_id.
       - Candidate Key: (student_id, course_id).
       - Non-key attributes: enrollment_date, grade.
       - Neither enrollment_date nor grade depends on any other non-key attributes. They are independent and depend directly and
         only on the primary key (enrollment_id) or candidate key (student_id, course_id). Hence, there are no transitive
         dependencies, and the 'enrollments' table is fully compliant with 3NF.
*/



ALTER TABLE students ADD COLUMN phone_number VARCHAR(15);

ALTER TABLE courses ADD COLUMN max_seats INT DEFAULT 60;

ALTER TABLE enrollments ADD CONSTRAINT chk_enrollment_grade CHECK (grade IN ('A', 'B', 'C', 'D', 'F') OR grade IS NULL);

ALTER TABLE departments RENAME COLUMN hod_name TO head_of_dept;

ALTER TABLE students DROP COLUMN phone_number;