import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Sprout, Bell, TrendingUp, Calendar, Settings, Plus, Droplets, 
  Scissors, Trash2, Check, Wind, CloudSun, CloudRain, ChevronRight, 
  User, Shield, LogOut, Leaf, Camera, Sun, Cloud, Moon, X, Clock, 
  Image as ImageIcon, Globe, Edit2, Lock, Mail, LayoutGrid, MapPin, Tractor,
  ArrowRight
} from 'lucide-react';

// --- TRANSLATIONS 🌍 ---
const TRANSLATIONS = {
  en: {
    welcome: "Welcome Back",
    tasks: "Tasks",
    crops: "Crops",
    growth: "Growth Record", // Changed as requested
    harvest: "Harvest",
    settings: "Settings",
    active_crops: "Active Crops",
    tasks_today: "Tasks Today",
    today_tasks: "Today's Tasks",
    reminders: "Reminders",
    active: "Active",
    completed: "Completed",
    add_note: "Add Note",
    upload_photo: "Upload Photo",
    save: "Save",
    profile: "Profile",
    language: "Language",
    logout: "Log Out",
    harvest_prediction: "Harvest Forecast",
    days_left: "Days Left",
    total_yield: "Total Yield",
    upcoming: "Upcoming",
    healthy: "Healthy",
    delete_confirm: "Delete this item permanently?",
    water_advice: "Watering Advice",
    water_ok: "Soil moisture is good. Water normally.",
    water_skip: "Rain expected! Skip watering today.",
    water_more: "It's hot! Water extra today.",
    custom_crop: "Other / Custom",
    enter_crop_name: "Enter Crop Name",
    enter_days: "Days to Harvest",
    calendar_view: "Calendar View",
    select_crop_type: "Select Crop Type",
    planting_date: "Planting Date",
    current_stage: "Current Stage",
    add_new_crop: "Add New Crop",
    plant_crop_btn: "Plant Crop",
    write_note: "Write a note...",
    add_growth_note: "Add Growth Record",
    quick_add: "Quick Add:",
    edit_task: "Edit Task",
    update: "Update",
    username_placeholder: "Username",
    login_title: "My Farm",
    login_subtitle: "Manage your crops efficiently",
    email_label: "Email Address",
    password_label: "Password",
    name_label: "Your Name",
    login_btn: "Login",
    signup_btn: "Sign Up",
    demo_hint: "Demo: Enter any details to start",
    due: "Due",
    kg: "kg",
    harv: "Harv",
    add_task_btn: "Add Task",
    task_name_placeholder: "Task name...",
    select_section: "Select Section",
    other_section: "Other...",
    enter_section: "Enter Section Name",
    crop_notes: "Notes / Description (Optional)",
    email: "Email",
    toggle_signup: "Don't have an account? Sign Up",
    toggle_login: "Already have an account? Login",
    // WEATHER
    condition_cloudy: "Cloudy",
    condition_sunny: "Sunny",
    condition_rain: "Rainy",
    // QUICK ACTIONS
    qa_water: "Water Plants",
    qa_fert: "Fertilize",
    qa_prune: "Pruning",
    qa_harv: "Harvest",
    // CROP NAMES
    Durian: "Durian",
    Mango: "Mango",
    Watermelon: "Watermelon",
    Papaya: "Papaya",
    Banana: "Banana",
    Apple: "Apple",
    Orange: "Orange",
    Pineapple: "Pineapple",
    Strawberry: "Strawberry",
    // STAGES
    Seedling: "Seedling",
    Vegetative: "Vegetative",
    Flowering: "Flowering",
    Fruiting: "Fruiting"
  },
  ms: {
    welcome: "Selamat Kembali",
    tasks: "Tugasan",
    crops: "Tanaman",
    growth: "Rekod Tumbesaran", // Changed
    harvest: "Tuai",
    settings: "Tetapan",
    active_crops: "Tanaman Aktif",
    tasks_today: "Tugasan Hari Ini",
    today_tasks: "Tugasan Utama",
    reminders: "Peringatan",
    active: "Aktif",
    completed: "Selesai",
    add_note: "Tambah Nota",
    upload_photo: "Muat Naik Foto",
    save: "Simpan",
    profile: "Profil",
    language: "Bahasa",
    logout: "Log Keluar",
    harvest_prediction: "Ramalan Tuai",
    days_left: "Hari Lagi",
    total_yield: "Jumlah Hasil",
    upcoming: "Akan Datang",
    healthy: "Sihat",
    delete_confirm: "Adakah anda pasti mahu memadam?",
    water_advice: "Nasihat Penyiraman",
    water_ok: "Kelembapan tanah baik. Siram seperti biasa.",
    water_skip: "Hujan dijangka! Jangan siram hari ini.",
    water_more: "Cuaca panas! Siram lebih hari ini.",
    custom_crop: "Lain-lain / Tersuai",
    enter_crop_name: "Masukkan Nama Tanaman",
    enter_days: "Hari hingga Tuai",
    calendar_view: "Paparan Kalendar",
    select_crop_type: "Pilih Jenis Tanaman",
    planting_date: "Tarikh Tanaman",
    current_stage: "Peringkat Semasa",
    add_new_crop: "Tambah Tanaman Baru",
    plant_crop_btn: "Tanam",
    write_note: "Tulis nota...",
    add_growth_note: "Tambah Rekod Tumbesaran",
    quick_add: "Tambah Cepat:",
    edit_task: "Edit Tugasan",
    update: "Kemaskini",
    username_placeholder: "Nama Pengguna",
    login_title: "Ladang Saya",
    login_subtitle: "Urus tanaman anda dengan cekap",
    email_label: "Alamat Emel",
    password_label: "Kata Laluan",
    name_label: "Nama Anda",
    login_btn: "Log Masuk",
    signup_btn: "Daftar",
    demo_hint: "Demo: Masukkan sebarang butiran untuk mula",
    due: "Tarikh",
    kg: "kg",
    harv: "Tuai",
    add_task_btn: "Tambah",
    task_name_placeholder: "Nama tugasan...",
    select_section: "Pilih Bahagian",
    other_section: "Lain-lain...",
    enter_section: "Masukkan Nama Bahagian",
    crop_notes: "Nota / Penerangan (Pilihan)",
    email: "Emel",
    toggle_signup: "Tiada akaun? Daftar",
    toggle_login: "Sudah ada akaun? Log Masuk",
    // WEATHER
    condition_cloudy: "Mendung",
    condition_sunny: "Panas & Cerah",
    condition_rain: "Hujan",
    // QUICK ACTIONS
    qa_water: "Siram Pokok",
    qa_fert: "Baja",
    qa_prune: "Cantas",
    qa_harv: "Tuai",
    // CROP NAMES
    Durian: "Durian",
    Mango: "Mangga",
    Watermelon: "Tembikai",
    Papaya: "Betik",
    Banana: "Pisang",
    Apple: "Epal",
    Orange: "Oren",
    Pineapple: "Nanas",
    Strawberry: "Strawberi",
    // STAGES
    Seedling: "Anak Benih",
    Vegetative: "Vegetatif",
    Flowering: "Berbunga",
    Fruiting: "Berbuah"
  },
  zh: {
    welcome: "欢迎回来",
    tasks: "任务",
    crops: "作物",
    growth: "生长记录", // Changed
    harvest: "收获",
    settings: "设置",
    active_crops: "活跃作物",
    tasks_today: "今日任务",
    today_tasks: "今日重点",
    reminders: "提醒",
    active: "进行中",
    completed: "已完成",
    add_note: "添加笔记",
    upload_photo: "上传照片",
    save: "保存",
    profile: "个人资料",
    language: "语言",
    logout: "登出",
    harvest_prediction: "收获预测",
    days_left: "剩余天数",
    total_yield: "总产量",
    upcoming: "即将到来",
    healthy: "健康",
    delete_confirm: "确定要删除吗？",
    water_advice: "浇水建议",
    water_ok: "土壤湿度良好，正常浇水。",
    water_skip: "预计有雨！今天无需浇水。",
    water_more: "天气炎热！今天多浇水。",
    custom_crop: "其他 / 自定义",
    enter_crop_name: "输入作物名称",
    enter_days: "收获天数",
    calendar_view: "日历视图",
    select_crop_type: "选择作物类型",
    planting_date: "种植日期",
    current_stage: "当前阶段",
    add_new_crop: "添加新作物",
    plant_crop_btn: "种植",
    write_note: "写笔记...",
    add_growth_note: "添加生长记录",
    quick_add: "快速添加:",
    edit_task: "编辑任务",
    update: "更新",
    username_placeholder: "用户名",
    login_title: "农场管家",
    login_subtitle: "登录您的账户",
    email_label: "电子邮件",
    password_label: "密码",
    name_label: "您的名字",
    login_btn: "登录",
    signup_btn: "注册",
    demo_hint: "演示：输入任意名字、邮箱和密码",
    due: "截止",
    kg: "公斤",
    harv: "收获",
    add_task_btn: "添加",
    task_name_placeholder: "任务名称...",
    select_section: "选择区域",
    other_section: "其他...",
    enter_section: "输入区域名称",
    crop_notes: "备注 / 描述（可选）",
    email: "电子邮件",
    toggle_signup: "没有账户？注册",
    toggle_login: "已有账户？登录",
    // WEATHER
    condition_cloudy: "多云",
    condition_sunny: "晴朗炎热",
    condition_rain: "有雨",
    // QUICK ACTIONS
    qa_water: "浇水",
    qa_fert: "施肥",
    qa_prune: "修剪",
    qa_harv: "收获",
    // CROP NAMES
    Durian: "榴莲",
    Mango: "芒果",
    Watermelon: "西瓜",
    Papaya: "木瓜",
    Banana: "香蕉",
    Apple: "苹果",
    Orange: "橙子",
    Pineapple: "菠萝",
    Strawberry: "草莓",
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
  today.setHours(0, 0, 0, 0);
  harvest.setHours(0, 0, 0, 0);
  const diffTime = harvest.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
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
    <div className={`bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/50 flex items-center justify-between mb-3 transition-all ${task.completed ? 'opacity-60 grayscale' : 'hover:scale-[1.02] hover:shadow-md'}`}>
      <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => onEdit && onEdit(task)}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${task.completed ? 'bg-gray-200' : 'bg-green-50 border border-green-100 shadow-sm'}`}>
            {getIcon(task.type)}
        </div>
        <div>
            <h3 className={`font-semibold text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5 font-medium">📍 {task.location}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {!task.completed && <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase tracking-wide">{task.time}</span>}
        <div className="flex gap-2">
           <button onClick={() => onToggle(task.id)} className={`p-2 rounded-xl transition-colors ${task.completed ? 'bg-green-100 text-green-600' : 'bg-white text-gray-400 hover:bg-green-100 hover:text-green-600 shadow-sm'}`}><Check size={18} /></button>
           <button onClick={() => onDelete(task.id)} className="p-2 rounded-xl bg-white text-gray-400 hover:bg-red-50 hover:text-red-500 shadow-sm transition-colors"><Trash2 size={18} /></button>
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
  
  // --- AUTH STATE & SPLASH SCREEN ---
  const [showSplash, setShowSplash] = useState(true); // SPLASH STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle Login/Signup
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

  // --- SPLASH ANIMATION & CHECK LOGIN ---
  useEffect(() => {
    // Show splash for 3.5 seconds
    const timer = setTimeout(() => {
        setShowSplash(false);
    }, 3500);

    const savedLogin = localStorage.getItem('farm_loggedin');
    if (savedLogin === 'true') {
        setIsLoggedIn(true);
        setUserName(localStorage.getItem('farm_username') || 'Farmer'); 
        setUserEmail(localStorage.getItem('farm_email') || '');
    }
    return () => clearTimeout(timer);
  }, []);
  
  // --- LIVE WEATHER API FETCH ---
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=2.9264&longitude=101.6964&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto')
      .then(response => response.json())
      .then(data => {
        setWeather(data);
      })
      .catch(err => console.error("Weather fetch error:", err));
  }, []);

  const getWeatherInfo = (code) => {
      if (code === 0) return { icon: <Sun size={18}/>, key: 'condition_sunny' };
      if (code >= 1 && code <= 3) return { icon: <CloudSun size={18}/>, key: 'condition_cloudy' };
      if (code >= 51 && code <= 67) return { icon: <CloudRain size={18}/>, key: 'condition_rain' }; 
      if (code >= 95) return { icon: <Wind size={18}/>, key: 'condition_rain' }; 
      return { icon: <Cloud size={18}/>, key: 'condition_cloudy' }; 
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
    setNewTaskName(''); 
    setIsCustomSection(false);
    setCustomSectionName('');
    setShowAddTask(false);
  };

  const openEditTask = (task) => { 
      setEditingTask(task); 
      setNewTaskName(task.title); 
      setNewTaskSection(task.location);
      setShowAddTask(true); 
  };
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
    setCrops([...crops, { 
        id: Date.now(), 
        name: name, 
        plantedDate: cropForm.date, 
        harvestDate: harvestDate.toDateString(), 
        harvestIso: harvestDate.toISOString(), 
        stage: cropForm.stage, 
        daysToMaturity: days, 
        yield: 100, 
        logs: [],
        description: cropForm.notes 
    }]);
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
          const MAX_WIDTH = 300; 
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setImgState(canvas.toDataURL('image/jpeg', 0.5));
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
    today.setHours(0, 0, 0, 0);
    harvest.setHours(0, 0, 0, 0);
    const diffTime = harvest.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // --- SPLASH SCREEN ---
  if (showSplash) {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
          {/* BACKGROUND ANIMATION */}
          <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3200&auto=format&fit=crop')" }}></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-green-950 via-green-900/40 to-sky-300/30 animate-pulse"></div>
          
          <div className="relative z-10 text-center animate-in fade-in zoom-in duration-1000 flex flex-col items-center">
             <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8 shadow-2xl border border-white/40 ring-4 ring-green-400/30">
                 <Sprout size={56} className="text-white drop-shadow-md fill-green-100" />
             </div>
             <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-lg mb-3">Farm Manager</h1>
             <p className="text-green-50 font-medium text-lg tracking-wide opacity-90">Cultivating Excellence.</p>
          </div>
       </div>
     )
  }

  // --- RENDER LOGIN SCREEN ---
  if (!isLoggedIn) {
      return (
          <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3200&auto=format&fit=crop')" }}>
              <div className="absolute inset-0 bg-green-900/40 backdrop-blur-[2px] z-0"></div>
              <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl w-full max-w-sm relative z-10 animate-in fade-in zoom-in-95 duration-500 border border-white/50">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20 transform -rotate-6">
                      <Tractor size={40} className="text-green-600" />
                  </div>
                  <h1 className="text-3xl font-black text-center text-green-900 mb-1 tracking-tight">{t('login_title')}</h1>
                  <p className="text-center text-gray-500 mb-8 text-sm font-medium">{t('login_subtitle')}</p>

                  <form onSubmit={handleLogin} className="space-y-4">
                      {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">{t('name_label')}</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input type="text" required className="w-full bg-gray-50 border-0 rounded-2xl py-4 pl-12 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium" placeholder="Farmer John" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                        </div>
                      )}
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">{t('email_label')}</label>
                          <div className="relative">
                              <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input type="email" required className="w-full bg-gray-50 border-0 rounded-2xl py-4 pl-12 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium" placeholder="farmer@mail.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">{t('password_label')}</label>
                          <div className="relative">
                              <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input type="password" required className="w-full bg-gray-50 border-0 rounded-2xl py-4 pl-12 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>
                      </div>
                      <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all mt-4 hover:bg-green-700">
                          {isSignUp ? t('signup_btn') : t('login_btn')}
                      </button>
                  </form>
                  
                  <div className="mt-6 text-center">
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm font-bold text-green-700 hover:underline">
                        {isSignUp ? t('toggle_login') : t('toggle_signup')}
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-400 mt-4">{t('demo_hint')}</p>
                  
                  <div className="flex justify-center gap-4 mt-6 border-t border-gray-200 pt-4">
                       {['en', 'ms', 'zh'].map(l => (
                           <button key={l} onClick={() => setLang(l)} className={`text-xs font-bold uppercase transition-colors ${lang === l ? 'text-green-600 underline decoration-2 underline-offset-4' : 'text-gray-400 hover:text-gray-600'}`}>{l}</button>
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
    let waterColor = "from-cyan-500 to-blue-600";
    
    // Live Weather Logic
    const temp = weather?.current_weather?.temperature || 29;
    const wCode = weather?.current_weather?.weathercode || 0;
    const wInfo = getWeatherInfo(wCode);
    
    if (temp > 32) { waterAdvice = t('water_more'); waterColor = "from-orange-400 to-red-500"; }
    if ((wCode >= 51 && wCode <= 67) || (wCode >= 80 && wCode <= 99)) { waterAdvice = t('water_skip'); waterColor = "from-slate-500 to-gray-600"; }

    return (
      <div className="space-y-6 pb-32">
        <div className="flex justify-between items-center px-1 pt-4">
            <div>
                <p className="text-green-900 text-xs font-bold uppercase tracking-wider mb-0.5 opacity-80">{dateString}</p>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t('welcome')} <br/><span className="text-green-700">{userName}</span>.</h1>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveTab('settings')}>
                <User size={24} className="text-green-800"/>
            </div>
        </div>
        
        {/* Modern Weather Card */}
        <div className={`bg-gradient-to-br ${waterColor} rounded-[2.5rem] p-6 text-white shadow-xl shadow-cyan-900/20 relative overflow-hidden transition-colors duration-500`}>
            <div className="absolute top-0 right-0 p-6 opacity-20"><Sun size={80} /></div>
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <div className="text-6xl font-light tracking-tighter mb-1">{temp}°</div>
                    <div className="text-sm font-bold opacity-90 flex items-center gap-2 uppercase tracking-wide">{wInfo.icon} {t(wInfo.key)}</div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold opacity-80">Putrajaya</div>
                    <div className="text-xs opacity-60 mt-1 font-medium">H:{weather?.daily?.temperature_2m_max[0]}° L:{weather?.daily?.temperature_2m_min[0]}°</div>
                </div>
            </div>
            <div className={`mt-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3`}>
                <div className="bg-white/20 p-2 rounded-full"><Droplets size={18} className="text-white" /></div>
                <p className="text-xs font-bold leading-relaxed opacity-95">{waterAdvice}</p>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => setActiveTab('crops')} className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-white/50 active:scale-95 transition-transform cursor-pointer group hover:bg-white">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-3 group-hover:scale-110 transition-transform"><Sprout size={24}/></div>
            <div className="text-3xl font-black text-gray-800">{crops.length}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('active_crops')}</div>
          </div>
          <div onClick={() => setActiveTab('tasks')} className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-white/50 active:scale-95 transition-transform cursor-pointer group hover:bg-white">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-3 group-hover:scale-110 transition-transform"><Check size={24}/></div>
            <div className="text-3xl font-black text-gray-800">{activeTasks.length}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('tasks_today')}</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-xl font-bold text-gray-900">{t('today_tasks')}</h2>
            <button onClick={() => setActiveTab('tasks')} className="text-xs font-bold text-green-700 bg-green-100 px-4 py-2 rounded-full hover:bg-green-200 transition-colors">View All</button>
          </div>
          {activeTasks.slice(0, 2).map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditTask} />)}
          {activeTasks.length === 0 && <div className="p-8 bg-white/40 border-2 border-dashed border-gray-300 rounded-[2rem] text-center text-gray-500 text-sm font-medium">✨ All caught up!</div>}
        </div>
      </div>
    );
  };

  const renderTasks = () => {
    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);
    return (
      <div className="pb-32 pt-6">
        <h1 className="text-4xl font-black text-gray-900 px-2 mb-8 tracking-tight">{t('reminders')}</h1>
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white/60 mb-8 sticky top-4 z-20">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{editingTask ? t('edit_task') : t('quick_add')}</h3>
               <button onClick={() => { setShowAddTask(!showAddTask); setEditingTask(null); setNewTaskName(''); }} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${showAddTask ? 'bg-gray-200 text-gray-600' : 'bg-green-600 text-white shadow-green-500/30'}`}>{showAddTask ? <X size={20}/> : <Plus size={20}/>}</button>
            </div>
            {showAddTask && (
                <form onSubmit={handleTaskSubmit} className="animate-in slide-in-from-top-4 fade-in">
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-1 hide-scrollbar">
                        {['qa_water', 'qa_fert', 'qa_prune', 'qa_harv'].map(k => (
                            <button type="button" onClick={() => addQuickTask(t(k))} key={k} className="bg-green-50 text-green-700 text-xs font-bold px-4 py-2.5 rounded-2xl whitespace-nowrap hover:bg-green-100 transition-colors border border-green-100">{t(k)}</button>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                        <input type="text" placeholder={t('task_name_placeholder')} className="flex-1 bg-gray-50 border-0 rounded-2xl px-5 py-4 text-base font-medium focus:ring-2 focus:ring-green-500" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} autoFocus />
                        <div className="flex gap-2">
                             <select className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500 w-1/2" value={isCustomSection ? 'custom' : newTaskSection} onChange={(e) => { if(e.target.value === 'custom') { setIsCustomSection(true); } else { setIsCustomSection(false); setNewTaskSection(e.target.value); } }}>
                                 <option value="Section A">Section A</option>
                                 <option value="Section B">Section B</option>
                                 <option value="Section C">Section C</option>
                                 <option value="custom">{t('other_section')}</option>
                             </select>
                             {isCustomSection && <input type="text" placeholder={t('enter_section')} className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500 w-1/2" value={customSectionName} onChange={(e) => setCustomSectionName(e.target.value)} />}
                             <button type="submit" className="bg-green-600 text-white px-6 rounded-2xl font-bold text-sm shadow-lg hover:bg-green-700 transition-colors w-1/2 shadow-green-500/30">{editingTask ? t('update') : t('add_task_btn')}</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
        <div className="space-y-2">
            {activeTasks.length > 0 ? activeTasks.map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditTask} />) : <div className="text-center py-16 text-gray-400 font-medium opacity-60">No active tasks</div>}
        </div>
        {completedTasks.length > 0 && (
            <div className="mt-12 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">{t('completed')}</h3>
                <div className="space-y-2">
                  {completedTasks.map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />)}
                </div>
            </div>
        )}
      </div>
    );
  };

  const renderCrops = () => (
    <div className="pb-32 pt-6">
      <div className="flex justify-between items-center mb-8 px-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('crops')}</h1>
        <button onClick={() => setShowAddCrop(true)} className="bg-green-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl shadow-green-500/30 flex items-center gap-2 hover:scale-105 transition-transform"><Plus size={18}/> {t('add_new_crop')}</button>
      </div>
      
      {showAddCrop && (
        <div className="fixed inset-0 bg-green-900/60 flex items-end sm:items-center justify-center z-50 p-4 backdrop-blur-md">
          <form onSubmit={addCrop} className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-20 sm:zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center"><h3 className="font-bold text-2xl text-gray-900">{t('add_new_crop')}</h3><button type="button" onClick={() => setShowAddCrop(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"><X size={20}/></button></div>
            <div className="p-8 space-y-6 overflow-y-auto">
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('select_crop_type')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-lg font-medium focus:ring-2 focus:ring-green-500 outline-none" value={isCustomCrop ? 'custom' : cropForm.type} onChange={(e) => { if (e.target.value === 'custom') { setIsCustomCrop(true); } else { setIsCustomCrop(false); setCropForm({...cropForm, type: e.target.value}); } }}>{Object.keys(CROP_TYPES).map(type => <option key={type} value={type}>{CROP_TYPES[type].icon} {t(type)}</option>)}<option value="custom">➕ {t('custom_crop')}</option></select></div>
              {isCustomCrop && (<div className="space-y-4 animate-in slide-in-from-top-4"><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_crop_name')}</label><input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.customName} onChange={(e) => setCropForm({...cropForm, customName: e.target.value})} placeholder="e.g. Dragonfruit" /></div><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_days')}</label><input type="number" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.customDays} onChange={(e) => setCropForm({...cropForm, customDays: e.target.value})} /></div></div>)}
              <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('planting_date')}</label><input type="date" required className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium" value={cropForm.date} onChange={(e) => setCropForm({...cropForm, date: e.target.value})} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('current_stage')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium" value={cropForm.stage} onChange={(e) => setCropForm({...cropForm, stage: e.target.value})}><option value="Seedling">{t('Seedling')}</option><option value="Vegetative">{t('Vegetative')}</option><option value="Flowering">{t('Flowering')}</option><option value="Fruiting">{t('Fruiting')}</option></select></div>
              </div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('crop_notes')}</label><textarea className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium h-24 resize-none" value={cropForm.notes} onChange={(e) => setCropForm({...cropForm, notes: e.target.value})} placeholder="..." /></div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto"><button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all">{t('plant_crop_btn')}</button></div>
          </form>
        </div>
      )}

      {crops.length === 0 ? (<div className="flex flex-col items-center justify-center h-[50vh] text-center opacity-40"><Sprout size={80} className="text-gray-300 mb-6" /><p className="text-gray-800 font-bold text-2xl">Start your farm</p><p className="text-base text-gray-500">Add your first crop to track growth</p></div>) : (
        <div className="grid gap-4">{crops.map(crop => {
            const daysLeft = getDaysLeft(crop.harvestIso || crop.harvestDate);
            const progress = 100 - (daysLeft / crop.daysToMaturity * 100);
            const clampedProgress = Math.max(0, Math.min(100, progress));
            
            return (
            <div key={crop.id} className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm border border-white/50 relative overflow-hidden group hover:shadow-lg transition-all">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100"><div className="h-full bg-green-500 rounded-r-full transition-all duration-1000" style={{width: `${clampedProgress}%`}}></div></div>
                <div className="flex justify-between items-start mb-6 pt-3">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-gray-100">{CROP_TYPES[crop.name]?.icon || '🌱'}</div>
                        <div><h3 className="font-bold text-gray-900 text-xl">{t(crop.name) || crop.name}</h3><p className="text-sm text-gray-500 font-medium mt-1">{t(crop.stage)}</p></div>
                    </div>
                    <button onClick={() => deleteCrop(crop.id)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={20}/></button>
                </div>
                {crop.description && <div className="text-xs text-gray-500 mb-4 bg-green-50/50 p-3 rounded-xl border border-green-50">{crop.description}</div>}
                <div className="flex justify-between items-end">
                    <div className="bg-gray-100/50 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-2 border border-gray-200/50"><Calendar size={14}/> {new Date(crop.harvestDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</div>
                    <div className="text-right"><div className="text-3xl font-black text-green-600">{daysLeft}</div><div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('days_left')}</div></div>
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
                <button key={c.id} onClick={() => setActiveCropId(c.id)} className={`snap-center shrink-0 px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all border ${activeCropId === c.id ? 'bg-green-700 text-white border-green-700 shadow-lg shadow-green-500/30' : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300'}`}>
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
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm border border-white/50 mb-10">
                <div className="flex gap-3">
                    <button onClick={() => fileInputRef.current.click()} className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors border border-gray-100"><ImageIcon size={22}/></button>
                    <input type="text" placeholder={t('write_note')} className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 outline-none focus:ring-2 focus:ring-green-500 text-base transition-all" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
                    <button onClick={addGrowthLog} className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-200 hover:scale-105 transition-transform"><Plus size={26}/></button>
                </div>
                {selectedImage && (<div className="mt-3 relative rounded-xl overflow-hidden h-32 w-full border border-gray-200"><img src={selectedImage} alt="Preview" className="w-full h-full object-cover" /><button type="button" onClick={() => setSelectedImage(null)} className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white rounded-full p-1.5 hover:bg-red-500"><X size={16}/></button></div>)}
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => handleImageSelect(e, setSelectedImage)} />
            </div>

            <div className="space-y-8 px-4 border-l-2 border-green-100 ml-4">
                {crops.find(c => c.id === activeCropId)?.logs?.map((log) => (
                    <div key={log.id} className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-green-500 rounded-full ring-4 ring-white shadow-sm"></div>
                        <span className="text-xs font-bold text-gray-400 block mb-3 tracking-widest uppercase">{log.date}</span>
                        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
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
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-8"><h3 className="font-bold text-gray-900 mb-6 text-xl text-center">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3><div className="grid grid-cols-7 gap-3 text-center text-xs font-bold text-gray-300 mb-4 uppercase tracking-widest">{['S','M','T','W','T','F','S'].map((d,i)=><div key={i}>{d}</div>)}</div><div className="grid grid-cols-7 gap-3 text-sm font-bold text-gray-700">{[...Array(30)].map((_, i) => { const day = i + 1; const hasHarvest = crops.some(c => new Date(c.harvestDate).getDate() === day); return <div key={i} className={`aspect-square flex items-center justify-center rounded-2xl transition-all ${hasHarvest ? 'bg-green-500 text-white shadow-lg shadow-green-200 scale-110' : 'hover:bg-gray-50'}`}>{day}</div> })}</div></div>
      ) : (
        <div className="grid gap-4 mb-8">
            {crops.map(crop => {
                 const daysLeft = getDaysLeft(crop.harvestIso || crop.harvestDate);
                 return (
                    <div key={crop.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
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
          <div className="bg-green-900 text-white p-6 rounded-[2.5rem] flex flex-col items-center text-center justify-center relative overflow-hidden shadow-xl shadow-green-900/20"><div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div><div className="text-4xl font-black mb-1">{crops.reduce((acc, c) => acc + (c.yield || 0), 0)}</div><div className="text-xs font-bold text-green-300 uppercase tracking-widest">{t('total_yield')} (kg)</div></div>
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
      className="font-sans min-h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden text-gray-800 bg-[#FAFAFA]"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3200&auto=format&fit=crop')" }}
    >
      {/* OVERLAY for Readability */}
      <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-[2px] z-0"></div>

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
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'home' ? 'text-green-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Home size={24} strokeWidth={activeTab === 'home' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('welcome').split(' ')[0]}</span></button>
          <button onClick={() => setActiveTab('crops')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'crops' ? 'text-green-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Sprout size={24} strokeWidth={activeTab === 'crops' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('crops')}</span></button>
          <button onClick={() => setActiveTab('tasks')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'tasks' ? 'text-green-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Bell size={24} strokeWidth={activeTab === 'tasks' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('tasks')}</span></button>
          <button onClick={() => setActiveTab('growth')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'growth' ? 'text-green-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><TrendingUp size={24} strokeWidth={activeTab === 'growth' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('growth')}</span></button>
          <button onClick={() => setActiveTab('harvest')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'harvest' ? 'text-green-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Calendar size={24} strokeWidth={activeTab === 'harvest' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('harvest')}</span></button>
          <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'settings' ? 'text-green-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Settings size={24} strokeWidth={activeTab === 'settings' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('settings')}</span></button>
        </div>
      </div>
    </div>
  );
}