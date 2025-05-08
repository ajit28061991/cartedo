import { CourseProvider } from "@/contexts/CourseContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CourseProvider>
      <Component {...pageProps} />
    </CourseProvider>
  );
}
