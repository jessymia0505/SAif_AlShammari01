import React, { useState, useEffect } from 'react';
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
  BarChart3,
  CheckCircle,
  Info,
  HelpCircle,
  Mail,
  MessageSquare,
  ChevronRight,
  Send,
  Twitter,
  ExternalLink
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const analyticsData = [
  { name: 'Mon', visits: 12 },
  { name: 'Tue', visits: 15 },
  { name: 'Wed', visits: 14 },
  { name: 'Thu', visits: 28 },
  { name: 'Fri', visits: 12 },
  { name: 'Sat', visits: 10 },
  { name: 'Sun', visits: 24 },
];

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
  codeSnippet: string;
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
      completed: true,
      content: 'HTML tags are the building blocks of web pages. They are used to create elements like headings, paragraphs, and links. Most tags have an opening tag like <p> and a closing tag like </p>.',
      codeSnippet: '<h1>Hello World</h1>\n<p>This is a paragraph.</p>'
    },
    { 
      id: 2, 
      title: 'Attributes & Elements', 
      duration: '8 min', 
      completed: false,
      content: 'Attributes provide additional information about elements. They are always specified in the start tag and usually come in name/value pairs like name="value". For example, the <a> tag uses the href attribute to specify a link.',
      codeSnippet: '<a href="https://google.com">Click me</a>\n<img src="image.jpg" alt="Description">'
    },
    { 
      id: 3, 
      title: 'Forms & Inputs', 
      duration: '12 min', 
      completed: false,
      content: 'Forms are used to collect user input. Common elements include <input>, <textarea>, <button>, and <select>. The <label> tag is used to define a label for an input element.',
      codeSnippet: '<form>\n  <label>Name:</label>\n  <input type="text">\n  <button>Submit</button>\n</form>'
    },
  ],
  CSS: [
    { 
      id: 1, 
      title: 'Selectors & Specificity', 
      duration: '10 min', 
      completed: true,
      content: 'CSS selectors are used to "find" (or select) the HTML elements you want to style. Specificity is the means by which browsers decide which CSS property values are the most relevant to an element.',
      codeSnippet: 'h1 {\n  color: purple;\n  font-size: 24px;\n}\n\n.my-class {\n  background: black;\n}'
    },
    { 
      id: 2, 
      title: 'Flexbox Mastery', 
      duration: '15 min', 
      completed: true,
      content: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns. It makes it easier to design flexible responsive layout structure without using float or positioning.',
      codeSnippet: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}'
    },
    { 
      id: 3, 
      title: 'Grid Layouts', 
      duration: '20 min', 
      completed: false,
      content: 'CSS Grid Layout is a two-dimensional system, meaning it can handle both columns and rows. It is a powerful tool for creating complex web layouts.',
      codeSnippet: '.grid-container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 10px;\n}'
    },
  ],
  JavaScript: [
    { 
      id: 1, 
      title: 'Variables & Data Types', 
      duration: '7 min', 
      completed: true,
      content: 'Variables are containers for storing data values. JavaScript has several data types including strings, numbers, booleans, objects, and more. Use let or const to declare variables.',
      codeSnippet: 'const name = "Verse";\nlet age = 25;\nconst isLearning = true;'
    },
    { 
      id: 2, 
      title: 'Functions & Scope', 
      duration: '12 min', 
      completed: false,
      content: 'A function is a block of code designed to perform a particular task. Scope determines the accessibility of variables. Global scope variables are accessible everywhere, while local scope variables are only accessible within the function.',
      codeSnippet: 'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("User"));'
    },
    { 
      id: 3, 
      title: 'Async/Await', 
      duration: '15 min', 
      completed: false,
      content: 'Async/await is a special syntax to work with promises in a more comfortable fashion. It makes asynchronous code look and behave a bit more like synchronous code.',
      codeSnippet: 'async function fetchData() {\n  const response = await fetch("api/data");\n  const data = await response.json();\n  return data;\n}'
    },
  ],
};

const StatCard = ({ icon: Icon, label, value, trend, isLive }: any) => (
  <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      {trend && (
        <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
      {isLive && (
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
          <Circle className="w-2 h-2 fill-purple-400 animate-pulse" />
          Live
        </div>
      )}
    </div>
    <div className="space-y-1">
      <h2 className="text-4xl font-bold text-white tracking-tight">{value}</h2>
      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
    </div>
  </div>
);

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
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof initialLessons | null>(null);
  const [lessons, setLessons] = useState(initialLessons);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' } | null>(null);
  const [currentLesson, setCurrentLesson] = useState<{ category: keyof typeof initialLessons, lesson: Lesson } | null>(null);
  const [userCode, setUserCode] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [settings, setSettings] = useState({
    notifications: true,
    hapticFeedback: true,
    autoSave: true,
    difficulty: 'Intermediate'
  });

  const showFeedback = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const startLesson = (category: keyof typeof initialLessons, lesson: Lesson) => {
    setCurrentLesson({ category, lesson });
    setUserCode(lesson.codeSnippet);
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

  // WebSocket setup
  useEffect(() => {
    if (showChat && !socket) {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${protocol}//${window.location.host}`);
      
      ws.onopen = () => console.log('Connected to chat');
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'history') {
          setChatMessages(message.data);
        } else if (message.type === 'chat') {
          setChatMessages(prev => [...prev, message.data]);
        }
      };
      ws.onclose = () => setSocket(null);
      setSocket(ws);
    }
    
    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [showChat]);

  const sendChatMessage = () => {
    if (socket && chatInput.trim()) {
      socket.send(JSON.stringify({ type: 'chat', text: chatInput, user: 'Student' }));
      setChatInput('');
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
            onClick={() => setShowAnalytics(true)}
            className="p-3 bg-zinc-900 rounded-xl text-purple-400 hover:bg-zinc-800 transition-all border border-zinc-800 group"
          >
            <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
              <h1 className="text-4xl font-black text-white leading-tight">Master the Web <br/>Stack Today.</h1>
              <p className="text-purple-100 text-sm font-medium max-w-xs">Continue your journey through HTML, CSS, and JavaScript with interactive modules.</p>
              <button 
                onClick={resumeLearning}
                className="bg-white text-purple-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-purple-50 transition-all shadow-xl"
              >
                Resume Learning
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
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
                    <div>
                      <h4 className="font-black text-lg text-white">{lang}</h4>
                      <p className={`text-xs font-bold uppercase tracking-widest ${
                        selectedCategory === lang ? 'text-purple-100' : 'text-zinc-500'
                      }`}>
                        {lessons[lang].length} Modules • {calculateProgress(lang)}% Complete
                      </p>
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
                  <button 
                    onClick={() => {
                      toggleLesson(currentLesson.category, currentLesson.lesson.id);
                      setCurrentLesson(null);
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-purple-500 transition-all"
                  >
                    Complete Lesson
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-zinc-950 p-6 rounded-[2rem] border border-zinc-800 font-mono text-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Editor</span>
                      <button 
                        onClick={() => setUserCode(currentLesson.lesson.codeSnippet)}
                        className="text-[10px] font-bold text-purple-500 hover:text-purple-400"
                      >
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
                    setShowHelp(true);
                  }}
                  className="w-full flex items-center gap-4 p-4 hover:bg-zinc-800 rounded-2xl transition-colors text-left"
                >
                  <Info className="w-5 h-5 text-zinc-400" />
                  <span className="font-bold text-white">Help & Support</span>
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
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
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
                    className={`flex flex-col ${msg.user === 'Student' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      msg.user === 'Student' 
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
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Type your message..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-purple-500 transition-all"
                  />
                  <button 
                    onClick={sendChatMessage}
                    className="absolute right-2 p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all shadow-lg shadow-purple-500/20"
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
              <div className="p-8 space-y-6">
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
                <div className="pt-4">
                  <button 
                    onClick={() => {
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

      {/* Analytics Modal */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="p-6 max-w-2xl mx-auto space-y-8 pb-20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Analytics <span className="text-purple-500">Hub</span></h2>
                </div>
                <button 
                  onClick={() => setShowAnalytics(false)}
                  className="p-3 bg-zinc-900 rounded-2xl text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard 
                  icon={TrendingUp} 
                  label="Total Reach" 
                  value="132" 
                  trend="+12%" 
                />
                <StatCard 
                  icon={Activity} 
                  label="Active Nodes" 
                  value="2" 
                  isLive={true} 
                />
                <div className="md:col-span-2">
                  <StatCard 
                    icon={Layers} 
                    label="Total Events" 
                    value="5" 
                  />
                </div>
              </div>

              {/* Chart */}
              <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Weekly Engagement</h3>
                  <span className="text-[10px] font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded-lg">LIVE DATA</span>
                </div>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#52525B', fontSize: 10, fontWeight: 700 }}
                        dy={10}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-zinc-950 text-white p-3 rounded-2xl shadow-2xl border border-purple-500/30">
                                <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">{payload[0].payload.name}</p>
                                <p className="text-sm font-black">visits : {payload[0].value}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="visits" 
                        radius={[6, 6, 6, 6]} 
                        barSize={24}
                      >
                        {analyticsData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.name === 'Sun' ? '#A855F7' : '#27272A'} 
                            className="transition-all duration-300 hover:fill-purple-400 cursor-pointer"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
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
    </div>
  );
}
