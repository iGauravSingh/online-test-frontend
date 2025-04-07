// import React, { useState } from "react";

// const Dashboard = () => {
//   const [activeMenu, setActiveMenu] = useState("createTest");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Test form fields
//   const [testName, setTestName] = useState("");
//   const [duration, setDuration] = useState("");
//   const [liveStatus, setLiveStatus] = useState(false);

//   // Question-related state
//   const [questions, setQuestions] = useState([]);
//   const [questionText, setQuestionText] = useState("");
//   const [optionA, setOptionA] = useState("");
//   const [optionB, setOptionB] = useState("");
//   const [optionC, setOptionC] = useState("");
//   const [optionD, setOptionD] = useState("");
//   const [correctOptions, setCorrectOptions] = useState({
//     a: false,
//     b: false,
//     c: false,
//     d: false,
//   });

//   // Array to store tests
//   const [tests, setTests] = useState([]);

//   // State for selected test and view mode
//   const [selectedTest, setSelectedTest] = useState(null);
//   // Determines if candidate result view is being shown for the selected test
//   const [showResult, setShowResult] = useState(false);
//   // For cutoff search in candidate result view
//   const [cutoff, setCutoff] = useState("");

//   const handleAddQuestion = (e) => {
//     e.preventDefault();
//     if (!questionText || !optionA || !optionB || !optionC || !optionD) {
//       alert("Please fill in all fields for the question and options");
//       return;
//     }
//     const newQuestion = {
//       questionText,
//       imageUrl: "", // default value, can be updated if an image is provided
//       options: [
//         { text: optionA, isCorrect: correctOptions.a },
//         { text: optionB, isCorrect: correctOptions.b },
//         { text: optionC, isCorrect: correctOptions.c },
//         { text: optionD, isCorrect: correctOptions.d }
//       ]
//     };
//     setQuestions([...questions, newQuestion]);
//     setQuestionText("");
//     setOptionA("");
//     setOptionB("");
//     setOptionC("");
//     setOptionD("");
//     setCorrectOptions({ a: false, b: false, c: false, d: false });
//   };

//   // const handleCreateTest = (e) => {
//   //   e.preventDefault();
//   //   if (!testName || !duration) {
//   //     alert("Please fill in test name and duration.");
//   //     return;
//   //   }
//   //   if (questions.length === 0) {
//   //     alert("Please add at least one question.");
//   //     return;
//   //   }
//   //   const newTest = {
//   //     title: testName,                     // renamed from testName to title
//   //     description: "",                     // added description (can be updated later)
//   //     duration: parseInt(duration, 10),    // converted duration to a number
//   //     isLive: liveStatus,                  // renamed from liveStatus to isLive
//   //     questions,                           // questions are in the new format
//   //   };
//   //   console.log(newTest);
//   //   setTests([...tests, newTest]);
//   //   setTestName("");
//   //   setDuration("");
//   //   setLiveStatus(false);
//   //   setQuestions([]);
//   //   alert("Test created successfully!");
//   // };

//   const handleCreateTest = async (e) => {
//     e.preventDefault();
//     if (!testName || !duration) {
//       alert("Please fill in test name and duration.");
//       return;
//     }
//     if (questions.length === 0) {
//       alert("Please add at least one question.");
//       return;
//     }
//     const newTest = {
//       title: testName, // renamed from testName to title
//       description: "", // added description (can be updated later)
//       duration: parseInt(duration, 10), // convert duration to number
//       isLive: liveStatus, // renamed from liveStatus to isLive
//       questions, // questions are already in the new format
//     };
  
//     try {
//       const token = localStorage.getItem("access_token");
//       const response = await fetch("http://localhost:3000/tests/create-with-questions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newTest),
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         // Test created successfully
//         alert(data.message); // Should show "Test created successfully"
//         setTests([...tests, newTest]);
//         setTestName("");
//         setDuration("");
//         setLiveStatus(false);
//         setQuestions([]);
//       } else {
//         // An error occurred on the server
//         alert(`Error: ${data.message || "Something went wrong"}`);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const renderCreateTest = () => {
//     return (
//       <div className="p-4">
//         <h2 className="text-2xl font-semibold mb-4">Create Test</h2>
//         <form className="space-y-4">
//           <div>
//             <label htmlFor="testName" className="block text-gray-700">
//               Test Name
//             </label>
//             <input
//               id="testName"
//               type="text"
//               value={testName}
//               onChange={(e) => setTestName(e.target.value)}
//               placeholder="Enter test name"
//               className="mt-1 p-2 border rounded w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="duration" className="block text-gray-700">
//               Duration (minutes)
//             </label>
//             <input
//               id="duration"
//               type="number"
//               value={duration}
//               onChange={(e) => setDuration(e.target.value)}
//               placeholder="Enter duration"
//               className="mt-1 p-2 border rounded w-full"
//             />
//           </div>
//           <div className="flex items-center">
//             <span className="text-gray-700 mr-2">Live Status</span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={liveStatus}
//                 onChange={(e) => setLiveStatus(e.target.checked)}
//                 className="sr-only peer"
//               />
//               <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-300 
//                 peer-checked:after:translate-x-full peer-checked:after:border-white 
//                 after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
//                 after:bg-white after:border-gray-300 after:border after:rounded-full 
//                 after:h-5 after:w-5 after:transition-all"></div>
//             </label>
//           </div>

//           {/* Section for adding questions */}
//           <div className="border-t pt-4">
//             <h3 className="text-xl font-semibold mb-2">Add Question</h3>
//             <div className="space-y-2">
//               <div>
//                 <label className="block text-gray-700">Question</label>
//                 <textarea
//                   value={questionText}
//                   onChange={(e) => setQuestionText(e.target.value)}
//                   placeholder="Enter question text or upload an image"
//                   className="mt-1 p-2 border rounded w-full"
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700">Option A</label>
//                   <input
//                     type="text"
//                     value={optionA}
//                     onChange={(e) => setOptionA(e.target.value)}
//                     placeholder="Option A"
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                   <div className="flex items-center mt-1">
//                     <input
//                       type="checkbox"
//                       checked={correctOptions.a}
//                       onChange={(e) =>
//                         setCorrectOptions({
//                           ...correctOptions,
//                           a: e.target.checked,
//                         })
//                       }
//                       className="mr-2"
//                     />
//                     <span className="text-gray-700">Correct</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Option B</label>
//                   <input
//                     type="text"
//                     value={optionB}
//                     onChange={(e) => setOptionB(e.target.value)}
//                     placeholder="Option B"
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                   <div className="flex items-center mt-1">
//                     <input
//                       type="checkbox"
//                       checked={correctOptions.b}
//                       onChange={(e) =>
//                         setCorrectOptions({
//                           ...correctOptions,
//                           b: e.target.checked,
//                         })
//                       }
//                       className="mr-2"
//                     />
//                     <span className="text-gray-700">Correct</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Option C</label>
//                   <input
//                     type="text"
//                     value={optionC}
//                     onChange={(e) => setOptionC(e.target.value)}
//                     placeholder="Option C"
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                   <div className="flex items-center mt-1">
//                     <input
//                       type="checkbox"
//                       checked={correctOptions.c}
//                       onChange={(e) =>
//                         setCorrectOptions({
//                           ...correctOptions,
//                           c: e.target.checked,
//                         })
//                       }
//                       className="mr-2"
//                     />
//                     <span className="text-gray-700">Correct</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Option D</label>
//                   <input
//                     type="text"
//                     value={optionD}
//                     onChange={(e) => setOptionD(e.target.value)}
//                     placeholder="Option D"
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                   <div className="flex items-center mt-1">
//                     <input
//                       type="checkbox"
//                       checked={correctOptions.d}
//                       onChange={(e) =>
//                         setCorrectOptions({
//                           ...correctOptions,
//                           d: e.target.checked,
//                         })
//                       }
//                       className="mr-2"
//                     />
//                     <span className="text-gray-700">Correct</span>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={handleAddQuestion}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2"
//               >
//                 Add Question
//               </button>
//             </div>

//             {/* Display added questions using the new format */}
//             {questions.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="text-lg font-semibold mb-2">Added Questions</h4>
//                 <ul className="space-y-2">
//                   {questions.map((q, index) => (
//                     <li key={index} className="p-2 border rounded">
//                       <p className="font-medium">
//                         Q{index + 1}: {q.questionText}
//                       </p>
//                       <ul className="ml-4">
//                         {q.options.map((option, idx) => (
//                           <li key={idx}>
//                             Option {String.fromCharCode(65 + idx)}: {option.text}{" "}
//                             {option.isCorrect && (
//                               <span className="text-green-600 font-bold">
//                                 (Correct)
//                               </span>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleCreateTest}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//           >
//             Create Test
//           </button>
//         </form>
//       </div>
//     );
//   };

//   const renderTestList = () => {
//     // When a test is selected, display either its questions or candidate results.
//     if (selectedTest) {
//       if (!showResult) {
//         return (
//           <div className="p-4">
//             <div className="flex items-center justify-between mb-4">
//               <button
//                 onClick={() => {
//                   setSelectedTest(null);
//                   setShowResult(false);
//                 }}
//                 className="text-blue-500 underline"
//               >
//                 Back to Test List
//               </button>
//               <button
//                 onClick={() => setShowResult(true)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//               >
//                 Show Result
//               </button>
//             </div>
//             <h2 className="text-2xl font-semibold mb-4">
//               Questions for {selectedTest.title}
//             </h2>
//             {selectedTest.questions.length === 0 ? (
//               <p>No questions added.</p>
//             ) : (
//               <ul className="space-y-2">
//                 {selectedTest.questions.map((q, index) => (
//                   <li key={index} className="p-2 border rounded">
//                     <p className="font-medium">
//                       Q{index + 1}: {q.questionText}
//                     </p>
//                     <ul className="ml-4">
//                       {q.options.map((option, idx) => (
//                         <li key={idx}>
//                           Option {String.fromCharCode(65 + idx)}: {option.text}{" "}
//                           {option.isCorrect && (
//                             <span className="text-green-600 font-bold">
//                               (Correct)
//                             </span>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         );
//       } else {
//         // Candidate result view for the selected test
//         return (
//           <div className="p-4">
//             <button
//               onClick={() => {
//                 setSelectedTest(null);
//                 setShowResult(false);
//               }}
//               className="mb-4 text-blue-500 underline"
//             >
//               Back to Test List
//             </button>
//             <h2 className="text-2xl font-semibold mb-4">
//               Candidate Results for {selectedTest.title}
//             </h2>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Search by cutoff score..."
//                 value={cutoff}
//                 onChange={(e) => setCutoff(e.target.value)}
//                 className="mt-1 p-2 border rounded w-full"
//               />
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border">
//                 <thead>
//                   <tr>
//                     <th className="py-2 px-4 border">Name</th>
//                     <th className="py-2 px-4 border">Phone</th>
//                     <th className="py-2 px-4 border">Email</th>
//                     <th className="py-2 px-4 border">Marks</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="py-2 px-4 border">John Doe</td>
//                     <td className="py-2 px-4 border">1234567890</td>
//                     <td className="py-2 px-4 border">john@example.com</td>
//                     <td className="py-2 px-4 border">85</td>
//                   </tr>
//                   {/* Additional candidate rows can be rendered here */}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       }
//     }

//     // When no test is selected, display the list of tests.
//     return (
//       <div className="p-4">
//         <h2 className="text-2xl font-semibold mb-4">Test List</h2>
//         {tests.length === 0 ? (
//           <p>No tests created yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {tests.map((test, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => {
//                   setSelectedTest(test);
//                   setShowResult(false);
//                 }}
//                 className="cursor-pointer p-4 border rounded hover:bg-gray-200"
//               >
//                 <h3 className="text-xl font-semibold">{test.title}</h3>
//                 <p>Duration: {test.duration} minutes</p>
//                 <p>Questions: {test.questions.length}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderContent = () => {
//     if (activeMenu === "createTest") {
//       return renderCreateTest();
//     } else if (activeMenu === "testList") {
//       return renderTestList();
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition duration-200 ease-in-out md:relative md:translate-x-0 bg-white w-64 shadow-md z-50`}
//       >
//         <div className="p-4 font-bold text-lg border-b">Admin Dashboard</div>
//         <nav className="mt-4">
//           <ul>
//             <li
//               className={`cursor-pointer p-4 hover:bg-gray-200 ${
//                 activeMenu === "createTest" ? "bg-gray-200" : ""
//               }`}
//               onClick={() => {
//                 setActiveMenu("createTest");
//                 setSidebarOpen(false);
//                 setSelectedTest(null);
//               }}
//             >
//               Create Test
//             </li>
//             <li
//               className={`cursor-pointer p-4 hover:bg-gray-200 ${
//                 activeMenu === "testList" ? "bg-gray-200" : ""
//               }`}
//               onClick={() => {
//                 setActiveMenu("testList");
//                 setSidebarOpen(false);
//                 setSelectedTest(null);
//               }}
//             >
//               Test List
//             </li>
//           </ul>
//         </nav>
//       </div>
//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         <header className="bg-white shadow-md p-4 md:hidden flex items-center">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-gray-500 focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//           <h1 className="ml-4 font-bold text-lg">Admin Dashboard</h1>
//         </header>
//         <main className="p-4 overflow-y-auto">{renderContent()}</main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("createTest");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Test form fields
  const [testName, setTestName] = useState("");
  const [duration, setDuration] = useState("");
  const [liveStatus, setLiveStatus] = useState(false);

  // Question-related state
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOptions, setCorrectOptions] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
  });

  // Array to store tests (fetched from backend)
  const [tests, setTests] = useState([]);

  // State for selected test and view mode
  const [selectedTest, setSelectedTest] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [cutoff, setCutoff] = useState("");

  // Fetch tests from backend when Test List view is active
  useEffect(() => {
    if (activeMenu === "testList") {
      fetchTests();
    }
  }, [activeMenu]);

  const fetchTests = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://localhost:3000/tests/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTests(data);
      } else {
        alert(`Error fetching tests: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error fetching tests: ${error.message}`);
    }
  };

  // New function to delete a test
  const handleDeleteTest = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`http://localhost:3000/tests/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Test deleted successfully");
        // Remove the deleted test from the state
        setTests(tests.filter((test) => test.id !== id));
      } else {
        alert(`Error: ${data.message || "Unable to delete test"}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!questionText || !optionA || !optionB || !optionC || !optionD) {
      alert("Please fill in all fields for the question and options");
      return;
    }
    const newQuestion = {
      questionText,
      imageUrl: "",
      options: [
        { text: optionA, isCorrect: correctOptions.a },
        { text: optionB, isCorrect: correctOptions.b },
        { text: optionC, isCorrect: correctOptions.c },
        { text: optionD, isCorrect: correctOptions.d },
      ],
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectOptions({ a: false, b: false, c: false, d: false });
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();
    if (!testName || !duration) {
      alert("Please fill in test name and duration.");
      return;
    }
    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }
    const newTest = {
      title: testName,
      description: "",
      duration: parseInt(duration, 10),
      isLive: liveStatus,
      questions,
    };

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:3000/tests/create-with-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTest),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setTests([...tests, newTest]);
        setTestName("");
        setDuration("");
        setLiveStatus(false);
        setQuestions([]);
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };

  const renderCreateTest = () => {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Create Test</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="testName" className="block text-gray-700">
              Test Name
            </label>
            <input
              id="testName"
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Enter test name"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-700">
              Duration (minutes)
            </label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">Live Status</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={liveStatus}
                onChange={(e) => setLiveStatus(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-300 
                peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                after:bg-white after:border-gray-300 after:border after:rounded-full 
                after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          {/* Section for adding questions */}
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold mb-2">Add Question</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-gray-700">Question</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter question text or upload an image"
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Option A</label>
                  <input
                    type="text"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    placeholder="Option A"
                    className="mt-1 p-2 border rounded w-full"
                  />
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={correctOptions.a}
                      onChange={(e) =>
                        setCorrectOptions({
                          ...correctOptions,
                          a: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-gray-700">Correct</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Option B</label>
                  <input
                    type="text"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    placeholder="Option B"
                    className="mt-1 p-2 border rounded w-full"
                  />
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={correctOptions.b}
                      onChange={(e) =>
                        setCorrectOptions({
                          ...correctOptions,
                          b: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-gray-700">Correct</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Option C</label>
                  <input
                    type="text"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    placeholder="Option C"
                    className="mt-1 p-2 border rounded w-full"
                  />
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={correctOptions.c}
                      onChange={(e) =>
                        setCorrectOptions({
                          ...correctOptions,
                          c: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-gray-700">Correct</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Option D</label>
                  <input
                    type="text"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    placeholder="Option D"
                    className="mt-1 p-2 border rounded w-full"
                  />
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={correctOptions.d}
                      onChange={(e) =>
                        setCorrectOptions({
                          ...correctOptions,
                          d: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-gray-700">Correct</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddQuestion}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2"
              >
                Add Question
              </button>
            </div>

            {/* Display added questions */}
            {questions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Added Questions</h4>
                <ul className="space-y-2">
                  {questions.map((q, index) => (
                    <li key={index} className="p-2 border rounded">
                      <p className="font-medium">
                        Q{index + 1}: {q.questionText}
                      </p>
                      <ul className="ml-4">
                        {q.options.map((option, idx) => (
                          <li key={idx}>
                            Option {String.fromCharCode(65 + idx)}: {option.text}{" "}
                            {option.isCorrect && (
                              <span className="text-green-600 font-bold">
                                (Correct)
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={handleCreateTest}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Create Test
          </button>
        </form>
      </div>
    );
  };

  const renderTestList = () => {
    if (selectedTest) {
      if (!showResult) {
        return (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setSelectedTest(null);
                  setShowResult(false);
                }}
                className="text-blue-500 underline"
              >
                Back to Test List
              </button>
              <button
                onClick={() => setShowResult(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Show Result
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Questions for {selectedTest.title}
            </h2>
            {selectedTest.questions.length === 0 ? (
              <p>No questions added.</p>
            ) : (
              <ul className="space-y-2">
                {selectedTest.questions.map((q, index) => (
                  <li key={index} className="p-2 border rounded">
                    <p className="font-medium">
                      Q{index + 1}: {q.questionText}
                    </p>
                    <ul className="ml-4">
                      {q.options.map((option, idx) => (
                        <li key={idx}>
                          Option {String.fromCharCode(65 + idx)}: {option.text}{" "}
                          {option.isCorrect && (
                            <span className="text-green-600 font-bold">
                              (Correct)
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      } else {
        return (
          <div className="p-4">
            <button
              onClick={() => {
                setSelectedTest(null);
                setShowResult(false);
              }}
              className="mb-4 text-blue-500 underline"
            >
              Back to Test List
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Candidate Results for {selectedTest.title}
            </h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by cutoff score..."
                value={cutoff}
                onChange={(e) => setCutoff(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Phone</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border">John Doe</td>
                    <td className="py-2 px-4 border">1234567890</td>
                    <td className="py-2 px-4 border">john@example.com</td>
                    <td className="py-2 px-4 border">85</td>
                  </tr>
                  {/* Additional candidate rows can be rendered here */}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Test List</h2>
        {tests.length === 0 ? (
          <p>No tests found.</p>
        ) : (
          <div className="space-y-4">
            {tests.map((test, idx) => (
              <div
                key={test.id || idx}
                className="flex justify-between items-center cursor-pointer p-4 border rounded hover:bg-gray-200"
              >
                <div
                  onClick={() => {
                    setSelectedTest(test);
                    setShowResult(false);
                  }}
                >
                  <h3 className="text-xl font-semibold">{test.title}</h3>
                  <p>Duration: {test.duration} minutes</p>
                  <p>Questions: {test.questions.length}</p>
                </div>
                {/* Delete icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent navigating to test details
                    handleDeleteTest(test.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  {/* Inline trash icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (activeMenu === "createTest") {
      return renderCreateTest();
    } else if (activeMenu === "testList") {
      return renderTestList();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out md:relative md:translate-x-0 bg-white w-64 shadow-md z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <span className="font-bold text-lg">Admin Dashboard</span>
          <button onClick={handleLogout} className="text-red-500 font-semibold">
            Logout
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <li
              className={`cursor-pointer p-4 hover:bg-gray-200 ${
                activeMenu === "createTest" ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setActiveMenu("createTest");
                setSidebarOpen(false);
                setSelectedTest(null);
              }}
            >
              Create Test
            </li>
            <li
              className={`cursor-pointer p-4 hover:bg-gray-200 ${
                activeMenu === "testList" ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setActiveMenu("testList");
                setSidebarOpen(false);
                setSelectedTest(null);
              }}
            >
              Test List
            </li>
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="bg-white shadow-md p-4 md:hidden flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="ml-4 font-bold text-lg">Admin Dashboard</h1>
        </header>
        <main className="p-4 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
