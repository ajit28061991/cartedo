"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { getCourses } from "@/services/api";

const initialState = {
  courses: [],
  enrolled: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, courses: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "TOGGLE_ENROLLMENT":
      const newEnrolled = state.enrolled.includes(action.payload)
        ? state.enrolled.filter((id) => id !== action.payload)
        : [...state.enrolled, action.payload];
      localStorage.setItem("enrolled", JSON.stringify(newEnrolled));
      return { ...state, enrolled: newEnrolled };
    case "SET_ENROLLED":
      return { ...state, enrolled: action.payload };
    case "ADD_COURSE":
      return { ...state, courses: [action.payload, ...state.courses] };
    default:
      return state;
  }
}


export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const { data } = await getCourses();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };
  
    // Safe localStorage access inside browser-only useEffect
    if (typeof window !== "undefined") {
      const enrolledRaw = localStorage.getItem("enrolled");
      const savedEnrolled = enrolledRaw ? JSON.parse(enrolledRaw) : [];
      dispatch({ type: "SET_ENROLLED", payload: savedEnrolled });
    }
  
    fetchCourses();
  }, []);
  

  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within CourseProvider");
  }
  return context;
}
