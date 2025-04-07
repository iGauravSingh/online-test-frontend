import React, { useState } from "react";

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

  // Array to store tests
  const [tests, setTests] = useState([]);

  // State for selected test and view mode
  const [selectedTest, setSelectedTest] = useState(null);
  // Determines if candidate result view is being shown for the selected test
  const [showResult, setShowResult] = useState(false);
  // For cutoff search in candidate result view
  const [cutoff, setCutoff] = useState("");

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!questionText || !optionA || !optionB || !optionC || !optionD) {
      alert("Please fill in all fields for the question and options");
      return;
    }
    const newQuestion = {
      questionText,
      options: { a: optionA, b: optionB, c: optionC, d: optionD },
      correctOptions,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectOptions({ a: false, b: false, c: false, d: false });
  };

  const handleCreateTest = (e) => {
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
      id: tests.length + 1,
      testName,
      duration,
      liveStatus,
      questions,
    };
    setTests([...tests, newTest]);
    setTestName("");
    setDuration("");
    setLiveStatus(false);
    setQuestions([]);
    alert("Test created successfully!");
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
                        {Object.entries(q.options).map(([key, value]) => (
                          <li key={key}>
                            {key.toUpperCase()}: {value}{" "}
                            {q.correctOptions[key] && (
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
    // When a test is selected, display either its questions or candidate results.
    if (selectedTest) {
      if (!showResult) {
        // Detail view showing questions in the test
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
              Questions for {selectedTest.testName}
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
                      {Object.entries(q.options).map(([key, value]) => (
                        <li key={key}>
                          {key.toUpperCase()}: {value}{" "}
                          {q.correctOptions[key] && (
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
        // Candidate result view for the selected test
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
              Candidate Results for {selectedTest.testName}
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

    // When no test is selected, display the list of tests.
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Test List</h2>
        {tests.length === 0 ? (
          <p>No tests created yet.</p>
        ) : (
          <div className="space-y-4">
            {tests.map((test) => (
              <div
                key={test.id}
                onClick={() => {
                  setSelectedTest(test);
                  setShowResult(false);
                }}
                className="cursor-pointer p-4 border rounded hover:bg-gray-200"
              >
                <h3 className="text-xl font-semibold">{test.testName}</h3>
                <p>Duration: {test.duration} minutes</p>
                <p>Questions: {test.questions.length}</p>
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
        <div className="p-4 font-bold text-lg border-b">
          Admin Dashboard
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
