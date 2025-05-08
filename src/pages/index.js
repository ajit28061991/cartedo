import Head from "next/head";
import { useContext } from "react";
import { CourseContext } from "@/contexts/CourseContext";
import CourseList from "@/components/Course/CourseList";
import AddCourseForm from "@/components/Course/AddCourseForm";
import { Suspense } from "react";
import Header from "@/components/Header/Header";

export default function Home() {
  const { state } = useContext(CourseContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* currenly Static props */}
      <Header firstName="Ajit" /> 
      <Head>
        <title>Course Enrollment Platform</title>
      </Head>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Course Enrollment
        </h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Course
          </h2>
          <AddCourseForm />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Available Courses
          </h2>
          <Suspense fallback={<div>Loading...</div>}>
            <CourseList />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
