import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Layers, 
  Bell, 
  Settings, 
  ChevronLeft, 
  TrendingUp,
  Circle,
  BookOpen,
  Code2,
  Cpu,
  PlayCircle,
  CheckCircle2,
  Menu,
  X,
  CheckCircle,
  Info,
  HelpCircle,
  Mail,
  MessageSquare,
  ChevronRight,
  Send,
  Twitter,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
  codeSnippet: string;
  quiz: QuizQuestion[];
}

interface Lessons {
  HTML: Lesson[];
  CSS: Lesson[];
  JavaScript: Lesson[];
}

const initialLessons: Lessons = {
  HTML: [
    { 
      id: 1, 
      title: 'Introduction to Tags', 
      duration: '5 min', 
      completed: false,
      content: 'HTML tags are the building blocks of web pages. They are used to create elements like headings, paragraphs, and links. Most tags have an opening tag like <p> and a closing tag like </p>.',
      codeSnippet: '<h1>Hello World</h1>\n<p>This is a paragraph.</p>',
      quiz: [
        {
          question: 'Which tag is used for the largest heading?',
          options: ['<h6>', '<h1>', '<p>', '<div>'],
          correctAnswer: 1
        },
        {
          question: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Tool Multi Language', 'Hyper Text Main Link'],
          correctAnswer: 0
        },
        {
          question: 'Which tag is used to create a line break?',
          options: ['<lb>', '<break>', '<br>', '<hr>'],
          correctAnswer: 2
        },
        {
          question: 'Which tag is used to define an unordered list?',
          options: ['<ol>', '<ul>', '<li>', '<list>'],
          correctAnswer: 1
        },
        {
          question: 'What is the correct tag for a standard paragraph?',
          options: ['<text>', '<para>', '<p>', '<div>'],
          correctAnswer: 2
        }
      ]
    },
    { 
      id: 2, 
      title: 'Attributes & Elements', 
      duration: '8 min', 
      completed: false,
      content: 'Attributes provide additional information about elements. They are always specified in the start tag and usually come in name/value pairs like name="value". For example, the <a> tag uses the href attribute to specify a link.',
      codeSnippet: '<a href="https://google.com">Click me</a>\n<img src="image.jpg" alt="Description">',
      quiz: [
        {
          question: 'Which attribute is used to specify the link destination for an <a> tag?',
          options: ['src', 'alt', 'href', 'link'],
          correctAnswer: 2
        },
        {
          question: 'Where are attributes always specified?',
          options: ['In the end tag', 'In the start tag', 'In the middle of the content', 'In a separate CSS file'],
          correctAnswer: 1
        },
        {
          question: 'Which attribute provides alternative text for an image if it cannot be displayed?',
          options: ['title', 'src', 'alt', 'text'],
          correctAnswer: 2
        },
        {
          question: 'What is the purpose of the "target" attribute in an <a> tag?',
          options: ['To set the color', 'To specify where to open the link', 'To add a title', 'To link to a CSS file'],
          correctAnswer: 1
        },
        {
          question: 'Which attribute is used to uniquely identify an element in HTML?',
          options: ['class', 'name', 'id', 'style'],
          correctAnswer: 2
        }
      ]
    },
    { 
      id: 3, 
      title: 'Forms & Inputs', 
      duration: '12 min', 
      completed: false,
      content: 'Forms are used to collect user input. Common elements include <input>, <textarea>, <button>, and <select>. The <label> tag is used to define a label for an input element.',
      codeSnippet: '<form>\n  <label>Name:</label>\n  <input type="text">\n  <button>Submit</button>\n</form>',
      quiz: [
        {
          question: 'Which tag is used to create a multi-line text input?',
          options: ['<input type="text">', '<textarea>', '<label>', '<form>'],
          correctAnswer: 1
        },
        {
          question: 'What is the purpose of the <label> tag?',
          options: ['To create a button', 'To define a label for an input element', 'To group form elements', 'To submit the form'],
          correctAnswer: 1
        },
        {
          question: 'Which input type is used for a password field?',
          options: ['type="text"', 'type="hidden"', 'type="password"', 'type="secure"'],
          correctAnswer: 2
        },
        {
          question: 'Which tag is used to create a dropdown list?',
          options: ['<input>', '<select>', '<list>', '<dropdown>'],
          correctAnswer: 1
        },
        {
          question: 'What attribute is used to group radio buttons together?',
          options: ['id', 'class', 'name', 'value'],
          correctAnswer: 2
        }
      ]
    },
  ],
  CSS: [
    { 
      id: 1, 
      title: 'Selectors & Specificity', 
      duration: '10 min', 
      completed: false,
      content: 'CSS selectors are used to "find" (or select) the HTML elements you want to style. Specificity is the means by which browsers decide which CSS property values are the most relevant to an element.',
      codeSnippet: 'h1 {\n  color: purple;\n  font-size: 24px;\n}\n\n.my-class {\n  background: black;\n}',
      quiz: [
        {
          question: 'Which selector targets an element with a specific class?',
          options: ['#id', '.class', 'element', '*'],
          correctAnswer: 1
        },
        {
          question: 'Which selector targets an element with a specific ID?',
          options: ['.class', '#id', 'element', '::after'],
          correctAnswer: 1
        },
        {
          question: 'How do you select all <p> elements inside a <div>?',
          options: ['div p', 'div + p', 'div > p', 'div.p'],
          correctAnswer: 0
        },
        {
          question: 'What is the specificity of an ID selector?',
          options: ['0,0,1,0', '0,1,0,0', '1,0,0,0', '0,0,0,1'],
          correctAnswer: 1
        },
        {
          question: 'Which selector is used to style an element when the mouse is over it?',
          options: [':active', ':focus', ':hover', ':visited'],
          correctAnswer: 2
        }
      ]
    },
    { 
      id: 2, 
      title: 'Flexbox Mastery', 
      duration: '15 min', 
      completed: false,
      content: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns. It makes it easier to design flexible responsive layout structure without using float or positioning.',
      codeSnippet: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}',
      quiz: [
        {
          question: 'Which property is used to align items along the main axis in Flexbox?',
          options: ['align-items', 'justify-content', 'flex-direction', 'display'],
          correctAnswer: 1
        },
        {
          question: 'What is the default value of flex-direction?',
          options: ['column', 'row-reverse', 'row', 'column-reverse'],
          correctAnswer: 2
        },
        {
          question: 'Which property allows items to wrap onto multiple lines?',
          options: ['flex-wrap', 'flex-flow', 'display', 'align-content'],
          correctAnswer: 0
        },
        {
          question: 'How do you align items along the cross axis?',
          options: ['justify-content', 'align-items', 'flex-wrap', 'align-self'],
          correctAnswer: 1
        },
        {
          question: 'What does "flex-grow: 1" do?',
          options: ['Makes the item shrink', 'Allows the item to grow and fill available space', 'Sets a fixed width', 'Hides the item'],
          correctAnswer: 1
        }
      ]
    },
    { 
      id: 3, 
      title: 'Grid Layouts', 
      duration: '20 min', 
      completed: false,
      content: 'CSS Grid Layout is a two-dimensional system, meaning it can handle both columns and rows. It is a powerful tool for creating complex web layouts.',
      codeSnippet: '.grid-container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 10px;\n}',
      quiz: [
        {
          question: 'How do you define a grid with three equal columns?',
          options: ['grid-template-columns: 100px 100px 100px;', 'grid-template-columns: 1fr 1fr 1fr;', 'display: flex;', 'grid-gap: 10px;'],
          correctAnswer: 1
        },
        {
          question: 'Which property defines the space between grid rows and columns?',
          options: ['margin', 'padding', 'gap', 'border-spacing'],
          correctAnswer: 2
        },
        {
          question: 'What does "1fr" represent in CSS Grid?',
          options: ['1 fixed row', '1 fraction of the available space', '1 font-relative unit', '1 fluid row'],
          correctAnswer: 1
        },
        {
          question: 'How do you make a grid item span two columns?',
          options: ['grid-column: span 2;', 'grid-row: span 2;', 'column-span: 2;', 'grid-width: 2;'],
          correctAnswer: 0
        },
        {
          question: 'Which property is used to align grid items inside their cells?',
          options: ['justify-items', 'align-content', 'grid-align', 'place-items'],
          correctAnswer: 3
        }
      ]
    },
  ],
  JavaScript: [
    { 
      id: 1, 
      title: 'Variables & Data Types', 
      duration: '7 min', 
      completed: false,
      content: 'Variables are containers for storing data values. JavaScript has several data types including strings, numbers, booleans, objects, and more. Use let or const to declare variables.',
      codeSnippet: 'const name = "Verse";\nlet age = 25;\nconst isLearning = true;',
      quiz: [
        {
          question: 'Which keyword is used to declare a variable that cannot be reassigned?',
          options: ['let', 'var', 'const', 'set'],
          correctAnswer: 2
        },
        {
          question: 'Which of these is NOT a primitive data type in JavaScript?',
          options: ['String', 'Number', 'Boolean', 'Array'],
          correctAnswer: 3
        },
        {
          question: 'What is the result of typeof null?',
          options: ['"null"', '"undefined"', '"object"', '"string"'],
          correctAnswer: 2
        },
        {
          question: 'Which keyword is used to declare a block-scoped variable that CAN be reassigned?',
          options: ['var', 'let', 'const', 'block'],
          correctAnswer: 1
        },
        {
          question: 'What is the value of an uninitialized variable?',
          options: ['null', '0', 'undefined', 'false'],
          correctAnswer: 2
        }
      ]
    },
    { 
      id: 2, 
      title: 'Functions & Scope', 
      duration: '12 min', 
      completed: false,
      content: 'A function is a block of code designed to perform a particular task. Scope determines the accessibility of variables. Global scope variables are accessible everywhere, while local scope variables are only accessible within the function.',
      codeSnippet: 'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("User"));',
      quiz: [
        {
          question: 'What is the scope of a variable declared inside a function?',
          options: ['Global', 'Local', 'Block', 'Universal'],
          correctAnswer: 1
        },
        {
          question: 'How do you call a function named "myFunction"?',
          options: ['call myFunction()', 'myFunction()', 'execute myFunction', 'run myFunction'],
          correctAnswer: 1
        },
        {
          question: 'What is an arrow function syntax?',
          options: ['function => {}', '() => {}', '=> function()', 'arrow function()'],
          correctAnswer: 1
        },
        {
          question: 'What is the "return" keyword used for?',
          options: ['To stop the function', 'To return a value from the function', 'To print to the console', 'To call another function'],
          correctAnswer: 1
        },
        {
          question: 'Can a function be passed as an argument to another function?',
          options: ['Yes', 'No', 'Only if it is an arrow function', 'Only in strict mode'],
          correctAnswer: 0
        }
      ]
    },
    { 
      id: 3, 
      title: 'Async/Await', 
      duration: '15 min', 
      completed: false,
      content: 'Async/await is a special syntax to work with promises in a more comfortable fashion. It makes asynchronous code look and behave a bit more like synchronous code.',
      codeSnippet: 'async function fetchData() {\n  const response = await fetch("api/data");\n  const data = await response.json();\n  return data;\n}',
      quiz: [
        {
          question: 'What does the "await" keyword do?',
          options: ['Stops execution completely', 'Pauses execution until a promise resolves', 'Speeds up the code', 'Creates a new promise'],
          correctAnswer: 1
        },
        {
          question: 'Which keyword must be used before a function to use "await" inside it?',
          options: ['promise', 'wait', 'async', 'defer'],
          correctAnswer: 2
        },
        {
          question: 'What does a function marked with "async" always return?',
          options: ['A string', 'A boolean', 'A promise', 'An object'],
          correctAnswer: 2
        },
        {
          question: 'How do you handle errors in async/await?',
          options: ['Using if/else', 'Using try/catch', 'Using error()', 'Using catch() on the function call'],
          correctAnswer: 1
        },
        {
          question: 'What is a Promise in JavaScript?',
          options: ['A guarantee that code will run', 'An object representing the eventual completion of an async operation', 'A type of function', 'A way to declare variables'],
          correctAnswer: 1
        }
      ]
    },
  ],
};

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'info', onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, x: '-50%' }}
    animate={{ opacity: 1, y: 0, x: '-50%' }}
    exit={{ opacity: 0, y: 20, x: '-50%' }}
    className="fixed bottom-32 left-1/2 z-[100] flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl shadow-2xl min-w-[280px]"
  >
    {type === 'success' ? (
      <CheckCircle className="w-5 h-5 text-purple-400" />
    ) : (
      <Info className="w-5 h-5 text-blue-400" />
    )}
    <p className="text-sm font-bold text-white">{message}</p>
    <button onClick={onClose} className="ml-auto text-zinc-500 hover:text-white">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof initialLessons | null>(null);
  const [lessons, setLessons] = useState<Lessons>(() => {
    const saved = localStorage.getItem('verse_learn_progress');
    if (!saved) return initialLessons;
    
    try {
      const parsed = JSON.parse(saved) as Lessons;
      // Merge saved data with initialLessons to ensure new lessons are included
      const merged: Lessons = { ...initialLessons };
      (Object.keys(initialLessons) as (keyof Lessons)[]).forEach(category => {
        if (parsed[category]) {
          merged[category] = initialLessons[category].map(initialLesson => {
            const savedLesson = parsed[category].find(l => l.id === initialLesson.id);
            return {
              ...initialLesson,
              completed: savedLesson ? savedLesson.completed : false
            };
          });
        }
      });
      return merged;
    } catch (e) {
      return initialLessons;
    }
  });
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' } | null>(null);
  const [currentLesson, setCurrentLesson] = useState<{ category: keyof typeof initialLessons, lesson: Lesson } | null>(null);
  const [userCode, setUserCode] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState(() => localStorage.getItem('verse_learn_username') || 'You');
  const [tempUsername, setTempUsername] = useState(username);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('verse_learn_leaderboard');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Filter out mock entries if they exist
      return parsed.filter((entry: any) => entry.name === username || entry.name === 'You');
    }
    return [
      { name: username, score: 0, rank: 1 }
    ];
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const showChatRef = useRef(showChat);
  useEffect(() => {
    showChatRef.current = showChat;
  }, [showChat]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketStatus, setSocketStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [unreadCount, setUnreadCount] = useState(0);
  const [settings, setSettings] = useState({
    notifications: true,
    hapticFeedback: true,
    autoSave: true,
    difficulty: 'Intermediate'
  });

  useEffect(() => {
    localStorage.setItem('verse_learn_progress', JSON.stringify(lessons));
    
    // Update user score on leaderboard based on progress
    const totalCompleted = Object.values(lessons).flat().filter((l: any) => l.completed).length;
    const userScore = totalCompleted * 500;
    
    setLeaderboard((prev: any) => {
      const newLeaderboard = prev.map((entry: any) => 
        (entry.name === username || entry.name === 'You') ? { ...entry, name: username, score: userScore } : entry
      );
      
      localStorage.setItem('verse_learn_leaderboard', JSON.stringify(newLeaderboard));
      return newLeaderboard;
    });
  }, [lessons, username]);

  const showFeedback = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const startLesson = (category: keyof typeof initialLessons, lesson: Lesson) => {
    setCurrentLesson({ category, lesson });
    setUserCode(lesson.codeSnippet);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setScore(0);
    showFeedback(`Starting: ${lesson.title}`, 'success');
  };

  const resumeLearning = () => {
    const categories: (keyof typeof initialLessons)[] = ['HTML', 'CSS', 'JavaScript'];
    for (const category of categories) {
      const nextLesson = lessons[category].find(l => !l.completed);
      if (nextLesson) {
        startLesson(category, nextLesson);
        return;
      }
    }
    showFeedback('All lessons completed! Great job!', 'success');
  };

  const toggleLesson = (category: keyof typeof initialLessons, lessonId: number) => {
    setLessons(prev => ({
      ...prev,
      [category]: prev[category].map(l => 
        l.id === lessonId ? { ...l, completed: !l.completed } : l
      )
    }));
    
    const lesson = lessons[category].find(l => l.id === lessonId);
    if (lesson?.completed) {
      showFeedback(`Reviewing: ${lesson.title}`, 'info');
    } else {
      showFeedback(`Completed: ${lesson?.title}`, 'success');
    }
  };

  const calculateProgress = (category: keyof typeof initialLessons) => {
    const categoryLessons = lessons[category];
    const completedCount = categoryLessons.filter(l => l.completed).length;
    return Math.round((completedCount / categoryLessons.length) * 100);
  };

  const totalProgress = Math.round(
    ((Object.values(lessons).flat() as Lesson[]).filter(l => l.completed).length / 
    (Object.values(lessons).flat() as Lesson[]).length) * 100
  );

  // WebSocket setup - Always connected
  useEffect(() => {
    let ws: WebSocket | null = null;
    
    const connect = () => {
      setSocketStatus('connecting');
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      ws = new WebSocket(`${protocol}//${window.location.host}`);
      
      ws.onopen = () => {
        console.log('Connected to chat');
        setSocketStatus('connected');
        setSocket(ws);
      };
      
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'history') {
            setChatMessages(message.data);
          } else if (message.type === 'chat') {
            setChatMessages(prev => [...prev, message.data]);
            // Increment unread count if chat is not open
            if (!showChatRef.current) {
              setUnreadCount(prev => prev + 1);
            }
          }
        } catch (err) {
          console.error('Error parsing message:', err);
        }
      };
      
      ws.onclose = () => {
        setSocketStatus('disconnected');
        setSocket(null);
        // Try to reconnect after 5 seconds
        setTimeout(connect, 5000);
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        setSocketStatus('disconnected');
        ws?.close();
      };
    };

    connect();
    
    return () => {
      if (ws) {
        ws.close();
        setSocket(null);
        setSocketStatus('disconnected');
      }
    };
  }, []);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (showChat) {
      setUnreadCount(0);
    }
  }, [showChat]);

  const sendChatMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && chatInput.trim()) {
      socket.send(JSON.stringify({ type: 'chat', text: chatInput, user: username }));
      setChatInput('');
    } else if (chatInput.trim()) {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        showFeedback('Chat not connected. Reconnecting...', 'info');
        // If disconnected, try to reconnect by toggling showChat briefly or just wait for useEffect
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-black/80 backdrop-blur-md sticky top-0 z-40 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter text-white">Verse <span className="text-purple-500">Learn</span></span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowLeaderboard(true)}
            className="p-3 bg-zinc-900 rounded-xl text-yellow-500 hover:bg-zinc-800 transition-all border border-zinc-800 group"
            title="Leaderboard"
          >
            <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => setShowMenu(true)}
            className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:bg-zinc-800 transition-all border border-zinc-800"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto space-y-10 pb-32">
        {/* Hero Section */}
        <section className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-indigo-700 overflow-hidden shadow-2xl shadow-purple-500/20"
          >
            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                Current Progress: {totalProgress}%
              </span>
              <h1 className="text-4xl font-black text-white leading-tight">
                Welcome back, <span className="text-purple-200">{username}</span>. <br/>
                Master the Web Stack.
              </h1>
              <p className="text-purple-100 text-sm font-medium max-w-xs">Continue your journey through HTML, CSS, and JavaScript with interactive modules.</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={resumeLearning}
                  className="bg-white text-purple-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-purple-50 transition-all shadow-xl"
                >
                  Resume Learning
                </button>
                {username === 'You' && (
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="bg-yellow-500 text-black px-6 py-3 rounded-2xl font-bold text-sm hover:bg-yellow-400 transition-all shadow-xl flex items-center gap-2 animate-pulse"
                  >
                    <Settings className="w-4 h-4" />
                    Set Username
                  </button>
                )}
                <button 
                  onClick={() => setShowLeaderboard(true)}
                  className="bg-purple-500/20 border border-purple-400/30 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-purple-500/30 transition-all backdrop-blur-sm flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  View Leaderboard
                </button>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </section>

        {/* How to Learn Card */}
        <section>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setShowHelp(true)}
            className="p-6 bg-zinc-900 rounded-[2rem] border border-zinc-800 hover:border-purple-500/50 transition-all cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">How to Learn</h3>
                <p className="text-zinc-500 text-xs font-medium">New here? See how to master the stack.</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </motion.div>
        </section>

        {/* Learning Paths */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Learning Paths</h3>
              <p className="text-zinc-500 text-sm">Choose a language to start practicing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {(['HTML', 'CSS', 'JavaScript'] as const).map((lang, idx) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedCategory(selectedCategory === lang ? null : lang)}
                className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${
                  selectedCategory === lang 
                    ? 'bg-purple-600 border-purple-500 shadow-xl shadow-purple-500/20' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-purple-500/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${
                      selectedCategory === lang ? 'bg-white/20' : 'bg-black border border-zinc-800'
                    }`}>
                      {lang === 'HTML' && <Layers className={`w-6 h-6 ${selectedCategory === lang ? 'text-white' : 'text-orange-500'}`} />}
                      {lang === 'CSS' && <Cpu className={`w-6 h-6 ${selectedCategory === lang ? 'text-white' : 'text-blue-500'}`} />}
                      {lang === 'JavaScript' && <Activity className={`w-6 h-6 ${selectedCategory === lang ? 'text-white' : 'text-yellow-400'}`} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-lg text-white">{lang}</h4>
                      <p className={`text-xs font-bold uppercase tracking-widest ${
                        selectedCategory === lang ? 'text-purple-100' : 'text-zinc-500'
                      }`}>
                        {lessons[lang].length} Modules • {calculateProgress(lang)}% Complete
                      </p>
                      <div className="mt-2 w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${calculateProgress(lang)}%` }}
                          className={`h-full transition-all duration-1000 ${
                            selectedCategory === lang ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-purple-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${
                    selectedCategory === lang ? 'bg-white text-purple-600 rotate-90' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    <ChevronLeft className="w-5 h-5 rotate-180" />
                  </div>
                </div>

                <AnimatePresence>
                  {selectedCategory === lang && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-3">
                        {lessons[lang].map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-purple-200" />
                              ) : (
                                <PlayCircle className="w-5 h-5 text-white/60" />
                              )}
                              <div>
                                <p className="text-sm font-bold text-white">{lesson.title}</p>
                                <p className="text-[10px] font-bold text-purple-200/60 uppercase tracking-widest">{lesson.duration}</p>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                startLesson(lang, lesson);
                              }}
                              className="text-[10px] font-black uppercase tracking-widest bg-white text-purple-600 px-3 py-1 rounded-lg hover:scale-105 transition-transform active:scale-95"
                            >
                              {lesson.completed ? 'Review' : 'Start'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="p-12 border-t border-zinc-900 bg-black/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-black uppercase tracking-tighter text-white">Verse <span className="text-purple-500">Learn</span></span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <a href="https://t.me/GetVerse/177601" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
              <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Telegram</span>
            </a>
            <a href="https://x.com/VerseEcosystem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
              <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">X (Twitter)</span>
            </a>
            <button onClick={() => setShowHelp(true)} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Contact us</span>
            </button>
            <button onClick={() => setShowLeaderboard(true)} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
              <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Leaderboard</span>
            </button>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
              Built by <span className="text-zinc-400">@SAif_AlShammari01</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Analytics Modal */}
      <AnimatePresence>
        {currentLesson && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-50 bg-black overflow-y-auto"
          >
            <div className="p-6 max-w-2xl mx-auto space-y-8 pb-32">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setCurrentLesson(null)}
                  className="p-3 bg-zinc-900 rounded-2xl text-zinc-400 hover:text-white transition-colors border border-zinc-800 flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Back</span>
                </button>
                <div className="text-right">
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">{currentLesson.lesson.title}</h2>
                  <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">{currentLesson.category} Module</p>
                </div>
              </div>

              {/* Explanation Section */}
              <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 space-y-4">
                <div className="flex items-center gap-3 text-purple-400">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="text-sm font-black uppercase tracking-widest">How to go about it</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {currentLesson.lesson.content}
                </p>
              </div>

              {/* Practice Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-purple-400">
                    <Code2 className="w-5 h-5" />
                    <h3 className="text-sm font-black uppercase tracking-widest">Practice Coding</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-zinc-950 p-6 rounded-[2rem] border border-zinc-800 font-mono text-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Editor</span>
                      </div>
                      <button 
                        onClick={() => {
                          setUserCode(currentLesson.lesson.codeSnippet);
                          showFeedback('Code reset to original', 'info');
                        }}
                        className="text-[10px] font-black uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1.5 rounded-lg hover:bg-purple-500/20 transition-all active:scale-95 flex items-center gap-2"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset Code
                      </button>
                    </div>
                    <textarea 
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-48 bg-transparent text-purple-300 outline-none resize-none"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>

              {/* Quiz Section */}
              {currentLesson.lesson.quiz && currentLesson.lesson.quiz.length > 0 && (
                <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 space-y-6">
                  <div className="flex items-center justify-between text-purple-400">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5" />
                      <h3 className="text-sm font-black uppercase tracking-widest">Quick Quiz</h3>
                    </div>
                    <span className="text-[10px] font-bold bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-purple-500/20">
                      Question {currentQuestionIndex + 1} of {currentLesson.lesson.quiz.length}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-white font-bold text-lg">{currentLesson.lesson.quiz[currentQuestionIndex].question}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {currentLesson.lesson.quiz[currentQuestionIndex].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => !quizSubmitted && setSelectedOption(index)}
                          className={`p-4 rounded-2xl text-left text-sm font-bold transition-all border ${
                            !quizSubmitted 
                              ? (selectedOption === index 
                                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700')
                              : (index === currentLesson.lesson.quiz[currentQuestionIndex].correctAnswer
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/10'
                                  : (selectedOption === index 
                                      ? 'bg-red-500/20 border-red-500 text-red-400 shadow-lg shadow-red-500/10'
                                      : 'bg-zinc-950/50 border-zinc-900 text-zinc-600 opacity-50'))
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-zinc-500">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                          </div>
                        </button>
                      ))}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        onClick={() => {
                          if (selectedOption !== null) {
                            setQuizSubmitted(true);
                            if (selectedOption === currentLesson.lesson.quiz[currentQuestionIndex].correctAnswer) {
                              setScore(prev => prev + 1);
                              showFeedback('Correct answer!', 'success');
                            } else {
                              showFeedback('Incorrect, keep going!', 'info');
                            }
                          }
                        }}
                        disabled={selectedOption === null}
                        className="w-full py-4 bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black uppercase tracking-widest hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className={`p-6 rounded-3xl text-center space-y-2 ${
                          selectedOption === currentLesson.lesson.quiz[currentQuestionIndex].correctAnswer
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                            {selectedOption === currentLesson.lesson.quiz[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Incorrect'}
                          </p>
                          <p className="text-sm font-bold leading-relaxed">
                            {selectedOption === currentLesson.lesson.quiz[currentQuestionIndex].correctAnswer 
                              ? 'Great job! You got it right.' 
                              : `The correct answer is: ${currentLesson.lesson.quiz[currentQuestionIndex].options[currentLesson.lesson.quiz[currentQuestionIndex].correctAnswer]}`}
                          </p>
                        </div>
                        {currentQuestionIndex < currentLesson.lesson.quiz.length - 1 ? (
                          <button
                            onClick={() => {
                              setCurrentQuestionIndex(prev => prev + 1);
                              setSelectedOption(null);
                              setQuizSubmitted(false);
                            }}
                            className="w-full py-4 bg-zinc-800 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-700 transition-all"
                          >
                            Next Question
                          </button>
                        ) : (
                          <div className="space-y-3">
                            <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-center">
                              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">Quiz Result</p>
                              <p className="text-2xl font-black text-white">{score} / {currentLesson.lesson.quiz.length}</p>
                              <p className="text-[10px] font-bold text-purple-400 mt-2">+{score * 100} XP EARNED</p>
                            </div>
                            <button
                              onClick={() => {
                                toggleLesson(currentLesson.category, currentLesson.lesson.id);
                                setCurrentLesson(null);
                              }}
                              className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20"
                            >
                              Finish Lesson
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Modal */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-end p-6 pt-24"
            onClick={() => setShowMenu(false)}
          >
            <motion.div 
              className="bg-zinc-900 w-64 rounded-[2rem] border border-zinc-800 overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 space-y-2">
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    setShowLeaderboard(true);
                  }}
                  className="w-full flex items-center gap-4 p-4 hover:bg-zinc-800 rounded-2xl transition-colors text-left"
                >
                  <TrendingUp className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-white">Leaderboard</span>
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    setShowSettings(true);
                  }}
                  className="w-full flex items-center gap-4 p-4 hover:bg-zinc-800 rounded-2xl transition-colors text-left"
                >
                  <Settings className="w-5 h-5 text-zinc-400" />
                  <span className="font-bold text-white">Settings</span>
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    setShowSettings(true);
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-purple-600/10 hover:bg-purple-600/20 rounded-2xl transition-colors text-left border border-purple-500/20"
                >
                  <Activity className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-white">View Progress</span>
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    setShowHelp(true);
                  }}
                  className="w-full flex items-center gap-4 p-4 hover:bg-zinc-800 rounded-2xl transition-colors text-left"
                >
                  <Info className="w-5 h-5 text-zinc-400" />
                  <span className="font-bold text-white">How to Learn</span>
                </button>
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    setShowHelp(true);
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-purple-600/10 hover:bg-purple-600/20 rounded-2xl transition-colors text-left border border-purple-500/20"
                >
                  <Mail className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-white">Contact us</span>
                </button>
                <div className="h-px bg-zinc-800 mx-4 my-2" />
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    showFeedback('Logged out', 'info');
                  }}
                  className="w-full flex items-center gap-4 p-4 hover:bg-zinc-800 rounded-2xl transition-colors text-left"
                >
                  <X className="w-5 h-5 text-red-500" />
                  <span className="font-bold text-red-500">Logout</span>
                </button>
              </div>
              <div className="p-6 bg-zinc-950/50 border-t border-zinc-800/50">
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center">
                  Built by <span className="text-zinc-400">@SAif_AlShammari01</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help & Support Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-zinc-900 w-full max-w-lg rounded-[2.5rem] border border-zinc-800 overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-500">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white">Help & Support</h2>
                      <p className="text-zinc-500 text-xs font-medium">How can we help you today?</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowHelp(false)}
                    className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-purple-600/10 rounded-3xl border border-purple-500/20 space-y-4">
                    <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-widest">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      How to Learn
                    </h3>
                    <div className="space-y-3">
                      {[
                        { step: "1. Choose a Path", desc: "Select HTML, CSS, or JavaScript from the dashboard." },
                        { step: "2. Read & Practice", desc: "Read the lesson and use the live editor to practice code." },
                        { step: "3. Take the Quiz", desc: "Test your knowledge with quizzes to earn XP points." },
                        { step: "4. Track Progress", desc: "View your stats in the 'View Progress' menu or Settings." },
                        { step: "5. Climb the Ranks", desc: "Earn enough XP to reach Grandmaster status!" }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-purple-600/20 flex items-center justify-center text-[10px] font-black text-purple-500 shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-200">{item.step}</p>
                            <p className="text-[10px] text-zinc-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-500" />
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-3">
                      {[
                        { q: "How do I track my progress?", a: "Your progress is automatically tracked as you complete lessons in each module." },
                        { q: "Can I reset a lesson?", a: "Yes, use the 'Reset Code' button in the editor to start over." },
                        { q: "Is this app free?", a: "Yes, Verse Learn is a free interactive learning platform." }
                      ].map((faq, i) => (
                        <div key={i} className="space-y-1">
                          <p className="text-xs font-bold text-zinc-300">{faq.q}</p>
                          <p className="text-[11px] text-zinc-500 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <a 
                      href="mailto:ameliahannah293@gmail.com"
                      className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 hover:bg-zinc-800 transition-all text-left group block"
                    >
                      <Mail className="w-5 h-5 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-white">Email Support</p>
                      <p className="text-[10px] text-zinc-500 mt-1">ameliahannah293@gmail.com</p>
                    </a>
                    <button 
                      onClick={() => {
                        setShowHelp(false);
                        setShowChat(true);
                      }}
                      className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 hover:bg-zinc-800 transition-all text-left group"
                    >
                      <MessageSquare className="w-5 h-5 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-white">Live Chat</p>
                      <p className="text-[10px] text-zinc-500 mt-1">Available 9am - 5pm</p>
                    </button>
                  </div>

                  <div className="pt-6 border-t border-zinc-800">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Socials & Contact</p>
                    <div className="grid grid-cols-2 gap-4">
                      <a 
                        href="https://t.me/GetVerse/177601" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
                          <Send className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white uppercase tracking-tighter">Telegram</p>
                          <p className="text-[9px] text-zinc-500">Join Community</p>
                        </div>
                      </a>
                      <a 
                        href="https://x.com/VerseEcosystem" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 bg-zinc-100/10 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <Twitter className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white uppercase tracking-tighter">X (Twitter)</p>
                          <p className="text-[9px] text-zinc-500">@VerseEcosystem</p>
                        </div>
                      </a>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-2 opacity-40">
                      <div className="h-px w-8 bg-zinc-800" />
                      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                        Built by <span className="text-zinc-300">@SAif_AlShammari01</span>
                      </p>
                      <div className="h-px w-8 bg-zinc-800" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowHelp(false)}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-purple-500/20"
                >
                  Got it, thanks!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-zinc-900 w-full max-w-lg h-[600px] rounded-[2.5rem] border border-zinc-800 overflow-hidden shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white">Live Support</h2>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        socketStatus === 'connected' ? 'bg-emerald-500 animate-pulse' : 
                        socketStatus === 'connecting' ? 'bg-yellow-500 animate-bounce' : 'bg-red-500'
                      }`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        socketStatus === 'connected' ? 'text-emerald-500' : 
                        socketStatus === 'connecting' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {socketStatus === 'connected' ? 'Online' : 
                         socketStatus === 'connecting' ? 'Connecting...' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChat(false)}
                  className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <MessageSquare className="w-12 h-12 text-zinc-700" />
                    <p className="text-xs font-medium text-zinc-500 max-w-[200px]">
                      Start a conversation with our support team or other students.
                    </p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div 
                    key={msg.id || i} 
                    className={`flex flex-col ${msg.user === username ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      msg.user === username 
                        ? 'bg-purple-600 text-white rounded-tr-none' 
                        : 'bg-zinc-800 text-zinc-200 rounded-tl-none'
                    }`}>
                      <p className="font-bold text-[10px] mb-1 opacity-70 uppercase tracking-widest">{msg.user}</p>
                      <p className="leading-relaxed">{msg.text}</p>
                      <p className="text-[9px] mt-2 opacity-50 text-right">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-6 bg-zinc-950 border-t border-zinc-800">
                <div className="relative flex items-center">
                  <input 
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder={socketStatus === 'connected' ? "Type your message..." : "Connecting to chat..."}
                    disabled={socketStatus !== 'connected'}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button 
                    onClick={sendChatMessage}
                    disabled={socketStatus !== 'connected' || !chatInput.trim()}
                    className="absolute right-2 p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:grayscale"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="bg-zinc-900 w-full max-w-md rounded-[2.5rem] border border-zinc-800 overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-zinc-800 flex justify-between items-center">
                <h2 className="text-xl font-black text-white uppercase tracking-tighter">Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-zinc-500 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Progress Overview Section */}
                <div className="p-6 bg-purple-600/10 rounded-3xl border border-purple-500/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">Your Progress</h3>
                    <div className="px-2 py-1 bg-purple-600 rounded-lg text-[9px] font-black text-white uppercase">
                      {totalProgress}% Total
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-white">{(Object.values(lessons).flat().filter((l: any) => l.completed).length * 500).toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Total XP Points</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-white">{Object.values(lessons).flat().filter((l: any) => l.completed).length}</p>
                      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Lessons Completed</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    {(['HTML', 'CSS', 'JavaScript'] as const).map(lang => (
                      <div key={lang} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-zinc-400">{lang}</span>
                          <span className="text-white">{calculateProgress(lang)}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${calculateProgress(lang)}%` }}
                            className="h-full bg-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Section */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Profile</h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400">Username</label>
                    <input 
                      type="text"
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full bg-black border border-zinc-800 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="h-px bg-zinc-800" />

                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Data & Sync</h3>
                  <button 
                    onClick={() => {
                      localStorage.setItem('verse_learn_progress', JSON.stringify(lessons));
                      localStorage.setItem('verse_learn_username', username);
                      showFeedback('Progress saved successfully!', 'success');
                    }}
                    className="w-full flex items-center justify-between p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl hover:bg-purple-600/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600/20 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-purple-500" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white text-sm">Save Progress</p>
                        <p className="text-[10px] text-zinc-500">Manual backup to local storage</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="h-px bg-zinc-800" />

                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Preferences</h3>
                  {[
                    { id: 'notifications', label: 'Push Notifications', icon: Bell },
                    { id: 'hapticFeedback', label: 'Haptic Feedback', icon: Activity },
                    { id: 'autoSave', label: 'Auto-Save Progress', icon: CheckCircle },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-black rounded-xl border border-zinc-800">
                          <item.icon className="w-5 h-5 text-purple-500" />
                        </div>
                        <span className="font-bold text-white">{item.label}</span>
                      </div>
                      <button 
                        onClick={() => setSettings(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof settings] }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${settings[item.id as keyof typeof settings] ? 'bg-purple-600' : 'bg-zinc-800'}`}
                      >
                        <motion.div 
                          animate={{ x: settings[item.id as keyof typeof settings] ? 26 : 4 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full"
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => {
                      const finalUsername = tempUsername.trim() || 'You';
                      setUsername(finalUsername);
                      localStorage.setItem('verse_learn_username', finalUsername);
                      setShowSettings(false);
                      showFeedback('Settings saved!', 'success');
                    }}
                    className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* More Menu */}

      {/* Leaderboard Modal */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setShowLeaderboard(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-zinc-900 w-full max-w-md rounded-[2.5rem] border border-zinc-800 overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-gradient-to-br from-purple-600/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-500">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">Global <span className="text-purple-500">Leaderboard</span></h2>
                </div>
                <button 
                  onClick={() => setShowLeaderboard(false)}
                  className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-3">
                {leaderboard.map((entry: any) => (
                  <div 
                    key={entry.name}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      entry.name === username
                        ? 'bg-purple-600/10 border-purple-500/50 shadow-lg shadow-purple-500/5'
                        : 'bg-zinc-950 border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                        entry.rank === 1 ? 'bg-yellow-500 text-black' :
                        entry.rank === 2 ? 'bg-zinc-300 text-black' :
                        entry.rank === 3 ? 'bg-orange-500 text-black' :
                        'bg-zinc-800 text-zinc-500'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${entry.name === username ? 'text-purple-400' : 'text-white'}`}>
                          {entry.name}
                        </p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          {entry.score >= 2000 ? 'Grandmaster' : entry.score >= 1000 ? 'Expert' : 'Novice'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">{entry.score.toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">XP Points</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-zinc-950 border-t border-zinc-800 space-y-4">
                {username === 'You' && (
                  <button 
                    onClick={() => {
                      setShowLeaderboard(false);
                      setShowSettings(true);
                    }}
                    className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Set Username to Save Progress
                  </button>
                )}
                <p className="text-[10px] font-bold text-zinc-500 text-center uppercase tracking-[0.2em]">
                  Complete more lessons to climb the ranks
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-purple-600/40 z-40 border-4 border-black group"
      >
        <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        
        {/* Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-black"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Online Status Dot */}
        <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-black ${
          socketStatus === 'connected' ? 'bg-emerald-500' : 
          socketStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
        }`} />
      </motion.button>
    </div>
  );
}
