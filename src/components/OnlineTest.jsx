// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { FaClock, FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
// import logo from "../assets/ThinkTech-Logo.png"; // Update the path as needed

// export default function OnlineTest() {
//   /*********************
//    *   STATE & DATA
//    *********************/
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [formData, setFormData] = useState(null);
//   const [step, setStep] = useState(1); // 1: Registration, 2: Test Listing, 3: Test Screen, 4: Thank You

//   const tests = [
//     {
//       id: 1,
//       name: "Sample Test",
//       live: true,
//       duration: 60, // seconds
//       questions: [
//         {
//           id: 1,
//           questionText: "What is the capital of France?",
//           options: ["Paris", "London", "Rome", "Berlin"],
//         },
//         {
//           id: 2,
//           questionText: "Which planet is known as the Red Planet?",
//           options: ["Earth", "Mars", "Jupiter", "Venus"],
//         },
//         {
//           id: 3,
//           questionText: "Which ocean is the largest by area?",
//           options: ["Atlantic", "Indian", "Pacific", "Arctic"],
//         },
//       ],
//     },
//   ];

//   const [selectedTest, setSelectedTest] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [showWarning, setShowWarning] = useState(false);

//   const instructions = [
//     "Read each question carefully.",
//     "Do not refresh the page while taking the test.",
//     "You can move back and forth between questions using the Previous/Next buttons.",
//     "The test will auto-submit when the time is up.",
//   ];

//   /*********************
//    *   FULL SCREEN HELPERS
//    *********************/
//   const requestFullScreen = () => {
//     const elem = document.documentElement;
//     if (elem.requestFullscreen) {
//       elem.requestFullscreen();
//     } else if (elem.webkitRequestFullscreen) {
//       elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) {
//       elem.msRequestFullscreen();
//     }
//   };

//   /*********************
//    *    HANDLERS
//    *********************/
//   // Registration form submit: log user details, request full screen, then move to test listing.
//   const onSubmit = (data) => {
//     setFormData(data);
//     console.log("User Details:", data);
//     // Request full screen mode as part of a user-initiated event.
//     requestFullScreen();
//     setStep(2);
//   };

//   const handleStartTest = (test) => {
//     setSelectedTest(test);
//     setTimeLeft(test.duration);
//     setCurrentQuestionIndex(0);
//     setAnswers({});
//     setStep(3);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < selectedTest.questions.length - 1) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prev) => prev - 1);
//     }
//   };

//   const handleOptionSelect = (questionId, option) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: option,
//     }));
//   };

//   // When the test is submitted, log answers and move to thank-you screen.
//   const handleSubmitTest = () => {
//     console.log("User Test Option Selections:", answers);
//     setStep(4);
//   };

//   /*********************
//    *    EFFECTS
//    *********************/
//   // Timer countdown effect
//   useEffect(() => {
//     let timerId;
//     if (step === 3 && timeLeft > 0) {
//       timerId = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timerId);
//             handleSubmitTest(); // Auto-submit when time is up
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timerId);
//   }, [step, timeLeft]);

//   // Listen for full screen exit and visibility changes when test is active.
//   useEffect(() => {
//     if (step === 3) {
//       const handleFullscreenChange = () => {
//         if (!document.fullscreenElement && !showWarning) {
//           // Instead of auto-submitting immediately, show warning modal.
//           setShowWarning(true);
//         }
//       };

//       const handleVisibilityChange = () => {
//         if (document.visibilityState === "hidden") {
//           console.log("User changed tab or minimized the browser.");
//           handleSubmitTest();
//         }
//       };

//       document.addEventListener("fullscreenchange", handleFullscreenChange);
//       document.addEventListener("visibilitychange", handleVisibilityChange);
//       return () => {
//         document.removeEventListener("fullscreenchange", handleFullscreenChange);
//         document.removeEventListener("visibilitychange", handleVisibilityChange);
//       };
//     }
//   }, [step, showWarning]);

//   // Helper to format time in mm:ss
//   const formatTime = (seconds) => {
//     const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
//     const ss = String(seconds % 60).padStart(2, "0");
//     return `${mm}:${ss}`;
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header / Logo */}
//       <header className="flex items-center p-4 bg-[#004aad]">
//         <img src={logo} alt="ThinkTech Logo" className="h-10 w-auto mr-4" />
//         <h1 className="text-white text-xl font-bold">
//           Digital Transformation Specialists
//         </h1>
//       </header>

//       <main className="flex-grow container mx-auto p-4">
//         {/* Step 1: Registration & Instructions */}
//         {step === 1 && (
//           <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6">
//             <h2 className="text-2xl font-bold mb-4 text-[#000000]">
//               Test Instructions
//             </h2>
//             <ul className="list-disc list-inside mb-4 text-gray-700">
//               {instructions.map((inst, index) => (
//                 <li key={index} className="mb-1">
//                   {inst}
//                 </li>
//               ))}
//             </ul>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block font-medium text-gray-700">
//                   Name
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   className="mt-1 p-2 border rounded w-full"
//                   {...register("name", { required: "Name is required" })}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   className="mt-1 p-2 border rounded w-full"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^\S+@\S+$/i,
//                       message: "Please enter a valid email",
//                     },
//                   })}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="phone" className="block font-medium text-gray-700">
//                   Phone
//                 </label>
//                 <input
//                   id="phone"
//                   type="tel"
//                   className="mt-1 p-2 border rounded w-full"
//                   {...register("phone", { required: "Phone number is required" })}
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
//                 )}
//               </div>
//               <div className="flex items-center mb-4">
//                 <input
//                   id="hasReadInstructions"
//                   type="checkbox"
//                   className="h-4 w-4 text-blue-600"
//                   {...register("hasReadInstructions", {
//                     required: "You must confirm you have read the instructions",
//                   })}
//                 />
//                 <label htmlFor="hasReadInstructions" className="ml-2 text-gray-700">
//                   I have read all the instructions
//                 </label>
//               </div>
//               {errors.hasReadInstructions && (
//                 <p className="text-red-500 text-sm mb-4">
//                   {errors.hasReadInstructions.message}
//                 </p>
//               )}
//               <button
//                 type="submit"
//                 className="px-4 py-2 rounded text-white bg-[#004aad] hover:bg-blue-700 transition-colors"
//               >
//                 Proceed
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Step 2: Test Listing */}
//         {step === 2 && (
//           <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6">
//             <h2 className="text-2xl font-bold mb-4 text-[#000000]">Available Tests</h2>
//             {tests.filter((test) => test.live).length === 0 ? (
//               <p className="text-gray-700 mb-4">No test for now</p>
//             ) : (
//               tests
//                 .filter((test) => test.live)
//                 .map((test) => (
//                   <div
//                     key={test.id}
//                     className="flex items-center justify-between mb-4 p-4 border rounded"
//                   >
//                     <p className="font-semibold text-gray-800">{test.name}</p>
//                     <button
//                       onClick={() => handleStartTest(test)}
//                       className="px-4 py-2 rounded text-white bg-[#004aad] hover:bg-blue-700 transition-colors"
//                     >
//                       Start Test
//                     </button>
//                   </div>
//                 ))
//             )}
//           </div>
//         )}

//         {/* Step 3: Test Screen */}
//         {step === 3 && selectedTest && (
//           <div className="bg-white shadow-md rounded p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-[#000000]">{selectedTest.name}</h2>
//               <div className="flex items-center text-[#004aad] font-semibold">
//                 <FaClock className="mr-2" />
//                 <span>{formatTime(timeLeft)}</span>
//               </div>
//             </div>
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="w-full md:w-1/2 p-4 border rounded bg-gray-50">
//                 <p className="font-semibold text-gray-700">
//                   Question {currentQuestionIndex + 1} of {selectedTest.questions.length}
//                 </p>
//                 <p className="mt-2 text-gray-800">
//                   {selectedTest.questions[currentQuestionIndex].questionText}
//                 </p>
//               </div>
//               <div className="w-full md:w-1/2 p-4 border rounded bg-gray-50">
//                 {selectedTest.questions[currentQuestionIndex].options.map((option, idx) => (
//                   <label
//                     key={idx}
//                     className={`block p-2 mb-2 border rounded cursor-pointer hover:bg-blue-100 ${
//                       answers[selectedTest.questions[currentQuestionIndex].id] === option
//                         ? "bg-blue-200 border-blue-400"
//                         : "bg-white border-gray-300"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name={`question-${selectedTest.questions[currentQuestionIndex].id}`}
//                       value={option}
//                       checked={
//                         answers[selectedTest.questions[currentQuestionIndex].id] === option
//                       }
//                       onChange={() =>
//                         handleOptionSelect(selectedTest.questions[currentQuestionIndex].id, option)
//                       }
//                       className="mr-2"
//                     />
//                     {option}
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-between items-center mt-4">
//               {currentQuestionIndex > 0 ? (
//                 <button
//                   onClick={handlePrevQuestion}
//                   className="px-4 py-2 rounded text-white bg-gray-600 hover:bg-gray-700 transition-colors flex items-center"
//                 >
//                   <FaArrowLeft className="mr-2" />
//                   Previous
//                 </button>
//               ) : (
//                 <div />
//               )}
//               {currentQuestionIndex < selectedTest.questions.length - 1 ? (
//                 <button
//                   onClick={handleNextQuestion}
//                   className="px-4 py-2 rounded text-white bg-[#004aad] hover:bg-blue-700 transition-colors flex items-center"
//                 >
//                   Next
//                   <FaArrowRight className="ml-2" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleSubmitTest}
//                   className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 transition-colors flex items-center"
//                 >
//                   <FaCheckCircle className="mr-2" />
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Step 4: Thank You Screen */}
//         {step === 4 && (
//           <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6 text-center">
//             <h2 className="text-2xl font-bold text-[#000000] mb-4">Thank You for Taking the Test</h2>
//             <p className="text-gray-700">
//               Your responses have been submitted successfully.
//             </p>
//           </div>
//         )}
//       </main>

//       {/* Warning Modal */}
//       {showWarning && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
//             <h3 className="text-xl font-bold mb-4">Warning</h3>
//             <p className="mb-4">
//               You are about to exit full screen. Doing so will result in submitting the test.
//               Do you want to continue or cancel?
//             </p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => {
//                   // "Stay" option: try to re-enter full screen and hide warning.
//                   requestFullScreen();
//                   setShowWarning(false);
//                 }}
//                 className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//               >
//                 Stay
//               </button>
//               <button
//                 onClick={() => {
//                   // "Exit" option: hide warning and auto-submit test.
//                   setShowWarning(false);
//                   handleSubmitTest();
//                 }}
//                 className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
//               >
//                 Exit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="text-center py-4 bg-gray-100 text-gray-600 text-sm">
//         &copy; {new Date().getFullYear()} ThinkTech
//       </footer>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaClock, FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import logo from "../assets/ThinkTech-Logo.png"; // Update the path as needed

export default function OnlineTest() {
  /*********************
   *   STATE & DATA
   *********************/
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState(null);
  // Steps: 1 = Registration, 2 = Available Tests, 3 = Test, 4 = Thank You
  const [step, setStep] = useState(1);
  const [selectedTest, setSelectedTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const tests = [
    {
      id: 1,
      name: "Sample Test",
      live: true,
      duration: 60, // seconds
      questions: [
        {
          id: 1,
          questionText: "What is the capital of France?",
          options: ["Paris", "London", "Rome", "Berlin"],
        },
        {
          id: 2,
          questionText: "Which planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Jupiter", "Venus"],
        },
        {
          id: 3,
          questionText: "Which ocean is the largest by area?",
          options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        },
      ],
    },
  ];

  const instructions = [
    "Read each question carefully.",
    "Do not refresh the page while taking the test.",
    "You can move back and forth between questions using the Previous/Next buttons.",
    "The test will auto-submit when the time is up.",
  ];

  /*********************
   *   FULL SCREEN HELPERS
   *********************/
  const requestFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  /*********************
   *    HANDLERS
   *********************/
  // Registration form submit
  const onSubmit = (data) => {
    setFormData(data);
    console.log("User Details:", data);
    // Request full screen on user action
    requestFullScreen();
    setStep(2);
  };

  // When starting a test, ensure full screen is active.
  const handleStartTest = (test) => {
    if (!document.fullscreenElement) {
      requestFullScreen();
    }
    setSelectedTest(test);
    setTimeLeft(test.duration);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setStep(3);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedTest.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleOptionSelect = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // On test submission (or auto-submission) log answers and go to thank-you screen.
  const handleSubmitTest = () => {
    console.log("User Test Option Selections:", answers);
    setStep(4);
  };

  /*********************
   *    EFFECTS
   *********************/
  // Timer countdown effect for test (step 3)
  useEffect(() => {
    let timerId;
    if (step === 3 && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            handleSubmitTest(); // Auto-submit when time is up
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [step, timeLeft]);

  // Listen for full screen exit (in step 2 and step 3) and tab changes.
  useEffect(() => {
    if (step === 2 || step === 3) {
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement && !showWarning) {
          setShowWarning(true);
        }
      };

      const handleVisibilityChange = () => {
        // Only auto-submit if the test is active (step 3)
        if (document.visibilityState === "hidden" && step === 3) {
          console.log("User changed tab or minimized the browser.");
          handleSubmitTest();
        }
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [step, showWarning]);

  // Helper to format time in mm:ss
  const formatTime = (seconds) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header / Logo */}
      <header className="flex items-center p-4 bg-[#004aad]">
        <img src={logo} alt="ThinkTech Logo" className="h-10 w-auto mr-4" />
        <h1 className="text-white text-xl font-bold">
          Digital Transformation Specialists
        </h1>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {/* Step 1: Registration & Instructions */}
        {step === 1 && (
          <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#000000]">Test Instructions</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              {instructions.map((inst, index) => (
                <li key={index} className="mb-1">{inst}</li>
              ))}
            </ul>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 p-2 border rounded w-full"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email" },
                  })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block font-medium text-gray-700">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-1 p-2 border rounded w-full"
                  {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="hasReadInstructions"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600"
                  {...register("hasReadInstructions", {
                    required: "You must confirm you have read the instructions",
                  })}
                />
                <label htmlFor="hasReadInstructions" className="ml-2 text-gray-700">
                  I have read all the instructions
                </label>
              </div>
              {errors.hasReadInstructions && (
                <p className="text-red-500 text-sm mb-4">{errors.hasReadInstructions.message}</p>
              )}
              <button
                type="submit"
                className="px-4 py-2 rounded text-white bg-[#004aad] hover:bg-blue-700 transition-colors"
              >
                Proceed
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Available Tests */}
        {step === 2 && (
          <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#000000]">Available Tests</h2>
            {tests.filter((test) => test.live).length === 0 ? (
              <p className="text-gray-700 mb-4">No test for now</p>
            ) : (
              tests
                .filter((test) => test.live)
                .map((test) => (
                  <div key={test.id} className="flex items-center justify-between mb-4 p-4 border rounded">
                    <p className="font-semibold text-gray-800">{test.name}</p>
                    <button
                      onClick={() => handleStartTest(test)}
                      className="px-4 py-2 rounded text-white bg-[#004aad] hover:bg-blue-700 transition-colors"
                    >
                      Start Test
                    </button>
                  </div>
                ))
            )}
          </div>
        )}

        {/* Step 3: Test Screen */}
        {step === 3 && selectedTest && (
          <div className="bg-white shadow-md rounded p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#000000]">{selectedTest.name}</h2>
              <div className="flex items-center text-[#004aad] font-semibold">
                <FaClock className="mr-2" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 p-4 border rounded bg-gray-50">
                <p className="font-semibold text-gray-700">
                  Question {currentQuestionIndex + 1} of {selectedTest.questions.length}
                </p>
                <p className="mt-2 text-gray-800">
                  {selectedTest.questions[currentQuestionIndex].questionText}
                </p>
              </div>
              <div className="w-full md:w-1/2 p-4 border rounded bg-gray-50">
                {selectedTest.questions[currentQuestionIndex].options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`block p-2 mb-2 border rounded cursor-pointer hover:bg-blue-100 ${
                      answers[selectedTest.questions[currentQuestionIndex].id] === option
                        ? "bg-blue-200 border-blue-400"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${selectedTest.questions[currentQuestionIndex].id}`}
                      value={option}
                      checked={answers[selectedTest.questions[currentQuestionIndex].id] === option}
                      onChange={() =>
                        handleOptionSelect(selectedTest.questions[currentQuestionIndex].id, option)
                      }
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              {currentQuestionIndex > 0 ? (
                <button
                  onClick={handlePrevQuestion}
                  className="px-4 py-2 rounded text-white bg-gray-600 hover:bg-gray-700 transition-colors flex items-center"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous
                </button>
              ) : (
                <div />
              )}
              {currentQuestionIndex < selectedTest.questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 rounded text-white bg-[#004aad] hover:bg-blue-700 transition-colors flex items-center"
                >
                  Next
                  <FaArrowRight className="ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitTest}
                  className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 transition-colors flex items-center"
                >
                  <FaCheckCircle className="mr-2" />
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Thank You Screen */}
        {step === 4 && (
          <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6 text-center">
            <h2 className="text-2xl font-bold text-[#000000] mb-4">Thank You for Taking the Test</h2>
            <p className="text-gray-700">Your responses have been submitted successfully.</p>
          </div>
        )}
      </main>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Warning</h3>
            <p className="mb-4">
              You are about to exit full screen. Doing so will result in submitting the test.
              Do you want to continue or cancel?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  // "Stay": attempt to re-enter full screen and hide warning.
                  requestFullScreen();
                  setShowWarning(false);
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Stay
              </button>
              <button
                onClick={() => {
                  setShowWarning(false);
                  // For test in progress (step 3), exit means submit.
                  if (step === 3) {
                    handleSubmitTest();
                  }
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-100 text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} ThinkTech
      </footer>
    </div>
  );
}
