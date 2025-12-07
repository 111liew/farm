import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Sprout, Bell, TrendingUp, Calendar, Settings, Plus, Droplets, 
  Scissors, Trash2, Check, Wind, CloudSun, CloudRain, ChevronRight, 
  User, Shield, LogOut, Leaf, Camera, Sun, Cloud, Moon, X, Clock, 
  Image as ImageIcon, Globe, Edit2, Lock, Mail, MapPin, Tractor,
  ArrowRight, Heart, Activity, LayoutGrid, Zap
} from 'lucide-react';

// --- TRANSLATIONS 🌍 ---
const TRANSLATIONS = {
  en: {
    welcome: "Good Morning,",
    welcome_afternoon: "Good Afternoon,",
    welcome_evening: "Good Evening,",
    subtitle: "Orchard Status: Excellent",
    tasks: "Tasks",
    crops: "My Orchard",
    growth: "Growth Record",
    harvest: "Harvest",
    settings: "Settings",
    active_crops: "Active Crops",
    tasks_today: "Tasks Today",
    today_tasks: "Priority Tasks",
    reminders: "Daily Tasks",
    active: "Pending",
    completed: "Done",
    add_note: "Log Entry",
    upload_photo: "Add Photo",
    save: "Save Entry",
    profile: "My Profile",
    language: "Language",
    logout: "Log Out",
    harvest_prediction: "Harvest Forecast",
    days_left: "Days Left",
    total_yield: "Est. Yield",
    upcoming: "Next Harvest",
    healthy: "Healthy",
    delete_confirm: "Delete this item permanently?",
    water_advice: "Smart Advisory",
    water_ok: "Soil moisture optimal. Standard watering.",
    water_skip: "Rainfall expected. Skip irrigation.",
    water_more: "High temperatures. Increase water by 20%.",
    custom_crop: "Custom Crop",
    enter_crop_name: "Crop Name",
    enter_days: "Days to Maturity",
    calendar_view: "Calendar",
    select_crop_type: "Select Crop",
    planting_date: "Date Planted",
    current_stage: "Current Stage",
    add_new_crop: "Plant New Crop",
    plant_crop_btn: "Start Growing",
    write_note: "Observations...",
    add_growth_note: "New Journal Entry",
    quick_add: "Quick Actions",
    edit_task: "Edit Task",
    update: "Update Task",
    username_placeholder: "Farmer",
    due: "Harvest",
    kg: "kg",
    harv: "Harv",
    add_task_btn: "Add Task",
    task_name_placeholder: "What needs doing?",
    select_section: "Zone",
    other_section: "Other...",
    enter_section: "Zone Name",
    crop_notes: "Notes / Description",
    email: "Email",
    login_title: "Orchard OS",
    login_subtitle: "Professional Farm Management",
    email_label: "Email Address",
    password_label: "Password",
    name_label: "Full Name",
    login_btn: "Sign In",
    signup_btn: "Create Account",
    toggle_signup: "New user? Create account",
    toggle_login: "Have an account? Sign in",
    demo_hint: "Demo Mode: Enter any details to proceed",
    
    // WEATHER
    condition_cloudy: "Cloudy",
    condition_sunny: "Sunny",
    condition_rain: "Rainy",
    // QUICK ACTIONS
    qa_water: "Water",
    qa_fert: "Fertilize",
    qa_prune: "Prune",
    qa_harv: "Harvest",
    // STAGES
    Seedling: "Seedling",
    Vegetative: "Vegetative",
    Flowering: "Flowering",
    Fruiting: "Fruiting"
  },
  ms: {
    // (Simplified Malay for brevity, can expand)
    welcome: "Selamat Pagi,",
    welcome_afternoon: "Selamat Petang,",
    welcome_evening: "Selamat Malam,",
    subtitle: "Status Kebun: Cemerlang",
    tasks: "Tugasan",
    crops: "Kebun Saya",
    growth: "Rekod Tumbesaran",
    harvest: "Tuai",
    settings: "Tetapan",
    active_crops: "Sedang Tumbuh",
    tasks_today: "Perlu Buat",
    today_tasks: "Tugasan Utama",
    reminders: "Senarai Tugas",
    active: "Belum Siap",
    completed: "Siap",
    add_note: "Catat Jurnal",
    upload_photo: "Tambah Foto",
    save: "Simpan",
    profile: "Profil Saya",
    language: "Bahasa",
    logout: "Log Keluar",
    harvest_prediction: "Ramalan Tuai",
    days_left: "Hari Lagi",
    total_yield: "Anggaran Hasil",
    upcoming: "Tuai Seterusnya",
    healthy: "Sihat",
    delete_confirm: "Padam item ini kekal?",
    water_advice: "Nasihat Pintar",
    water_ok: "Kelembapan tanah optimum.",
    water_skip: "Hujan dijangka. Jimat air.",
    water_more: "Cuaca panas! Siram lebih.",
    custom_crop: "Tanaman Lain",
    enter_crop_name: "Nama Tanaman",
    enter_days: "Tempoh Matang (Hari)",
    calendar_view: "Kalendar",
    select_crop_type: "Pilih Tanaman",
    planting_date: "Tarikh Tanam",
    current_stage: "Peringkat",
    add_new_crop: "Tanam Baru",
    plant_crop_btn: "Mula Tanam",
    write_note: "Pemerhatian...",
    add_growth_note: "Entri Jurnal Baru",
    quick_add: "Tindakan Pantas",
    edit_task: "Edit Tugas",
    update: "Kemaskini",
    username_placeholder: "Petani",
    due: "Tuai",
    kg: "kg",
    harv: "Tuai",
    add_task_btn: "Tambah",
    task_name_placeholder: "Nama tugasan...",
    select_section: "Zon",
    other_section: "Lain-lain...",
    enter_section: "Nama Zon",
    crop_notes: "Nota / Penerangan",
    email: "Emel",
    login_title: "Orchard OS",
    login_subtitle: "Pengurusan Ladang Profesional",
    email_label: "Alamat Emel",
    password_label: "Kata Laluan",
    name_label: "Nama Penuh",
    login_btn: "Log Masuk",
    signup_btn: "Daftar Akaun",
    toggle_signup: "Pengguna baru? Daftar",
    toggle_login: "Sudah ada akaun? Log masuk",
    demo_hint: "Mod Demo: Masukkan sebarang butiran",
    // WEATHER
    condition_cloudy: "Mendung",
    condition_sunny: "Cerah",
    condition_rain: "Hujan",
    // QUICK ACTIONS
    qa_water: "Siram",
    qa_fert: "Baja",
    qa_prune: "Cantas",
    qa_harv: "Tuai",
    // STAGES
    Seedling: "Anak Benih",
    Vegetative: "Vegetatif",
    Flowering: "Berbunga",
    Fruiting: "Berbuah"
  },
  zh: {
    // (Simplified Chinese for brevity)
    welcome: "早上好，",
    welcome_afternoon: "下午好，",
    welcome_evening: "晚上好，",
    subtitle: "果园状况：优秀",
    tasks: "任务",
    crops: "我的果园",
    growth: "生长记录",
    harvest: "收获",
    settings: "设置",
    active_crops: "生长中",
    tasks_today: "待办",
    today_tasks: "今日重点",
    reminders: "任务列表",
    active: "未完成",
    completed: "已完成",
    add_note: "记录日志",
    upload_photo: "添加照片",
    save: "保存",
    profile: "我的资料",
    language: "语言",
    logout: "退出登录",
    harvest_prediction: "收获预测",
    days_left: "剩余天数",
    total_yield: "预估产量",
    upcoming: "下次收获",
    healthy: "健康",
    delete_confirm: "永久删除此项？",
    water_advice: "智能建议",
    water_ok: "土壤湿度适宜，正常浇水。",
    water_skip: "预计有雨，今日无需浇水。",
    water_more: "高温预警！请增加浇水量。",
    custom_crop: "自定义作物",
    enter_crop_name: "作物名称",
    enter_days: "成熟周期（天）",
    calendar_view: "日历",
    select_crop_type: "选择作物",
    planting_date: "种植日期",
    current_stage: "生长阶段",
    add_new_crop: "种植新作物",
    plant_crop_btn: "开始种植",
    write_note: "观察记录...",
    add_growth_note: "新日志",
    quick_add: "快速操作",
    edit_task: "编辑任务",
    update: "更新",
    username_placeholder: "农场主",
    due: "收获",
    kg: "公斤",
    harv: "收获",
    add_task_btn: "添加",
    task_name_placeholder: "任务名称...",
    select_section: "区域",
    other_section: "其他...",
    enter_section: "区域名称",
    crop_notes: "备注 / 描述",
    email: "电子邮件",
    login_title: "果园管家",
    login_subtitle: "专业农场管理系统",
    email_label: "电子邮件",
    password_label: "密码",
    name_label: "您的名字",
    login_btn: "登录",
    signup_btn: "注册账号",
    toggle_signup: "新用户？注册",
    toggle_login: "已有账号？登录",
    demo_hint: "演示模式：输入任意信息即可",
    // WEATHER
    condition_cloudy: "多云",
    condition_sunny: "晴朗",
    condition_rain: "有雨",
    // QUICK ACTIONS
    qa_water: "浇水",
    qa_fert: "施肥",
    qa_prune: "修剪",
    qa_harv: "收获",
    // STAGES
    Seedling: "幼苗期",
    Vegetative: "生长期",
    Flowering: "开花期",
    Fruiting: "结果期"
  }
};

// --- Initial Data ---
const INITIAL_TASKS = [
  { id: 1, title: 'Water Apple Trees', location: 'Section A', time: '09:00', type: 'water', completed: false },
  { id: 2, title: 'Prune Orange Trees', location: 'Section B', time: '11:00', type: 'prune', completed: false },
];

// --- CROP DATABASE ---
const CROP_TYPES = {
  'Durian': { days: 125, yield: 500, icon: '🍈' },
  'Mango': { days: 100, yield: 300, icon: '🥭' },
  'Watermelon': { days: 85, yield: 50, icon: '🍉' },
  'Papaya': { days: 150, yield: 40, icon: '🍈' },
  'Banana': { days: 270, yield: 25, icon: '🍌' },
  'Apple': { days: 120, yield: 60, icon: '🍎' },
  'Orange': { days: 150, yield: 55, icon: '🍊' },
  'Pineapple': { days: 300, yield: 2, icon: '🍍' },
  'Strawberry': { days: 90, yield: 1, icon: '🍓' }
};

const WEATHER_DATA = {
  temp: 33, conditionKey: 'condition_sunny', high: 34, low: 26, location: 'Putrajaya', 
  hourly: [
    { time: 'Now', icon: <Sun size={18} />, temp: 33 },
    { time: '3 PM', icon: <CloudSun size={18} />, temp: 32 },
    { time: '4 PM', icon: <CloudSun size={18} />, temp: 31 },
    { time: '5 PM', icon: <Cloud size={18} />, temp: 30 },
    { time: '6 PM', icon: <Cloud size={18} />, temp: 29 },
  ],
  daily: [
    { day: 'Today', icon: <Sun size={16} />, low: 26, high: 34, rain: false },
    { day: 'Tue', icon: <CloudSun size={16} />, low: 25, high: 32, rain: false },
    { day: 'Wed', icon: <CloudRain size={16} />, low: 24, high: 30, rain: true },
    { day: 'Thu', icon: <CloudRain size={16} />, low: 24, high: 29, rain: true },
    { day: 'Fri', icon: <Cloud size={16} />, low: 25, high: 31, rain: false },
  ]
};

// --- Helper Functions ---
const getDaysLeft = (harvestDateString) => {
  const today = new Date();
  const harvest = new Date(harvestDateString);
  today.setHours(0, 0, 0, 0); harvest.setHours(0, 0, 0, 0);
  const diffTime = harvest.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const getStageIcon = (stage, defaultIcon) => {
    if (stage === 'Seedling') return '🌱';
    if (stage === 'Vegetative') return '🌿';
    if (stage === 'Flowering') return '🌸';
    if (stage === 'Fruiting') return defaultIcon; // Show the fruit itself
    return defaultIcon;
};

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'water': return <Droplets size={20} className="text-blue-500" />;
      case 'prune': return <Scissors size={20} className="text-purple-500" />;
      case 'harvest': return <Leaf size={20} className="text-orange-500" />;
      case 'fertilize': return <Sprout size={20} className="text-emerald-500" />;
      default: return <Check size={20} className="text-gray-500" />;
    }
  };
  return (
    <div className={`bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-sm border border-emerald-50/50 flex flex-col mb-3 transition-all duration-300 ${task.completed ? 'opacity-60 grayscale' : 'hover:scale-[1.02] hover:shadow-emerald-200/50 hover:shadow-lg'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => onEdit && onEdit(task)}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.completed ? 'bg-gray-100' : 'bg-emerald-50 border border-emerald-100'}`}>
                {getIcon(task.type)}
            </div>
            <div>
                <h3 className={`font-bold text-gray-800 text-base ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
                <p className="text-xs text-emerald-600/80 flex items-center gap-1 font-medium"><MapPin size={10}/> {task.location}</p>
            </div>
        </div>
        <div className="flex gap-2">
           <button onClick={() => onToggle(task.id)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${task.completed ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-emerald-100 hover:text-emerald-600'}`}><Check size={18} strokeWidth={3} /></button>
           <button onClick={() => onDelete(task.id)} className="w-10 h-10 rounded-full bg-white text-gray-300 border border-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"><Trash2 size={16} /></button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('en'); 
  const t = (key) => TRANSLATIONS[lang][key] || key;
  
  // --- AUTH STATE ---
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- WEATHER STATE ---
  const [weather, setWeather] = useState(null);

  // --- DATA ---
  const [tasks, setTasks] = useState(() => {
    try { const saved = localStorage.getItem('farm_tasks'); return saved ? JSON.parse(saved) : INITIAL_TASKS; } catch (e) { return INITIAL_TASKS; }
  });
  const [crops, setCrops] = useState(() => {
    try { const saved = localStorage.getItem('farm_crops'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; }
  });

  // --- SPLASH ANIMATION ---
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500); // 3.5s splash
    return () => clearTimeout(timer);
  }, []);

  // --- CHECK LOGIN ON LOAD ---
  useEffect(() => {
    const savedLogin = localStorage.getItem('farm_loggedin');
    if (savedLogin === 'true') {
        setIsLoggedIn(true);
        setUserName(localStorage.getItem('farm_username') || 'Farmer'); 
        setUserEmail(localStorage.getItem('farm_email') || '');
    }
  }, []);
  
  // --- LIVE WEATHER API FETCH ---
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=2.9264&longitude=101.6964&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto')
      .then(response => response.json())
      .then(data => { setWeather(data); })
      .catch(err => console.error("Weather fetch error:", err));
  }, []);

  const getWeatherInfo = (code) => {
      if (code === 0) return { icon: <Sun size={24} className="text-yellow-400 animate-pulse"/>, key: 'condition_sunny' };
      if (code >= 1 && code <= 3) return { icon: <CloudSun size={24} className="text-blue-300"/>, key: 'condition_cloudy' };
      if (code >= 51 && code <= 67) return { icon: <CloudRain size={24} className="text-blue-500"/>, key: 'condition_rain' }; 
      return { icon: <Cloud size={24} className="text-gray-400"/>, key: 'condition_cloudy' }; 
  };
  
  useEffect(() => { localStorage.setItem('farm_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { try { localStorage.setItem('farm_crops', JSON.stringify(crops)); } catch (e) { alert("Storage full! Delete old data."); } }, [crops]);

  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskSection, setNewTaskSection] = useState('Section A');
  const [isCustomSection, setIsCustomSection] = useState(false);
  const [customSectionName, setCustomSectionName] = useState('');

  const [showCalendar, setShowCalendar] = useState(false);
  const [activeCropId, setActiveCropId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isCustomCrop, setIsCustomCrop] = useState(false);
  const [cropForm, setCropForm] = useState({ type: 'Durian', date: new Date().toISOString().split('T')[0], stage: 'Seedling', customName: '', customDays: 90, notes: '' });
  
  const today = new Date();
  const hour = today.getHours();
  let greetingKey = "welcome";
  if (hour >= 12 && hour < 18) greetingKey = "welcome_afternoon";
  if (hour >= 18) greetingKey = "welcome_evening";

  const dateString = today.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'ms' ? 'ms-MY' : 'zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // --- HANDLERS ---
  const handleLogin = (e) => {
      e.preventDefault();
      if (userEmail && password && (isSignUp ? userName : true)) {
          setIsLoggedIn(true);
          localStorage.setItem('farm_loggedin', 'true');
          const nameToSave = isSignUp ? userName : (localStorage.getItem('farm_username') || 'Farmer');
          localStorage.setItem('farm_username', nameToSave);
          setUserName(nameToSave);
          localStorage.setItem('farm_email', userEmail);
          setActiveTab('home');
      }
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('farm_loggedin');
      setPassword('');
      setActiveTab('home');
  };

  const toggleTask = (id) => { setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)); };
  const deleteTask = (id) => { setTasks(tasks.filter(t => t.id !== id)); };
  const deleteCrop = (id) => { if (confirm(t('delete_confirm'))) { setCrops(crops.filter(c => c.id !== id)); } };
  const deleteGrowthLog = (cropId, logId) => { if (confirm(t('delete_confirm'))) { setCrops(crops.map(c => { if (c.id === cropId) { return { ...c, logs: c.logs.filter(l => l.id !== logId) }; } return c; })); } };

  const handleTaskSubmit = (e) => {
    e.preventDefault(); 
    if (!newTaskName) return;
    const finalSection = isCustomSection ? customSectionName : newTaskSection;
    if (editingTask) {
        setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, title: newTaskName, location: finalSection } : t));
        setEditingTask(null);
    } else {
        let type = 'general';
        const lower = newTaskName.toLowerCase();
        if (lower.includes('water') || lower.includes('siram') || lower.includes('浇水')) type = 'water';
        else if (lower.includes('prune') || lower.includes('cantas') || lower.includes('修剪')) type = 'prune';
        else if (lower.includes('harvest') || lower.includes('tuai') || lower.includes('收获')) type = 'harvest';
        else if (lower.includes('fertilize') || lower.includes('baja') || lower.includes('施肥')) type = 'fertilize';
        setTasks([...tasks, { id: Date.now(), title: newTaskName, location: finalSection, time: 'Now', type: type, completed: false }]);
    }
    setNewTaskName(''); setIsCustomSection(false); setCustomSectionName(''); setShowAddTask(false);
  };

  const openEditTask = (task) => { setEditingTask(task); setNewTaskName(task.title); setNewTaskSection(task.location); setShowAddTask(true); };
  const addQuickTask = (text) => { setNewTaskName(text); };

  const addCrop = (e) => {
    e.preventDefault();
    let name, days, icon;
    if (isCustomCrop) {
        name = cropForm.customName || "Unknown Crop";
        days = parseInt(cropForm.customDays) || 90;
        icon = '🌱';
    } else {
        const cropInfo = CROP_TYPES[cropForm.type] || { days: 90, yield: 100, icon: '🌱' };
        name = cropForm.type;
        days = cropInfo.days;
        icon = cropInfo.icon;
    }
    const plantingDate = new Date(cropForm.date);
    const harvestDate = new Date(plantingDate);
    harvestDate.setDate(plantingDate.getDate() + days); 
    setCrops([...crops, { id: Date.now(), name: name, plantedDate: cropForm.date, harvestDate: harvestDate.toDateString(), harvestIso: harvestDate.toISOString(), stage: cropForm.stage, daysToMaturity: days, yield: 100, logs: [], description: cropForm.notes }]);
    setShowAddCrop(false); setIsCustomCrop(false); setCropForm({ ...cropForm, customName: '', customDays: 90, notes: '' });
  };

  const handleImageSelect = (e, setImgState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 400; const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH; canvas.height = img.height * scaleSize;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setImgState(canvas.toDataURL('image/jpeg', 0.6));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const addGrowthLog = (e) => {
    e.preventDefault();
    if(!noteText && !selectedImage) return;
    const newLog = { id: Date.now(), date: new Date().toLocaleDateString(), text: noteText, image: selectedImage };
    setCrops(crops.map(c => c.id === activeCropId ? { ...c, logs: [newLog, ...(c.logs || [])] } : c));
    setNoteText(''); setSelectedImage(null); setActiveCropId(null); 
  };

  const getDaysLeft = (harvestDateString) => {
    const today = new Date();
    const harvest = new Date(harvestDateString);
    today.setHours(0, 0, 0, 0); harvest.setHours(0, 0, 0, 0);
    const diffTime = harvest.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // --- SPLASH SCREEN ---
  if (showSplash) {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
          {/* BACKGROUND ANIMATION */}
          <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595856425169-b472534f1981?q=80&w=2940&auto=format&fit=crop')" }}></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-emerald-950 via-emerald-900/40 to-sky-300/30 animate-pulse"></div>
          
          <div className="relative z-10 text-center animate-in fade-in zoom-in duration-1000 flex flex-col items-center">
             <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8 shadow-2xl border border-white/40 ring-4 ring-emerald-400/30">
                 <Leaf size={56} className="text-white drop-shadow-md fill-emerald-100" />
             </div>
             <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-lg mb-3">Orchard OS</h1>
             <p className="text-emerald-50 font-medium text-lg tracking-wide opacity-90">Cultivating Excellence.</p>
          </div>
       </div>
     )
  }

  // --- RENDER LOGIN SCREEN ---
  if (!isLoggedIn) {
      return (
          <div className="min-h-screen bg-cover bg-center flex items-end sm:items-center justify-center p-4 relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-58f2140123dd?q=80&w=3200&auto=format&fit=crop')" }}>
              <div className="absolute inset-0 bg-emerald-950/50 backdrop-blur-[3px] z-0"></div>
              <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm relative z-10 animate-in slide-in-from-bottom-20 duration-500 border border-white/50 mb-6 sm:mb-0">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-emerald-900 mb-2">{t('login_title')}</h1>
                    <p className="text-gray-500 text-sm font-medium">{t('login_subtitle')}</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                      {isSignUp && (
                        <div className="group">
                            <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 ml-1">{t('name_label')}</label>
                            <div className="relative">
                                <User size={18} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" />
                                <input type="text" required className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl py-4 pl-12 pr-4 text-emerald-900 placeholder-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" placeholder="Farmer John" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                        </div>
                      )}
                      <div className="group">
                          <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 ml-1">{t('email_label')}</label>
                          <div className="relative">
                              <Mail size={18} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" />
                              <input type="email" required className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl py-4 pl-12 pr-4 text-emerald-900 placeholder-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" placeholder="farmer@mail.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                          </div>
                      </div>
                      <div className="group">
                          <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 ml-1">{t('password_label')}</label>
                          <div className="relative">
                              <Lock size={18} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" />
                              <input type="password" required className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl py-4 pl-12 pr-4 text-emerald-900 placeholder-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>
                      </div>
                      <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all mt-4 hover:bg-emerald-700">
                          {isSignUp ? t('signup_btn') : t('login_btn')}
                      </button>
                  </form>
                  
                  <div className="mt-8 text-center">
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
                        {isSignUp ? t('toggle_login') : t('toggle_signup')}
                    </button>
                  </div>
                  
                  <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-emerald-100/50">
                       {['en', 'ms', 'zh'].map(l => (
                           <button key={l} onClick={() => setLang(l)} className={`text-xs font-black uppercase transition-all ${lang === l ? 'text-emerald-600 border-b-2 border-emerald-500 scale-110' : 'text-gray-300 hover:text-gray-400'}`}>{l}</button>
                       ))}
                  </div>
              </div>
          </div>
      )
  }

  // --- MAIN APP ---
  const renderHome = () => {
    const activeTasks = tasks.filter(t => !t.completed);
    let waterAdvice = t('water_ok');
    let waterColor = "from-cyan-400 to-blue-500";
    
    const temp = weather?.current_weather?.temperature || 29;
    const wCode = weather?.current_weather?.weathercode || 0;
    const wInfo = getWeatherInfo(wCode);
    
    if (temp > 32) { waterAdvice = t('water_more'); waterColor = "from-orange-400 to-red-500"; }
    if ((wCode >= 51 && wCode <= 67) || (wCode >= 80 && wCode <= 99)) { waterAdvice = t('water_skip'); waterColor = "from-slate-500 to-gray-600"; }

    return (
      <div className="space-y-6 pb-32">
        <div className="flex justify-between items-center px-1 pt-6">
            <div>
                <p className="text-emerald-800/60 text-xs font-bold uppercase tracking-wider mb-1">{dateString}</p>
                <h1 className="text-4xl font-black text-emerald-900 tracking-tighter leading-tight">{t(greetingKey)} <br/><span className="text-emerald-600">{userName}</span>.</h1>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-md border-2 border-white shadow-xl overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveTab('settings')}>
                <User size={24} className="text-emerald-700"/>
            </div>
        </div>
        
        {/* Modern Weather Card */}
        <div className={`bg-gradient-to-br ${waterColor} rounded-[2.5rem] p-6 text-white shadow-xl shadow-cyan-900/20 relative overflow-hidden transition-colors duration-500 group`}>
            <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:scale-110 transition-transform duration-1000 rotate-12"><Sun size={100} /></div>
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <div className="text-7xl font-light tracking-tighter mb-1">{temp}°</div>
                    <div className="text-base font-bold opacity-90 flex items-center gap-2 uppercase tracking-wide">{wInfo.icon} {t(wInfo.key)}</div>
                </div>
                <div className="text-right pt-2">
                    <div className="text-sm font-bold opacity-80 uppercase tracking-widest">Putrajaya</div>
                    <div className="text-xs opacity-60 mt-1 font-medium bg-black/20 px-3 py-1 rounded-full">H:{weather?.daily?.temperature_2m_max[0]}° L:{weather?.daily?.temperature_2m_min[0]}°</div>
                </div>
            </div>
            <div className={`mt-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-4`}>
                <div className="bg-white/20 p-2.5 rounded-full"><Droplets size={20} className="text-white" /></div>
                <p className="text-sm font-bold leading-relaxed opacity-95">{waterAdvice}</p>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => setActiveTab('crops')} className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-white/50 active:scale-95 transition-transform cursor-pointer group hover:bg-white">
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform"><Sprout size={24}/></div>
                <ArrowRight size={20} className="text-gray-300 group-hover:text-emerald-500 transition-colors"/>
            </div>
            <div className="text-4xl font-black text-gray-800 mb-1">{crops.length}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('active_crops')}</div>
          </div>
          <div onClick={() => setActiveTab('tasks')} className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-white/50 active:scale-95 transition-transform cursor-pointer group hover:bg-white">
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform"><Check size={24}/></div>
                <ArrowRight size={20} className="text-gray-300 group-hover:text-orange-500 transition-colors"/>
            </div>
            <div className="text-4xl font-black text-gray-800 mb-1">{activeTasks.length}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('tasks_today')}</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-5 px-2 pt-2">
            <h2 className="text-2xl font-black text-gray-800">{t('today_tasks')}</h2>
            <button onClick={() => setActiveTab('tasks')} className="text-xs font-bold text-emerald-700 bg-emerald-100/50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors">View All</button>
          </div>
          {activeTasks.slice(0, 2).map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditTask} />)}
          {activeTasks.length === 0 && <div className="p-10 bg-white/60 border-2 border-dashed border-emerald-100 rounded-[2.5rem] text-center text-emerald-800/40 text-sm font-bold uppercase tracking-wider">✨ All caught up!</div>}
        </div>
      </div>
    );
  };

  const renderTasks = () => {
    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);
    return (
      <div className="pb-32 pt-8">
        <h1 className="text-4xl font-black text-gray-900 px-2 mb-8 tracking-tight">{t('reminders')}</h1>
        
        {/* Floating Add Bar */}
        <div className="bg-white/90 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white/60 mb-8 sticky top-4 z-30 transition-all">
            <div className="flex justify-between items-center mb-4 px-2">
               <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">{editingTask ? t('edit_task') : t('quick_add')}</h3>
               <button onClick={() => { setShowAddTask(!showAddTask); setEditingTask(null); setNewTaskName(''); }} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${showAddTask ? 'bg-gray-100 text-gray-500' : 'bg-emerald-600 text-white shadow-emerald-500/30'}`}>{showAddTask ? <X size={20}/> : <Plus size={22}/>}</button>
            </div>
            {showAddTask && (
                <form onSubmit={handleTaskSubmit} className="animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 hide-scrollbar">
                        {['qa_water', 'qa_fert', 'qa_prune', 'qa_harv'].map(k => (
                            <button type="button" onClick={() => addQuickTask(t(k))} key={k} className="bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2.5 rounded-2xl whitespace-nowrap hover:bg-emerald-100 transition-colors border border-emerald-100/50 shadow-sm">{t(k)}</button>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                        <input type="text" placeholder={t('task_name_placeholder')} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-base font-medium focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-gray-400" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} autoFocus />
                        <div className="flex gap-2">
                             <select className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-bold text-gray-600 focus:ring-2 focus:ring-emerald-500 w-1/2 outline-none" value={isCustomSection ? 'custom' : newTaskSection} onChange={(e) => { if(e.target.value === 'custom') { setIsCustomSection(true); } else { setIsCustomSection(false); setNewTaskSection(e.target.value); } }}>
                                 <option value="Section A">Section A</option>
                                 <option value="Section B">Section B</option>
                                 <option value="Section C">Section C</option>
                                 <option value="custom">{t('other_section')}</option>
                             </select>
                             {isCustomSection && <input type="text" placeholder={t('enter_section')} className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 w-1/2" value={customSectionName} onChange={(e) => setCustomSectionName(e.target.value)} />}
                             <button type="submit" className="bg-emerald-600 text-white px-6 rounded-2xl font-bold text-sm shadow-lg hover:bg-emerald-700 transition-colors w-1/2 shadow-emerald-500/30">{editingTask ? t('update') : t('add_task_btn')}</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
        
        <div className="space-y-3">
            {activeTasks.length > 0 ? activeTasks.map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditTask} />) : <div className="text-center py-20 text-gray-400 font-medium opacity-60">No active tasks today</div>}
        </div>
        
        {completedTasks.length > 0 && (
            <div className="mt-12">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 px-4 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200">{t('completed')}</h3>
                <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                  {completedTasks.map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />)}
                </div>
            </div>
        )}
      </div>
    );
  };

  const renderCrops = () => (
    <div className="pb-32 pt-6">
      <div className="flex justify-between items-center mb-10 px-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('crops')}</h1>
        <button onClick={() => setShowAddCrop(true)} className="bg-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl shadow-emerald-500/40 flex items-center gap-2 hover:scale-105 transition-transform"><Plus size={18}/> {t('add_new_crop')}</button>
      </div>
      
      {showAddCrop && (
        <div className="fixed inset-0 bg-emerald-950/70 flex items-end sm:items-center justify-center z-50 p-4 backdrop-blur-md">
          <form onSubmit={addCrop} className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-20 sm:zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"><h3 className="font-bold text-2xl text-gray-900">{t('add_new_crop')}</h3><button type="button" onClick={() => setShowAddCrop(false)} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors"><X size={20}/></button></div>
            <div className="p-8 space-y-6 overflow-y-auto">
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('select_crop_type')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-lg font-bold text-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none" value={isCustomCrop ? 'custom' : cropForm.type} onChange={(e) => { if (e.target.value === 'custom') { setIsCustomCrop(true); } else { setIsCustomCrop(false); setCropForm({...cropForm, type: e.target.value}); } }}>{Object.keys(CROP_TYPES).map(type => <option key={type} value={type}>{CROP_TYPES[type].icon} {t(type)}</option>)}<option value="custom">➕ {t('custom_crop')}</option></select></div>
              {isCustomCrop && (<div className="space-y-4 animate-in slide-in-from-top-4"><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_crop_name')}</label><input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-medium" value={cropForm.customName} onChange={(e) => setCropForm({...cropForm, customName: e.target.value})} placeholder="e.g. Dragonfruit" /></div><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_days')}</label><input type="number" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-medium" value={cropForm.customDays} onChange={(e) => setCropForm({...cropForm, customDays: e.target.value})} /></div></div>)}
              <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('planting_date')}</label><input type="date" required className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-gray-700" value={cropForm.date} onChange={(e) => setCropForm({...cropForm, date: e.target.value})} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('current_stage')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-gray-700" value={cropForm.stage} onChange={(e) => setCropForm({...cropForm, stage: e.target.value})}><option value="Seedling">{t('Seedling')}</option><option value="Vegetative">{t('Vegetative')}</option><option value="Flowering">{t('Flowering')}</option><option value="Fruiting">{t('Fruiting')}</option></select></div>
              </div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('crop_notes')}</label><textarea className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-medium h-24 resize-none" value={cropForm.notes} onChange={(e) => setCropForm({...cropForm, notes: e.target.value})} placeholder="..." /></div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto"><button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all">{t('plant_crop_btn')}</button></div>
          </form>
        </div>
      )}

      {crops.length === 0 ? (<div className="flex flex-col items-center justify-center h-[50vh] text-center opacity-40"><Sprout size={80} className="text-gray-300 mb-6" /><p className="text-gray-800 font-bold text-2xl">Start your farm</p><p className="text-base text-gray-500">Add your first crop to track growth</p></div>) : (
        <div className="grid gap-5">{crops.map(crop => {
            const daysLeft = getDaysLeft(crop.harvestIso || crop.harvestDate);
            const progress = 100 - (daysLeft / crop.daysToMaturity * 100);
            const clampedProgress = Math.max(0, Math.min(100, progress));
            const icon = CROP_TYPES[crop.name]?.icon || '🌱';
            const iconColor = getStageIcon(crop.stage, icon) === icon ? 'bg-white' : 'bg-emerald-100 text-emerald-600';
            
            return (
            <div key={crop.id} className="bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm border border-white/60 relative overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100"><div className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-r-full transition-all duration-1000" style={{width: `${clampedProgress}%`}}></div></div>
                <div className="flex justify-between items-start mb-6 pt-4">
                    <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 ${iconColor} rounded-3xl flex items-center justify-center text-4xl shadow-sm border border-gray-100`}>{getStageIcon(crop.stage, icon)}</div>
                        <div><h3 className="font-bold text-gray-900 text-xl">{t(crop.name) || crop.name}</h3><p className="text-sm text-emerald-600 font-bold mt-1 bg-emerald-50 px-2 py-0.5 rounded-lg inline-block">{t(crop.stage)}</p></div>
                    </div>
                    <button onClick={() => deleteCrop(crop.id)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={20}/></button>
                </div>
                {crop.description && <div className="text-xs text-gray-500 mb-5 bg-gray-50 p-4 rounded-2xl border border-gray-100 leading-relaxed italic">"{crop.description}"</div>}
                <div className="flex justify-between items-end">
                    <div className="bg-gray-100 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-2 border border-gray-200/50"><Calendar size={14}/> {new Date(crop.harvestDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</div>
                    <div className="text-right"><div className="text-3xl font-black text-emerald-600">{daysLeft}</div><div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('days_left')}</div></div>
                </div>
            </div>
        )})}</div>
      )}
    </div>
  );

  const renderGrowth = () => (
    <div className="pb-32 pt-6">
      <div className="mb-6 px-2"><h1 className="text-3xl font-bold text-gray-800">{t('growth')}</h1></div>
      
      {crops.length > 0 ? (
        <div className="flex overflow-x-auto gap-3 pb-6 hide-scrollbar px-2 snap-x">
            {crops.map((c, i) => (
                <button key={c.id} onClick={() => setActiveCropId(c.id)} className={`snap-center shrink-0 px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all border ${activeCropId === c.id ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg shadow-emerald-500/20' : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300'}`}>
                    {CROP_TYPES[c.name]?.icon} {t(c.name) || c.name}
                </button>
            ))}
        </div>
      ) : <div className="text-center py-20 text-gray-400 font-medium">Add crops to start tracking growth</div>}
      
      {/* ADD NOTE BUTTON */}
      {crops.length > 0 && !activeCropId && setActiveCropId(crops[0].id)}
      
      {/* TIMELINE */}
      {activeCropId && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm border border-white/50 mb-10">
                <div className="flex gap-3">
                    <button onClick={() => fileInputRef.current.click()} className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border border-gray-100"><ImageIcon size={22}/></button>
                    <input type="text" placeholder={t('write_note')} className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 outline-none focus:ring-2 focus:ring-emerald-500 text-base transition-all" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
                    <button onClick={addGrowthLog} className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform"><Plus size={26}/></button>
                </div>
                {selectedImage && (<div className="mt-4 relative rounded-2xl overflow-hidden h-40 w-full border border-gray-200"><img src={selectedImage} alt="Preview" className="w-full h-full object-cover" /><button type="button" onClick={() => setSelectedImage(null)} className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white rounded-full p-1.5 hover:bg-red-500"><X size={16}/></button></div>)}
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => handleImageSelect(e, setSelectedImage)} />
            </div>

            <div className="space-y-8 px-4 border-l-2 border-emerald-100/50 ml-4 pb-10">
                {crops.find(c => c.id === activeCropId)?.logs?.map((log) => (
                    <div key={log.id} className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-emerald-500 rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-xs font-bold text-emerald-800/60 block mb-3 tracking-widest uppercase">{log.date}</span>
                        <div className="bg-white/80 p-5 rounded-[2rem] shadow-sm border border-white/60 relative group hover:shadow-md transition-shadow">
                            <p className="text-base text-gray-800 leading-relaxed font-medium">{log.text}</p>
                            {log.image && <img src={log.image} className="mt-4 rounded-2xl w-full h-48 object-cover shadow-sm border border-gray-100" />}
                            <button onClick={() => deleteGrowthLog(activeCropId, log.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all"><Trash2 size={16}/></button>
                        </div>
                    </div>
                ))}
                {(!crops.find(c => c.id === activeCropId)?.logs?.length) && <div className="text-gray-400 text-sm italic pl-4">No notes yet. Start journaling!</div>}
            </div>
        </div>
      )}
    </div>
  );

  const renderHarvest = () => (
    <div className="pb-32 pt-6">
      <div className="flex justify-between items-center mb-8 px-2"><div><h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('harvest')}</h1></div><button onClick={() => setShowCalendar(!showCalendar)} className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${showCalendar ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>{t('calendar_view')}</button></div>
      {showCalendar ? (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-8"><h3 className="font-bold text-gray-900 mb-6 text-xl text-center">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3><div className="grid grid-cols-7 gap-3 text-center text-xs font-bold text-gray-300 mb-4 uppercase tracking-widest">{['S','M','T','W','T','F','S'].map((d,i)=><div key={i}>{d}</div>)}</div><div className="grid grid-cols-7 gap-3 text-sm font-bold text-gray-700">{[...Array(30)].map((_, i) => { const day = i + 1; const hasHarvest = crops.some(c => new Date(c.harvestDate).getDate() === day); return <div key={i} className={`aspect-square flex items-center justify-center rounded-2xl transition-all ${hasHarvest ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-110' : 'hover:bg-gray-50'}`}>{day}</div> })}</div></div>
      ) : (
        <div className="grid gap-4 mb-8">
            {crops.map(crop => {
                 const daysLeft = getDaysLeft(crop.harvestIso || crop.harvestDate);
                 return (
                    <div key={crop.id} className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm border border-white/50 flex items-center justify-between hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-5">
                            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl ${daysLeft < 30 ? 'bg-orange-50 text-orange-500' : 'bg-gray-50'}`}>{CROP_TYPES[crop.name]?.icon || '🌱'}</div>
                            <div><h3 className="font-bold text-gray-900 text-lg">{t(crop.name) || crop.name}</h3><div className="text-xs text-gray-400 font-bold mt-1.5 uppercase tracking-wide flex items-center gap-1"><Clock size={12}/> {new Date(crop.harvestDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</div></div>
                        </div>
                        <div className="text-right">
                             <div className={`text-3xl font-black ${daysLeft < 30 ? 'text-orange-500' : 'text-gray-900'}`}>{daysLeft}</div>
                             <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('days_left')}</div>
                        </div>
                    </div>
                 )
            })}
            {crops.length === 0 && <div className="text-center py-16 text-gray-400 font-medium">No upcoming harvests</div>}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-900 text-white p-6 rounded-[2.5rem] flex flex-col items-center text-center justify-center relative overflow-hidden shadow-xl shadow-emerald-900/20"><div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div><div className="text-4xl font-black mb-1">{crops.reduce((acc, c) => acc + (c.yield || 0), 0)}</div><div className="text-xs font-bold text-emerald-300 uppercase tracking-widest">{t('total_yield')} (kg)</div></div>
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center justify-center shadow-sm"><div className="text-4xl font-black text-gray-900 mb-1">{crops.length}</div><div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('upcoming')}</div></div>
      </div>
    </div>
  );

  const renderSettings = () => {
    return (
      <div className="pb-32 pt-6">
        <div className="mb-8 px-2"><h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('settings')}</h1></div>
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between mb-6 cursor-pointer hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border-4 border-white shadow-sm group-hover:scale-105 transition-transform"><User size={32} /></div>
                <div>
                    <h3 className="font-bold text-xl text-gray-900">{userName}</h3>
                    <p className="text-sm text-gray-500 font-medium flex items-center gap-1"><Mail size={12}/> {userEmail}</p>
                </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-full group-hover:bg-gray-100 transition-colors"><ChevronRight size={20} className="text-gray-400" /></div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10">
            <h4 className="text-xs font-bold text-gray-400 mb-5 flex items-center gap-2 uppercase tracking-widest ml-1"><Globe size={14}/> {t('language')}</h4>
            <div className="flex gap-3">
                {['en', 'ms', 'zh'].map(l => (
                    <button key={l} onClick={() => setLang(l)} className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-all shadow-sm ${lang === l ? 'bg-black text-white shadow-xl scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'}`}>
                        {l === 'en' ? 'English' : l === 'ms' ? 'Melayu' : '中文'}
                    </button>
                ))}
            </div>
        </div>
        <button onClick={handleLogout} className="w-full bg-white border-2 border-red-50 text-red-500 py-5 rounded-[2.5rem] font-bold flex items-center justify-center gap-3 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"><LogOut size={20} /> {t('logout')}</button>
        <div className="text-center mt-12 text-xs font-medium text-gray-300">Farm Manager v3.8 Premium</div>
      </div>
    );
  };

  return (
    <div 
      className="font-sans min-h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden text-gray-800 bg-[#FAFAFA] bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3200&auto=format&fit=crop')" }}
    >
      {/* OVERLAY for Readability */}
      <div className="absolute inset-0 bg-gray-50/40 backdrop-blur-[2px] z-0"></div>

      <div className="p-6 h-screen overflow-y-auto custom-scrollbar relative z-10">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'crops' && renderCrops()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'growth' && renderGrowth()}
        {activeTab === 'harvest' && renderHarvest()}
        {activeTab === 'settings' && renderSettings()}
      </div>
      
      {/* FLOATING LONG NAVIGATION 🛸 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center px-6 py-4">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'home' ? 'text-emerald-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Home size={24} strokeWidth={activeTab === 'home' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('welcome').split(' ')[0]}</span></button>
          <button onClick={() => setActiveTab('crops')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'crops' ? 'text-emerald-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Sprout size={24} strokeWidth={activeTab === 'crops' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('crops')}</span></button>
          <button onClick={() => setActiveTab('tasks')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'tasks' ? 'text-emerald-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Bell size={24} strokeWidth={activeTab === 'tasks' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('tasks')}</span></button>
          <button onClick={() => setActiveTab('growth')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'growth' ? 'text-emerald-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><TrendingUp size={24} strokeWidth={activeTab === 'growth' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('growth')}</span></button>
          <button onClick={() => setActiveTab('harvest')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'harvest' ? 'text-emerald-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Calendar size={24} strokeWidth={activeTab === 'harvest' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('harvest')}</span></button>
          <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'settings' ? 'text-emerald-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Settings size={24} strokeWidth={activeTab === 'settings' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('settings')}</span></button>
        </div>
      </div>
    </div>
  );
}