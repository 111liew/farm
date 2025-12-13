import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Sprout, Bell, TrendingUp, Calendar, Settings, Plus, Droplets, 
  Scissors, Trash2, Check, Wind, CloudSun, CloudRain, ChevronRight, 
  ChevronLeft, User, LogOut, Leaf, Sun, Cloud, X, Clock, 
  Image as ImageIcon, Globe, Edit2, Lock, Mail, Tractor, MapPin, DollarSign, RefreshCw, Camera, CalendarDays, Phone, Briefcase, TrendingDown, Info, BarChart3, ArrowUpRight
} from 'lucide-react';

// --- STYLES ---
const styles = `
  @keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(40px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes growWidth {
    0% { width: 0%; }
    100% { width: var(--target-width); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .animate-slide-up { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-grow-width { animation: growWidth 1s ease-out forwards; }
  
  .delay-100 { animation-delay: 100ms; opacity: 0; animation-fill-mode: forwards; }
  .delay-200 { animation-delay: 200ms; opacity: 0; animation-fill-mode: forwards; }
  .delay-300 { animation-delay: 300ms; opacity: 0; animation-fill-mode: forwards; }

  /* Premium Glass Effect (iOS Style) */
  .ios-card {
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02);
  }

  /* Shimmer Effect for Revenue Card */
  .shimmer-bg {
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
  
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

// --- TRANSLATIONS 🌍 ---
const TRANSLATIONS = {
  en: {
    welcome: "Good Morning,", 
    tasks: "Tasks",
    crops: "My Farm",
    growth: "Journal", 
    harvest: "Harvest",
    settings: "Settings",
    active_crops: "Active Plantings",
    tasks_today: "Today's Agenda",
    today_tasks: "Priority Tasks",
    reminders: "Reminders",
    active: "Active",
    completed: "Done",
    add_note: "Add Entry",
    upload_photo: "Upload Photo",
    save: "Save Changes",
    profile: "Profile",
    language: "Language",
    logout: "Log Out",
    harvest_prediction: "Harvest Forecast",
    days_left: "Days Left",
    total_yield: "Exp. Yield",
    upcoming: "Upcoming",
    healthy: "Healthy",
    delete_confirm: "Delete this item permanently?",
    water_advice: " AI Advice",
    water_ok: "Soil moisture optimal.",
    water_skip: "Rain expected. Skip watering.",
    water_more: "High heat alert. Water liberally.",
    custom_crop: "Custom Crop",
    enter_crop_name: "Crop Name",
    enter_days: "Days to Harvest",
    calendar_view: "Calendar",
    select_crop_type: "Select Crop",
    planting_date: "Date Planted",
    current_stage: "Growth Stage",
    add_new_crop: "Plant New Crop",
    edit_crop: "Edit Details",
    plant_crop_btn: "Plant Now",
    update_crop_btn: "Save Changes",
    write_note: "Record observations...",
    add_growth_note: "New Entry",
    quick_add: "Quick Add:",
    edit_task: "Edit Task",
    update: "Update",
    username_placeholder: "Username",
    login_title: "My Farm",
    login_subtitle: "Premium Farm Management",
    email_label: "Email",
    password_label: "Password",
    name_label: "Your Name",
    login_btn: "Sign In",
    signup_btn: "Create Account",
    demo_hint: "Demo: Enter any details",
    due: "Due",
    kg: "kg",
    harv: "Harvest",
    add_task_btn: "Add Task",
    task_name_placeholder: "What needs to be done?",
    select_section: "Zone / Section",
    other_section: "Custom Zone...",
    enter_section: "Zone Name",
    crop_notes: "Notes",
    email: "Email",
    toggle_signup: "New here? Sign Up",
    toggle_login: "Have an account? Login",
    reset_data: "Reset Demo Data",
    est_value: "Est. Revenue",
    currency: "RM",
    save_profile: "Save Profile",
    edit_profile: "Edit",
    cancel: "Cancel",
    farm_name: "Farm Name",
    phone_number: "Phone",
    task_date: "Date",
    refresh_loc: "Refresh",
    total_revenue: "Projected Revenue",
    day_count: "Day",
    crop_location: "Location",
    harvest_details: "Harvest Insight",
    market_price: "Market Price",
    est_revenue: "Revenue",
    countdown_today: "Harvest Today!",
    countdown_future: "in",
    countdown_past: "Harvested",
    days: "days",
    view_all: "Upcoming Harvests",
    showing_date: "Harvests for",
    monthly_forecast: "This Month",
    revenue_breakdown: "Revenue Breakdown", 
    revenue_source: "Source Breakdown",
    tab_upcoming: "Upcoming",
    tab_history: "History",
    complete_harvest: "Complete Harvest",
    harvested_on: "Harvested On",
    duration: "Duration",
    report_id: "Report ID",
    
    condition_cloudy: "Cloudy",
    condition_sunny: "Sunny",
    condition_rain: "Rainy",
    qa_water: "Water",
    qa_fert: "Fertilize",
    qa_prune: "Prune",
    qa_harv: "Harvest",
    Durian: "Durian",
    Mango: "Mango",
    Watermelon: "Watermelon",
    Papaya: "Papaya",
    Banana: "Banana",
    Apple: "Apple",
    Orange: "Orange",
    Pineapple: "Pineapple",
    Strawberry: "Strawberry",
    Seedling: "Seedling",
    Vegetative: "Vegetative",
    Flowering: "Flowering",
    Fruiting: "Fruiting"
  },
  ms: {
    welcome: "Selamat Kembali,",
    tasks: "Tugasan",
    crops: "Tanaman",
    growth: "Jurnal", 
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
    delete_confirm: "Padam item ini?",
    water_advice: "Nasihat AI",
    water_ok: "Kelembapan tanah baik.",
    water_skip: "Hujan dijangka! Jangan siram.",
    water_more: "Cuaca panas! Siram lebih.",
    custom_crop: "Lain-lain / Tersuai",
    enter_crop_name: "Nama Tanaman",
    enter_days: "Hari hingga Tuai",
    calendar_view: "Kalendar",
    select_crop_type: "Pilih Jenis",
    planting_date: "Tarikh Tanam",
    current_stage: "Peringkat",
    add_new_crop: "Tambah Tanaman",
    edit_crop: "Kemaskini",
    plant_crop_btn: "Tanam Sekarang",
    update_crop_btn: "Simpan",
    write_note: "Tulis nota...",
    add_growth_note: "Rekod Baru",
    quick_add: "Tambah Cepat:",
    edit_task: "Edit Tugasan",
    update: "Kemaskini",
    username_placeholder: "Nama Pengguna",
    login_title: "Ladang Saya",
    login_subtitle: "Pengurusan Ladang Pintar",
    email_label: "Emel",
    password_label: "Kata Laluan",
    name_label: "Nama",
    login_btn: "Log Masuk",
    signup_btn: "Daftar",
    demo_hint: "Demo: Masukkan sebarang butiran",
    due: "Tarikh",
    kg: "kg",
    harv: "Tuai",
    add_task_btn: "Tambah",
    task_name_placeholder: "Apa perlu dibuat?",
    select_section: "Zon / Bahagian",
    other_section: "Lain-lain...",
    enter_section: "Nama Zon",
    crop_notes: "Nota",
    email: "Emel",
    toggle_signup: "Tiada akaun? Daftar",
    toggle_login: "Sudah ada akaun? Log Masuk",
    reset_data: "Set Semula Data",
    est_value: "Nilai",
    currency: "RM",
    save_profile: "Simpan Profil",
    edit_profile: "Sunting",
    cancel: "Batal",
    farm_name: "Nama Ladang",
    phone_number: "Telefon",
    task_date: "Tarikh",
    refresh_loc: "Kemaskini",
    total_revenue: "Unjuran Pendapatan",
    day_count: "Hari Ke-",
    crop_location: "Lokasi",
    harvest_details: "Butiran Tuai",
    market_price: "Harga Pasaran",
    est_revenue: "Anggaran Hasil",
    countdown_today: "Tuai Hari Ini!",
    countdown_future: "lagi",
    countdown_past: "Dituai",
    days: "hari",
    ago: "lepas",
    view_all: "Senarai Tuaian",
    showing_date: "Tuaian pada",
    monthly_forecast: "Bulan Ini",
    revenue_breakdown: "Perincian Hasil",
    revenue_source: "Sumber",
    tab_upcoming: "Akan Datang",
    tab_history: "Sejarah",
    complete_harvest: "Selesai Tuai",
    harvested_on: "Dituai Pada",
    duration: "Tempoh",
    report_id: "ID Laporan",

    condition_cloudy: "Mendung",
    condition_sunny: "Panas",
    condition_rain: "Hujan",
    qa_water: "Siram",
    qa_fert: "Baja",
    qa_prune: "Cantas",
    qa_harv: "Tuai",
    Durian: "Durian",
    Mango: "Mangga",
    Watermelon: "Tembikai",
    Papaya: "Betik",
    Banana: "Pisang",
    Apple: "Epal",
    Orange: "Oren",
    Pineapple: "Nanas",
    Strawberry: "Strawberi",
    Seedling: "Anak Benih",
    Vegetative: "Vegetatif",
    Flowering: "Berbunga",
    Fruiting: "Berbuah"
  },
  zh: {
    welcome: "早上好，",
    tasks: "任务",
    crops: "我的农场",
    growth: "生长日记", 
    harvest: "收获管理",
    settings: "设置",
    active_crops: "活跃作物",
    tasks_today: "今日待办",
    today_tasks: "重点任务",
    reminders: "提醒",
    active: "进行中",
    completed: "已完成",
    add_note: "添加记录",
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
    delete_confirm: "确定删除？",
    water_advice: "智能建议",
    water_ok: "土壤湿度良好。",
    water_skip: "预计有雨！无需浇水。",
    water_more: "天气炎热！建议多浇水。",
    custom_crop: "其他 / 自定义",
    enter_crop_name: "作物名称",
    enter_days: "收获天数",
    calendar_view: "日历",
    select_crop_type: "选择作物",
    planting_date: "种植日期",
    current_stage: "当前阶段",
    add_new_crop: "添加新作物",
    edit_crop: "编辑信息",
    plant_crop_btn: "立即种植",
    update_crop_btn: "保存更改",
    write_note: "写下生长日记...",
    add_growth_note: "添加新记录",
    quick_add: "快速添加:",
    edit_task: "编辑任务",
    update: "更新",
    username_placeholder: "用户名",
    login_title: "农场管家",
    login_subtitle: "专业级农场管理系统",
    email_label: "电子邮件",
    password_label: "密码",
    name_label: "您的名字",
    login_btn: "登录",
    signup_btn: "注册",
    demo_hint: "演示模式：输入任意信息",
    due: "截止",
    kg: "公斤",
    harv: "收获",
    add_task_btn: "添加",
    task_name_placeholder: "需要做什么？",
    select_section: "选择区域",
    other_section: "其他...",
    enter_section: "区域名称",
    crop_notes: "备注（可选）",
    email: "邮箱",
    toggle_signup: "没有账户？注册",
    toggle_login: "已有账户？登录",
    reset_data: "重置数据",
    est_value: "预估产值",
    currency: "RM",
    save_profile: "保存资料",
    edit_profile: "编辑",
    cancel: "取消",
    farm_name: "农场名称",
    phone_number: "电话",
    task_date: "日期",
    refresh_loc: "刷新",
    total_revenue: "预计总收入",
    day_count: "生长天数",
    crop_location: "地点",
    harvest_details: "收获详情",
    market_price: "市场单价",
    est_revenue: "预计收入",
    countdown_today: "今天收成！",
    countdown_future: "还有",
    countdown_past: "已过",
    days: "天",
    ago: "天",
    view_all: "所有即将到来的收获",
    showing_date: "当日收获：",
    monthly_forecast: "本月预测",
    revenue_breakdown: "收入来源分析",
    revenue_source: "来源",
    tab_upcoming: "待收成",
    tab_history: "历史记录",
    complete_harvest: "确认收割",
    harvested_on: "收割日期",
    duration: "种植周期",
    report_id: "报告编号",

    condition_cloudy: "多云",
    condition_sunny: "晴朗",
    condition_rain: "有雨",
    qa_water: "浇水",
    qa_fert: "施肥",
    qa_prune: "修剪",
    qa_harv: "收获",
    Durian: "榴莲",
    Mango: "芒果",
    Watermelon: "西瓜",
    Papaya: "木瓜",
    Banana: "香蕉",
    Apple: "苹果",
    Orange: "橙子",
    Pineapple: "菠萝",
    Strawberry: "草莓",
    Seedling: "幼苗期",
    Vegetative: "生长期",
    Flowering: "开花期",
    Fruiting: "结果期"
  }
};

// --- Initial Data ---
const getTodayStr = () => new Date().toISOString().split('T')[0];

const INITIAL_TASKS = [
  { id: 1, title: 'Water Apple Trees', location: 'Section A', date: getTodayStr(), time: '09:00', type: 'water', completed: false },
  { id: 2, title: 'Prune Orange Trees', location: 'Section B', date: getTodayStr(), time: '11:00', type: 'prune', completed: false },
  { id: 3, title: 'Check Irrigation System', location: 'Section A', date: getTodayStr(), time: '14:00', type: 'general', completed: false },
];

// --- CROP DATABASE ---
const CROP_TYPES = {
  'Durian': { days: 125, yield: 500, price: 40, icon: '🍈' }, 
  'Mango': { days: 100, yield: 300, price: 8, icon: '🥭' },
  'Watermelon': { days: 85, yield: 50, price: 3, icon: '🍉' },
  'Papaya': { days: 150, yield: 40, price: 4, icon: '🍈' },
  'Banana': { days: 270, yield: 25, price: 5, icon: '🍌' },
  'Apple': { days: 120, yield: 60, price: 10, icon: '🍎' },
  'Orange': { days: 150, yield: 55, price: 9, icon: '🍊' },
  'Pineapple': { days: 300, yield: 2, price: 6, icon: '🍍' },
  'Strawberry': { days: 90, yield: 1, price: 25, icon: '🍓' }
};

// --- Helper Components ---
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
  
  const isToday = task.date === new Date().toISOString().split('T')[0];
  const displayDate = isToday ? 'Today' : new Date(task.date).toLocaleDateString(undefined, {month:'short', day:'numeric'});

  return (
    <div className={`ios-card p-4 rounded-[20px] flex items-center justify-between mb-3 transition-all animate-slide-up ${task.completed ? 'opacity-50 grayscale' : 'hover:scale-[1.02]'}`}>
      <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => onEdit && onEdit(task)}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.completed ? 'bg-gray-100' : 'bg-green-50 border border-green-100 shadow-sm'}`}>
            {getIcon(task.type)}
        </div>
        <div>
            <h3 className={`font-bold text-gray-900 ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5 font-medium">📍 {task.location}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {!task.completed && (
            <div className="flex flex-col items-end">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide mb-1 ${isToday ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{displayDate}</span>
                <span className="text-[10px] font-bold text-gray-400">{task.time}</span>
            </div>
        )}
        <div className="flex gap-2">
           <button onClick={() => onToggle(task.id)} className={`p-2 rounded-xl transition-colors ${task.completed ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400 hover:bg-green-50'}`}><Check size={18} /></button>
           <button onClick={() => onDelete(task.id)} className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 shadow-sm transition-colors"><Trash2 size={18} /></button>
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
  const [showSplash, setShowSplash] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); 
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- SETTINGS STATE ---
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [farmName, setFarmName] = useState(localStorage.getItem('farm_name') || 'Green Valley Farm');
  const [phone, setPhone] = useState(localStorage.getItem('farm_phone') || '+60 12-345 6789');

  // --- WEATHER STATE ---
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('Detecting...');

  // --- DATA ---
  const [tasks, setTasks] = useState(() => {
    try { const saved = localStorage.getItem('farm_tasks'); return saved ? JSON.parse(saved) : INITIAL_TASKS; } catch (e) { return INITIAL_TASKS; }
  });
  const [crops, setCrops] = useState(() => {
    try { const saved = localStorage.getItem('farm_crops'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; }
  });

  // --- SPLASH ANIMATION & CHECK LOGIN ---
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowSplash(false);
    }, 3500);

    const savedLogin = localStorage.getItem('farm_loggedin');
    if (savedLogin === 'true') {
        setIsLoggedIn(true);
        setUserName(localStorage.getItem('farm_username') || 'Farmer'); 
        setUserEmail(localStorage.getItem('farm_email') || '');
        setFarmName(localStorage.getItem('farm_name') || 'Green Valley Farm');
        setPhone(localStorage.getItem('farm_phone') || '+60 12-345 6789');
    }
    return () => clearTimeout(timer);
  }, []);
  
  // --- LIVE WEATHER API FETCH WITH GEOLOCATION 🌍 ---
  useEffect(() => {
    const fetchWeather = (lat, lon) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`)
          .then(response => response.json())
          .then(data => {
            setWeather(data);
          })
          .catch(err => console.error("Weather fetch error:", err));
        
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
          .then(res => res.json())
          .then(data => {
             if(data.city || data.locality) {
                 setLocationName(data.city || data.locality);
             } else {
                 setLocationName("My Location");
             }
          })
          .catch(() => setLocationName("My Location"));
    };

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            },
            (error) => {
                fetchWeather(2.9264, 101.6964);
                setLocationName("Putrajaya (Default)");
            }
        );
    } else {
        fetchWeather(2.9264, 101.6964);
        setLocationName("Putrajaya");
    }
  }, []);

  const getWeatherInfo = (code) => {
      if (code === 0) return { icon: <Sun size={18}/>, key: 'condition_sunny' };
      if (code >= 1 && code <= 3) return { icon: <CloudSun size={18}/>, key: 'condition_cloudy' };
      if (code >= 51 && code <= 67) return { icon: <CloudRain size={18}/>, key: 'condition_rain' }; 
      if (code >= 95) return { icon: <Wind size={18}/>, key: 'condition_rain' }; 
      return { icon: <Cloud size={18}/>, key: 'condition_cloudy' }; 
  };
  
  // Persist Data
  useEffect(() => { localStorage.setItem('farm_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { try { localStorage.setItem('farm_crops', JSON.stringify(crops)); } catch (e) { alert("⚠️ Storage full! Delete some photos."); } }, [crops]);

  // --- STATE FOR FEATURES ---
  const [activeCropId, setActiveCropId] = useState(null);
  
  useEffect(() => {
    if (activeTab !== 'growth') {
        setActiveCropId(null);
    }
  }, [activeTab]);

  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showAddLog, setShowAddLog] = useState(false); 
  const [editingCrop, setEditingCrop] = useState(null); 
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskSection, setNewTaskSection] = useState('Section A');
  const [newTaskTime, setNewTaskTime] = useState('09:00');
  const [newTaskDate, setNewTaskDate] = useState(getTodayStr()); 
  const [isCustomSection, setIsCustomSection] = useState(false);
  const [customSectionName, setCustomSectionName] = useState('');

  const [calendarDate, setCalendarDate] = useState(new Date()); 
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null); 
  const [showHarvestDetails, setShowHarvestDetails] = useState(null); 
  const [showRevenueDetails, setShowRevenueDetails] = useState(false);
  const [harvestTab, setHarvestTab] = useState('upcoming'); // 'upcoming' or 'history'
  
  const [noteText, setNoteText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isCustomCrop, setIsCustomCrop] = useState(false);
  const [cropForm, setCropForm] = useState({ type: 'Durian', date: new Date().toISOString().split('T')[0], stage: 'Seedling', customName: '', customDays: 90, notes: '', location: '' });
  
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

  const handleSaveProfile = () => {
      localStorage.setItem('farm_username', userName);
      localStorage.setItem('farm_email', userEmail);
      localStorage.setItem('farm_name', farmName);
      localStorage.setItem('farm_phone', phone);
      setIsEditingProfile(false);
  };

  const handleResetData = () => {
    if(confirm('Reset all data to Demo defaults? This cannot be undone.')) {
        setTasks(INITIAL_TASKS);
        setCrops([]);
        localStorage.removeItem('farm_tasks');
        localStorage.removeItem('farm_crops');
        setActiveTab('home');
        alert("App has been reset!");
    }
  };

  const toggleTask = (id) => { setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)); };
  const deleteTask = (id) => { setTasks(tasks.filter(t => t.id !== id)); };
  const deleteCrop = (id) => { if (confirm(t('delete_confirm'))) { setCrops(crops.filter(c => c.id !== id)); } };
  const deleteGrowthLog = (cropId, logId) => { if (confirm(t('delete_confirm'))) { setCrops(crops.map(c => { if (c.id === cropId) { return { ...c, logs: c.logs.filter(l => l.id !== logId) }; } return c; })); } };

  // --- NEW: COMPLETE HARVEST (Move to History) ---
  const completeHarvest = (id) => {
    if (confirm("Mark this crop as harvested and move to history?")) {
        setCrops(crops.map(c => c.id === id ? { ...c, status: 'harvested', harvestedDate: new Date().toISOString() } : c));
        if (selectedCalendarDate) setSelectedCalendarDate(null); // Reset filter
    }
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault(); 
    if (!newTaskName) return;
    
    const finalSection = isCustomSection ? customSectionName : newTaskSection;

    if (editingTask) {
        setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, title: newTaskName, location: finalSection, time: newTaskTime, date: newTaskDate } : t));
        setEditingTask(null);
    } else {
        let type = 'general';
        const lower = newTaskName.toLowerCase();
        if (lower.includes('water') || lower.includes('siram') || lower.includes('浇水')) type = 'water';
        else if (lower.includes('prune') || lower.includes('cantas') || lower.includes('修剪')) type = 'prune';
        else if (lower.includes('harvest') || lower.includes('tuai') || lower.includes('收获')) type = 'harvest';
        else if (lower.includes('fertilize') || lower.includes('baja') || lower.includes('施肥')) type = 'fertilize';
        setTasks([...tasks, { id: Date.now(), title: newTaskName, location: finalSection, time: newTaskTime, date: newTaskDate, type: type, completed: false }]);
    }
    setNewTaskName(''); 
    setNewTaskTime('09:00');
    setNewTaskDate(getTodayStr());
    setIsCustomSection(false);
    setCustomSectionName('');
    setShowAddTask(false);
  };

  const openEditTask = (task) => { 
      setEditingTask(task); 
      setNewTaskName(task.title); 
      setNewTaskSection(task.location);
      setNewTaskTime(task.time);
      setNewTaskDate(task.date || getTodayStr());
      setShowAddTask(true); 
  };
  const addQuickTask = (text) => { setNewTaskName(text); };

  const handleCropSubmit = (e) => {
    e.preventDefault();
    let name, days, icon, yieldVal, price;
    if (isCustomCrop) {
        name = cropForm.customName || "Unknown Crop";
        days = parseInt(cropForm.customDays) || 90;
        icon = '🌱';
        yieldVal = 100;
        price = 5;
    } else {
        const cropInfo = CROP_TYPES[cropForm.type] || { days: 90, yield: 100, price: 5, icon: '🌱' };
        name = cropForm.type;
        days = cropInfo.days;
        icon = cropInfo.icon;
        yieldVal = cropInfo.yield;
        price = cropInfo.price;
    }
    const plantingDate = new Date(cropForm.date);
    const harvestDate = new Date(plantingDate);
    harvestDate.setDate(plantingDate.getDate() + days); 

    if (editingCrop) {
        setCrops(crops.map(c => c.id === editingCrop.id ? { 
            ...c, 
            name: name, 
            plantedDate: cropForm.date, 
            harvestDate: harvestDate.toDateString(), 
            harvestIso: harvestDate.toISOString(), 
            stage: cropForm.stage, 
            daysToMaturity: days,
            description: cropForm.notes,
            location: cropForm.location 
        } : c));
        setEditingCrop(null);
    } else {
        setCrops([...crops, { 
            id: Date.now(), 
            name: name, 
            plantedDate: cropForm.date, 
            harvestDate: harvestDate.toDateString(), 
            harvestIso: harvestDate.toISOString(), 
            stage: cropForm.stage, 
            daysToMaturity: days, 
            yield: yieldVal, 
            price: price,
            location: cropForm.location,
            logs: [],
            description: cropForm.notes 
        }]);
    }
    setShowAddCrop(false); setIsCustomCrop(false); setCropForm({ ...cropForm, customName: '', customDays: 90, notes: '', location: '' });
  };

  const openEditCrop = (crop) => {
      setEditingCrop(crop);
      const isKnown = Object.keys(CROP_TYPES).includes(crop.name);
      setIsCustomCrop(!isKnown);
      setCropForm({
          type: isKnown ? crop.name : 'custom',
          date: crop.plantedDate,
          stage: crop.stage,
          customName: isKnown ? '' : crop.name,
          customDays: crop.daysToMaturity,
          notes: crop.description || '',
          location: crop.location || ''
      });
      setShowAddCrop(true);
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
    const newLog = { 
        id: Date.now(), 
        date: new Date().toLocaleDateString(undefined, {month: 'short', day: 'numeric'}), 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: noteText, 
        image: selectedImage 
    };
    setCrops(crops.map(c => c.id === activeCropId ? { ...c, logs: [newLog, ...(c.logs || [])] } : c));
    setNoteText(''); setSelectedImage(null); setShowAddLog(false);
  };

  const updateCropStage = (newStage) => {
      setCrops(crops.map(c => c.id === activeCropId ? { ...c, stage: newStage } : c));
  };

  const getDaysLeft = (harvestDateString) => {
    const today = new Date();
    const harvest = new Date(harvestDateString);
    today.setHours(0, 0, 0, 0);
    harvest.setHours(0, 0, 0, 0);
    const diffTime = harvest.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysSincePlanted = (plantedDate) => {
      const start = new Date(plantedDate);
      const now = new Date();
      const diff = now.getTime() - start.getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // --- SPLASH SCREEN (RESTORED TO ORIGINAL DESIGN) ---
  if (showSplash) {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
         {/* Original Background Image + Gradient */}
         <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3200&auto=format&fit=crop')" }}></div>
         <div className="absolute inset-0 z-0 bg-gradient-to-t from-green-950 via-green-900/40 to-sky-300/30 animate-pulse"></div>
         
         <div className="relative z-10 text-center animate-slide-up">
             <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8 shadow-2xl border border-white/40 ring-4 ring-green-400/30 animate-breathe">
                 <Sprout size={56} className="text-white drop-shadow-md" />
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
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
              <div className="ios-card p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm relative z-10 animate-slide-up border border-white/50">
                  <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner transform -rotate-6">
                      <Tractor size={40} className="text-green-600" />
                  </div>
                  <h1 className="text-3xl font-black text-center text-gray-900 mb-1 tracking-tight">{t('login_title')}</h1>
                  <p className="text-center text-gray-500 mb-8 text-sm font-medium">{t('login_subtitle')}</p>
                  <form onSubmit={handleLogin} className="space-y-4">
                      {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">{t('name_label')}</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input type="text" required className="w-full bg-gray-50/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder-gray-300" placeholder="Farmer John" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                        </div>
                      )}
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">{t('email_label')}</label>
                          <div className="relative">
                              <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input type="email" required className="w-full bg-gray-50/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder-gray-300" placeholder="farmer@mail.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">{t('password_label')}</label>
                          <div className="relative">
                              <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input type="password" required className="w-full bg-gray-50/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder-gray-300" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>
                      </div>
                      <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4">
                          {isSignUp ? t('signup_btn') : t('login_btn')}
                      </button>
                  </form>
                  <div className="mt-6 text-center">
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm font-bold text-green-700 hover:underline">
                        {isSignUp ? t('toggle_login') : t('toggle_signup')}
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-4">{t('demo_hint')}</p>
              </div>
          </div>
      )
  }

  // --- REVENUE MODAL ---
  const RevenueDetailModal = ({ crops, onClose }) => {
    // Filter active vs harvested based on if status is 'harvested' or active
    // For this demo, let's just list ALL crops to show potential & realized
    const total = crops.reduce((acc, c) => acc + ((c.yield || 0) * (c.price || 0)), 0);
    const sortedCrops = [...crops].sort((a,b) => ((b.yield||0)*(b.price||0)) - ((a.yield||0)*(a.price||0))); // Sort high to low

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-4 animate-slide-up" style={{zIndex: 9999}} onClick={onClose}>
            <div className="bg-white/95 w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={16}/></button>
                <h2 className="text-2xl font-black text-gray-900 mb-1">{t('revenue_breakdown')}</h2>
                <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">{t('total_revenue')}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-2xl font-bold text-green-600">RM</span>
                    <span className="text-6xl font-black text-green-800 tracking-tight">{total.toLocaleString()}</span>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t('revenue_source')}</h4>
                    {sortedCrops.length > 0 ? sortedCrops.map((crop, i) => {
                        const val = (crop.yield || 0) * (crop.price || 0);
                        const percent = total > 0 ? (val / total) * 100 : 0;
                        return (
                            <div key={crop.id} className={`ios-card p-4 rounded-2xl mb-2 animate-slide-up delay-${(i%4)*100}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl bg-gray-100 p-2 rounded-xl">{CROP_TYPES[crop.name]?.icon}</span>
                                        <div>
                                            <span className="block text-sm font-bold text-gray-900">{t(crop.name) || crop.name}</span>
                                            <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1"><MapPin size={8}/> {crop.location || 'Section A'}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-sm font-black text-gray-900">RM {val.toLocaleString()}</span>
                                        <span className="text-[10px] text-gray-400 font-medium">{new Date(crop.harvestDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                                    <div className="h-full bg-green-500 rounded-full animate-grow-width" style={{'--target-width': `${percent}%`, width: `${percent}%`}}></div>
                                </div>
                            </div>
                        )
                    }) : <div className="text-center text-gray-400 py-4">No data available</div>}
                </div>
            </div>
        </div>
    )
  };

  // --- MAIN APP ---
  const renderHome = () => {
    const activeTasks = [...tasks].sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1)).filter(t => !t.completed);
    let waterAdvice = t('water_ok');
    
    // Live Weather Logic
    const temp = weather?.current_weather?.temperature || 29;
    const wCode = weather?.current_weather?.weathercode || 0;
    const wInfo = getWeatherInfo(wCode);
    if (temp > 32) { waterAdvice = t('water_more'); }
    if ((wCode >= 51 && wCode <= 67) || (wCode >= 80 && wCode <= 99)) { waterAdvice = t('water_skip'); }

    // Calculate Total Revenue
    const totalRevenue = crops.reduce((acc, c) => acc + ((c.yield || 0) * (c.price || 0)), 0);

    return (
      <div className="space-y-6 pb-32 animate-slide-up">
        <style dangerouslySetInnerHTML={{__html: styles}} />
        
        {/* REVENUE MODAL */}
        {showRevenueDetails && <RevenueDetailModal crops={crops} onClose={() => setShowRevenueDetails(false)} />}
        
        <div className="flex justify-between items-center px-1 pt-4">
            <div>
                <p className="text-green-900 text-xs font-bold uppercase tracking-wider mb-0.5 opacity-80">{dateString}</p>
                {/* ✨ RE-TRIGGER ANIMATION WITH KEY ✨ */}
                <h1 key={activeTab + "welcome"} className="text-3xl font-black text-gray-900 tracking-tight animate-slide-up">{t('welcome')} <br/><span className="text-green-700">{userName}</span>.</h1>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveTab('settings')}>
                <User size={24} className="text-green-800"/>
            </div>
        </div>
        
        {/* PREMIUM DEEP EMERALD WEATHER CARD (NO BLACK) */}
        <div className={`rounded-[2.5rem] p-6 relative overflow-hidden transition-colors duration-500 animate-slide-up delay-100 bg-gradient-to-br from-emerald-700 to-teal-900 shadow-2xl`}>
            <div className="absolute top-0 right-0 p-6 opacity-20"><Sun size={80} className="text-white"/></div>
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <div className="text-6xl font-light tracking-tighter mb-1 text-white">{temp}°</div>
                    <div className="text-sm font-bold opacity-90 flex items-center gap-2 uppercase tracking-wide text-white">{wInfo.icon} {t(wInfo.key)}</div>
                </div>
                <div className="text-right flex flex-col items-end text-white">
                    <div className="text-sm font-bold opacity-80 flex items-center justify-end gap-1"><MapPin size={12}/>{locationName}</div>
                    <div className="text-xs opacity-60 mt-1 font-medium">
                        H:{weather?.daily?.temperature_2m_max ? weather.daily.temperature_2m_max[0] : '--'}° 
                        L:{weather?.daily?.temperature_2m_min ? weather.daily.temperature_2m_min[0] : '--'}°
                    </div>
                </div>
            </div>
            <div className={`mt-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3`}>
                <div className="bg-white/20 p-2 rounded-full"><Droplets size={18} className="text-white" /></div>
                <p className="text-xs font-bold leading-relaxed opacity-95 text-white">{waterAdvice}</p>
            </div>
        </div>

        {/* 💰 FINANCIAL CARD - CLICKABLE & FIXED Z-INDEX */}
        <div onClick={() => setShowRevenueDetails(true)} className="bg-black text-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-200/50 flex items-center justify-between relative overflow-hidden group cursor-pointer animate-slide-up delay-200 active:scale-95 transition-transform" style={{ zIndex: 20, position: 'relative' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-90"></div>
            <div className="absolute inset-0 shimmer-bg opacity-20 pointer-events-none"></div>
            <div className="relative z-10 pointer-events-none">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">{t('total_revenue')} <ArrowUpRight size={12}/></p>
                <h2 className="text-4xl font-black text-white flex items-start gap-1"><span className="text-lg mt-1 font-bold text-green-400">RM</span>{totalRevenue.toLocaleString()}</h2>
            </div>
            <div className="relative z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform pointer-events-none">
                <BarChart3 size={24} className="text-green-400"/>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 animate-slide-up delay-300">
          <div onClick={() => setActiveTab('crops')} className="ios-card p-6 rounded-[2rem] shadow-sm cursor-pointer group hover:bg-white transition-all">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-3 group-hover:scale-110 transition-transform"><Sprout size={24}/></div>
            <div className="text-3xl font-black text-gray-800">{crops.length}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('active_crops')}</div>
          </div>
          <div onClick={() => setActiveTab('tasks')} className="ios-card p-6 rounded-[2rem] shadow-sm cursor-pointer group hover:bg-white transition-all">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-3 group-hover:scale-110 transition-transform"><Check size={24}/></div>
            <div className="text-3xl font-black text-gray-800">{activeTasks.length}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('tasks_today')}</div>
          </div>
        </div>

        <div className="animate-slide-up delay-400">
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
    const sortedTasks = [...tasks].sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
    const activeTasks = sortedTasks.filter(t => !t.completed);
    const completedTasks = sortedTasks.filter(t => t.completed);
    
    return (
      <div className="pb-32 pt-6 animate-slide-up">
        <h1 className="text-4xl font-black text-gray-900 px-2 mb-8 tracking-tight">{t('reminders')}</h1>
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white/60 mb-8 sticky top-4 z-20">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{editingTask ? t('edit_task') : t('quick_add')}</h3>
               <button onClick={() => { setShowAddTask(!showAddTask); setEditingTask(null); setNewTaskName(''); setNewTaskTime('09:00'); }} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${showAddTask ? 'bg-gray-200 text-gray-600' : 'bg-black text-white'}`}>{showAddTask ? <X size={20}/> : <Plus size={20}/>}</button>
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
                             <input type="date" className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500 w-1/2" value={newTaskDate} onChange={(e) => setNewTaskDate(e.target.value)} />
                             <input type="time" className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500 w-1/2" value={newTaskTime} onChange={(e) => setNewTaskTime(e.target.value)} />
                        </div>
                        <select className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500 w-full" value={isCustomSection ? 'custom' : newTaskSection} onChange={(e) => { if(e.target.value === 'custom') { setIsCustomSection(true); } else { setIsCustomSection(false); setNewTaskSection(e.target.value); } }}>
                             <option value="Section A">Section A</option>
                             <option value="Section B">Section B</option>
                             <option value="Section C">Section C</option>
                             <option value="custom">{t('other_section')}</option>
                        </select>
                        {isCustomSection && <input type="text" placeholder={t('enter_section')} className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500 w-full" value={customSectionName} onChange={(e) => setCustomSectionName(e.target.value)} />}
                        
                        <button type="submit" className="bg-green-600 text-white px-6 rounded-2xl font-bold text-sm shadow-lg hover:bg-green-700 transition-colors py-4 shadow-green-500/30">{editingTask ? t('update') : t('add_task_btn')}</button>
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

  const renderCrops = () => {
    const sortedCrops = [...crops].sort((a, b) => {
        const daysA = getDaysLeft(a.harvestIso || a.harvestDate);
        const daysB = getDaysLeft(b.harvestIso || b.harvestDate);
        return daysA - daysB;
    });

    return (
    <div className="pb-32 pt-6 animate-slide-up">
      <div className="flex justify-between items-center mb-8 px-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('crops')}</h1>
        <button onClick={() => { setEditingCrop(null); setCropForm({ type: 'Durian', date: new Date().toISOString().split('T')[0], stage: 'Seedling', customName: '', customDays: 90, notes: '', location: '' }); setShowAddCrop(true); }} className="bg-green-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl shadow-green-500/30 flex items-center gap-2 hover:scale-105 transition-transform"><Plus size={18}/> {t('add_new_crop')}</button>
      </div>
      
      {showAddCrop && (
        <div className="fixed inset-0 bg-green-900/60 flex items-end sm:items-center justify-center z-50 p-4 backdrop-blur-md animate-fade-in">
          <form onSubmit={handleCropSubmit} className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center"><h3 className="font-bold text-2xl text-gray-900">{editingCrop ? t('edit_crop') : t('add_new_crop')}</h3><button type="button" onClick={() => setShowAddCrop(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"><X size={20}/></button></div>
            <div className="p-8 space-y-6 overflow-y-auto">
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('select_crop_type')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-lg font-medium focus:ring-2 focus:ring-green-500 outline-none" value={isCustomCrop ? 'custom' : cropForm.type} onChange={(e) => { if (e.target.value === 'custom') { setIsCustomCrop(true); } else { setIsCustomCrop(false); setCropForm({...cropForm, type: e.target.value}); } }}>{Object.keys(CROP_TYPES).map(type => <option key={type} value={type}>{CROP_TYPES[type].icon} {t(type)}</option>)}<option value="custom">➕ {t('custom_crop')}</option></select></div>
              {isCustomCrop && (<div className="space-y-4 animate-in slide-in-from-top-4"><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_crop_name')}</label><input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.customName} onChange={(e) => setCropForm({...cropForm, customName: e.target.value})} placeholder="e.g. Dragonfruit" /></div><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_days')}</label><input type="number" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.customDays} onChange={(e) => setCropForm({...cropForm, customDays: e.target.value})} /></div></div>)}
              <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('planting_date')}</label><input type="date" required className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium" value={cropForm.date} onChange={(e) => setCropForm({...cropForm, date: e.target.value})} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('current_stage')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium" value={cropForm.stage} onChange={(e) => setCropForm({...cropForm, stage: e.target.value})}><option value="Seedling">{t('Seedling')}</option><option value="Vegetative">{t('Vegetative')}</option><option value="Flowering">{t('Flowering')}</option><option value="Fruiting">{t('Fruiting')}</option></select></div>
              </div>
              {/* --- NEW LOCATION FIELD --- */}
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('crop_location')}</label><input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.location} onChange={(e) => setCropForm({...cropForm, location: e.target.value})} placeholder="e.g. Section A, Row 4" /></div>
              
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('crop_notes')}</label><textarea className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium h-24 resize-none" value={cropForm.notes} onChange={(e) => setCropForm({...cropForm, notes: e.target.value})} placeholder="..." /></div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto"><button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all">{editingCrop ? t('update_crop_btn') : t('plant_crop_btn')}</button></div>
          </form>
        </div>
      )}

      {sortedCrops.length === 0 ? (<div className="flex flex-col items-center justify-center h-[50vh] text-center opacity-40"><Sprout size={80} className="text-gray-300 mb-6" /><p className="text-gray-800 font-bold text-2xl">Start your farm</p><p className="text-base text-gray-500">Add your first crop to track growth</p></div>) : (
        <div className="grid gap-4">{sortedCrops.map((crop, i) => {
            const daysLeft = getDaysLeft(crop.harvestIso || crop.harvestDate);
            const progress = 100 - (daysLeft / crop.daysToMaturity * 100);
            const clampedProgress = Math.max(0, Math.min(100, progress));
            const estimatedValue = (crop.yield || 0) * (crop.price || 0); 
            
            return (
            <div key={crop.id} className="ios-card p-6 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:shadow-lg transition-all animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100"><div className="h-full bg-green-500 rounded-r-full transition-all duration-1000" style={{width: `${clampedProgress}%`}}></div></div>
                <div className="flex justify-between items-start mb-6 pt-3">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-gray-100">{CROP_TYPES[crop.name]?.icon || '🌱'}</div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-xl">{t(crop.name) || crop.name}</h3>
                            <p className="text-sm text-gray-500 font-medium mt-1">{t(crop.stage)}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => openEditCrop(crop)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"><Edit2 size={20}/></button>
                        <button onClick={() => deleteCrop(crop.id)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={20}/></button>
                    </div>
                </div>
                {/* --- DISPLAY LOCATION IN CARD --- */}
                {crop.location && <div className="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase tracking-wider mb-2"><MapPin size={10}/> {crop.location}</div>}
                
                {crop.description && <div className="text-xs text-gray-500 mb-4 bg-green-50/50 p-3 rounded-xl border border-green-50">{crop.description}</div>}
                <div className="flex justify-between items-end">
                    <div className="bg-gray-100/50 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-2 border border-gray-200/50"><Calendar size={14}/> {new Date(crop.harvestDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</div>
                    
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                             <DollarSign size={10} className="text-yellow-600"/>
                             <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-wide">{t('est_value')}: {t('currency')} {estimatedValue}</span>
                        </div>
                        <div className="text-right mt-1"><div className="text-3xl font-black text-green-600">{daysLeft}</div><div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('days_left')}</div></div>
                    </div>
                </div>
            </div>
        )})}</div>
      )}
    </div>
  )};

  const renderGrowth = () => {
    const getLastUpdate = (crop) => {
        if (!crop.logs || crop.logs.length === 0) return 'No records yet';
        return crop.logs[0].date; 
    };

    const currentCrop = crops.find(c => c.id === activeCropId);

    return (
    <div className="pb-32 pt-6">
      
      {!activeCropId ? (
        <div className="animate-entry">
            <div className="mb-8 px-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t('growth')}</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Select a crop to manage records</p>
                </div>
                <button onClick={() => setShowAddCrop(true)} className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"><Plus size={24}/></button>
            </div>

            {crops.length > 0 ? (
                <div className="grid gap-4 px-2">
                    {crops.map((crop, i) => (
                        <div 
                            key={crop.id} 
                            onClick={() => setActiveCropId(crop.id)}
                            className="ios-card p-5 rounded-[2rem] shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group animate-slide-up"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-green-100 group-hover:bg-green-100 transition-colors">
                                    {CROP_TYPES[crop.name]?.icon || '🌱'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{t(crop.name) || crop.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">{t(crop.stage)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Last Update</div>
                                <div className="text-xs font-bold text-green-700">{getLastUpdate(crop) === 'No records yet' ? 'Never' : getLastUpdate(crop)}</div>
                                <ChevronRight size={16} className="text-gray-300 ml-auto mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 mx-4 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                    <Sprout size={48} className="mx-auto text-gray-200 mb-4"/>
                    <p className="text-gray-400 font-medium">No crops planted yet.</p>
                </div>
            )}
        </div>
      ) : (
        <div className="animate-slide-up">
            <div className="flex items-center justify-between px-2 mb-6 sticky top-0 bg-[#FAFAFA]/90 backdrop-blur-md z-10 py-2">
                <button onClick={() => setActiveCropId(null)} className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 text-gray-600 shadow-sm transition-all">
                    <ChevronLeft size={20}/>
                </button>
                <div className="text-center">
                    <h2 className="font-black text-xl text-gray-900">{currentCrop?.name}</h2>
                    <p className="text-xs text-green-600 font-bold uppercase tracking-widest">{t('growth')} History</p>
                </div>
                <button onClick={() => setShowAddLog(true)} className="p-3 bg-black text-white rounded-2xl shadow-lg hover:scale-105 transition-transform active:scale-95">
                    <Plus size={20}/>
                </button>
            </div>

            {/* --- TOP INFO CARD (Description & Stats) --- */}
            <div className="mx-4 mb-8 bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                        <span className="text-3xl">{CROP_TYPES[currentCrop?.name]?.icon}</span>
                        <div>
                            <div className="text-xs text-gray-400 font-bold uppercase">Current Stage</div>
                            <div className="text-sm font-bold text-gray-900 flex items-center gap-1 cursor-pointer hover:text-green-600" onClick={() => {
                                const stages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting'];
                                const nextIndex = (stages.indexOf(currentCrop.stage) + 1) % 4;
                                updateCropStage(stages[nextIndex]);
                            }}>
                                {currentCrop?.stage} <RefreshCw size={12}/>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-400 font-bold uppercase">{t('day_count')}</div>
                        <div className="text-2xl font-black text-green-600">{getDaysSincePlanted(currentCrop?.plantedDate)}</div>
                    </div>
                </div>
                {/* --- SHOW DESCRIPTION HERE --- */}
                {currentCrop?.description && (
                    <div className="pt-3 border-t border-dashed border-gray-100 text-xs text-gray-500 leading-relaxed bg-yellow-50/50 p-2 rounded-xl mt-2">
                        <span className="font-bold text-yellow-600 uppercase mr-1">Note:</span>{currentCrop.description}
                    </div>
                )}
            </div>

            {/* --- TIMELINE --- */}
            <div className="space-y-8 px-4 border-l-2 border-dashed border-gray-200 ml-6 pb-12">
                {currentCrop?.logs?.length > 0 ? (
                    currentCrop?.logs?.map((log, i) => (
                    <div key={log.id} className="relative pl-8 group animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-4 border-green-500 rounded-full shadow-sm z-10"></div>
                        
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">{log.date}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{log.time}</span>
                            </div>
                            {/* --- FIXED: DELETE BUTTON ALWAYS VISIBLE --- */}
                            <button onClick={(e) => { e.stopPropagation(); deleteGrowthLog(activeCropId, log.id); }} className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors shadow-sm">
                                <Trash2 size={14}/>
                            </button>
                        </div>
                        
                        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100">
                            {log.image && (
                                <div className="rounded-2xl overflow-hidden shadow-inner border border-gray-100 mb-4 h-48 w-full">
                                    <img src={log.image} className="w-full h-full object-cover" alt="Growth" />
                                </div>
                            )}
                            <p className="text-base text-gray-800 leading-relaxed font-medium">{log.text}</p>
                        </div>
                    </div>
                ))) : (
                    <div className="text-center py-10 opacity-60">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm"><Camera size={32} className="text-gray-300"/></div>
                        <p className="text-sm font-bold text-gray-500">Time to start tracking!</p>
                        <p className="text-xs text-gray-400 mt-1">Take a photo to record current stage.</p>
                    </div>
                )}
            </div>
        </div>
      )}
      
      {showAddLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-xl text-gray-900">{t('add_growth_note')}</h3>
                    <button onClick={() => setShowAddLog(false)} className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"><X size={16}/></button>
                </div>
                <div className="p-6 space-y-6 overflow-y-auto">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Evidence Photo</label>
                        <div onClick={() => fileInputRef.current.click()} className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all relative overflow-hidden group">
                            {selectedImage ? (
                                <img src={selectedImage} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"><Camera size={24}/></div>
                                    <span className="text-xs font-bold">Tap to upload</span>
                                </div>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => handleImageSelect(e, setSelectedImage)} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Observations</label>
                        <textarea className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium h-32 resize-none text-gray-700 text-sm" value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Leaf color, height, pests found..." />
                    </div>
                </div>
                <div className="p-6 bg-white border-t border-gray-100">
                    <button onClick={addGrowthLog} className="w-full bg-black text-white py-4 rounded-2xl font-bold text-base shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                        <Check size={18}/> {t('save')}
                    </button>
                </div>
            </div>
        </div>
      )}
      
      {/* Re-using Add Crop Modal for the + button in List View */}
      {showAddCrop && (
        <div className="fixed inset-0 bg-green-900/60 flex items-end sm:items-center justify-center z-50 p-4 backdrop-blur-md animate-fade-in">
          <form onSubmit={handleCropSubmit} className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center"><h3 className="font-bold text-2xl text-gray-900">{t('add_new_crop')}</h3><button type="button" onClick={() => setShowAddCrop(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"><X size={20}/></button></div>
            <div className="p-8 space-y-6 overflow-y-auto">
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('select_crop_type')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-lg font-medium focus:ring-2 focus:ring-green-500 outline-none" value={isCustomCrop ? 'custom' : cropForm.type} onChange={(e) => { if (e.target.value === 'custom') { setIsCustomCrop(true); } else { setIsCustomCrop(false); setCropForm({...cropForm, type: e.target.value}); } }}>{Object.keys(CROP_TYPES).map(type => <option key={type} value={type}>{CROP_TYPES[type].icon} {t(type)}</option>)}<option value="custom">➕ {t('custom_crop')}</option></select></div>
              {isCustomCrop && (<div className="space-y-4 animate-in slide-in-from-top-4"><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_crop_name')}</label><input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.customName} onChange={(e) => setCropForm({...cropForm, customName: e.target.value})} placeholder="e.g. Dragonfruit" /></div><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_days')}</label><input type="number" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.customDays} onChange={(e) => setCropForm({...cropForm, customDays: e.target.value})} /></div></div>)}
              <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('planting_date')}</label><input type="date" required className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium" value={cropForm.date} onChange={(e) => setCropForm({...cropForm, date: e.target.value})} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('current_stage')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium" value={cropForm.stage} onChange={(e) => setCropForm({...cropForm, stage: e.target.value})}><option value="Seedling">{t('Seedling')}</option><option value="Vegetative">{t('Vegetative')}</option><option value="Flowering">{t('Flowering')}</option><option value="Fruiting">{t('Fruiting')}</option></select></div>
              </div>
              {/* --- NEW LOCATION FIELD --- */}
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('crop_location')}</label><input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.location} onChange={(e) => setCropForm({...cropForm, location: e.target.value})} placeholder="e.g. Section A, Row 4" /></div>
              
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('crop_notes')}</label><textarea className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium h-24 resize-none" value={cropForm.notes} onChange={(e) => setCropForm({...cropForm, notes: e.target.value})} placeholder="..." /></div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto"><button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all">{editingCrop ? t('update_crop_btn') : t('plant_crop_btn')}</button></div>
          </form>
        </div>
      )}
    </div>
  )};

  const renderHarvest = () => {
    // 🌾 NEW: Harvest Countdown Logic
    const getDaysUntilHarvest = (harvestDate) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const target = new Date(harvestDate);
        target.setHours(0,0,0,0);
        const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
        
        if (diff === 0) return <span className="text-green-600 font-black">{t('countdown_today')}</span>;
        if (diff > 0) return <span>{t('countdown_future')} <span className="font-bold text-green-600">{diff}</span> {t('days')}</span>;
        return <span className="text-gray-400">{t('countdown_past')} <span className="font-bold">{Math.abs(diff)}</span> {t('ago')}</span>;
    };

    const getItemsForDate = (date) => {
        const checkDate = new Date(date);
        const harvests = crops.filter(c => {
            const hDate = new Date(c.harvestDate);
            return hDate.getDate() === checkDate.getDate() && hDate.getMonth() === checkDate.getMonth() && hDate.getFullYear() === checkDate.getFullYear();
        });
        const tasksForDay = tasks.filter(t => {
             const tDate = new Date(t.date);
             return tDate.getDate() === checkDate.getDate() && tDate.getMonth() === checkDate.getMonth() && tDate.getFullYear() === checkDate.getFullYear();
        });
        return { harvests, tasksForDay };
    };

    const allHarvests = [...crops].sort((a, b) => new Date(a.harvestDate) - new Date(b.harvestDate));
    const selectedDetails = selectedCalendarDate ? getItemsForDate(selectedCalendarDate) : { harvests: allHarvests, tasksForDay: [] };
    const displayList = selectedCalendarDate ? selectedDetails.harvests : allHarvests;

    // Calculate monthly potential
    const currentMonthRevenue = allHarvests
        .filter(h => new Date(h.harvestDate).getMonth() === calendarDate.getMonth())
        .reduce((acc, h) => acc + (h.yield * h.price), 0);

    // --- MODAL FOR HARVEST DETAILS (ON LIST CLICK) ---
    const HarvestDetailModal = ({ crop, onClose }) => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in zoom-in-95 duration-200" onClick={onClose}>
            <div className="bg-white w-full max-w-xs rounded-[2rem] p-6 shadow-2xl relative animate-slide-up" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={16}/></button>
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-5xl mb-4 shadow-inner border border-green-100">
                        {CROP_TYPES[crop.name]?.icon || '🌱'}
                    </div>
                    <h2 className="text-xl font-black text-gray-900">{t(crop.name) || crop.name}</h2>
                    {/* ✨ NEW COUNTDOWN DISPLAY IN MODAL */}
                    <div className="text-sm font-medium mt-1 bg-green-50 px-3 py-1 rounded-full text-green-700">{getDaysUntilHarvest(crop.harvestDate)}</div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-dashed border-gray-100 pb-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">{t('crop_location')}</span>
                        <span className="text-sm font-bold text-gray-900">{crop.location || 'Main Field'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-dashed border-gray-100 pb-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">{t('total_yield')}</span>
                        <span className="text-sm font-bold text-gray-900">{crop.yield} kg</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-dashed border-gray-100 pb-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">{t('market_price')}</span>
                        <span className="text-sm font-bold text-gray-900">RM {crop.price}/kg</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                        <span className="text-xs font-bold text-gray-400 uppercase">{t('est_revenue')}</span>
                        <span className="text-xl font-black text-green-600">RM {(crop.yield * crop.price).toLocaleString()}</span>
                    </div>
                </div>
                
                <button onClick={onClose} className="w-full bg-black text-white py-3 rounded-xl font-bold mt-6 hover:scale-105 transition-transform">Close</button>
            </div>
        </div>
    );

    return (
    <div className="pb-32 pt-6 animate-entry">
      {/* HARVEST DETAIL POPUP */}
      {showHarvestDetails && <HarvestDetailModal crop={showHarvestDetails} onClose={() => setShowHarvestDetails(null)} />}

      <div className="flex justify-between items-center mb-6 px-2">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('harvest')}</h1>
          </div>
          {/* Mini Monthly Stat */}
          <div className="bg-green-50 px-4 py-2 rounded-2xl border border-green-100 flex flex-col items-end">
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">{t('monthly_forecast')}</span>
              <span className="text-lg font-black text-green-800">RM {currentMonthRevenue.toLocaleString()}</span>
          </div>
      </div>
      
      {/* --- CALENDAR SECTION --- */}
      <div className="ios-card p-8 rounded-[2.5rem] shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))} className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100"><ChevronLeft size={20}/></button>
                <h3 className="font-bold text-gray-900 text-xl text-center">{calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))} className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100"><ChevronRight size={20}/></button>
            </div>
            
            <div className="grid grid-cols-7 gap-3 text-center text-xs font-bold text-gray-300 mb-4 uppercase tracking-widest">{['S','M','T','W','T','F','S'].map((d,i)=><div key={i}>{d}</div>)}</div>
            <div className="grid grid-cols-7 gap-3 text-sm font-bold text-gray-700">
                {[...Array(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay())].map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
                
                {[...Array(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate())].map((_, i) => { 
                    const day = i + 1; 
                    const currentDayDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
                    const isToday = day === new Date().getDate() && calendarDate.getMonth() === new Date().getMonth() && calendarDate.getFullYear() === new Date().getFullYear();
                    const isSelected = selectedCalendarDate && day === selectedCalendarDate.getDate() && calendarDate.getMonth() === selectedCalendarDate.getMonth();
                    const hasHarvest = crops.some(c => {
                        const hDate = new Date(c.harvestDate);
                        return hDate.getDate() === day && hDate.getMonth() === calendarDate.getMonth() && hDate.getFullYear() === calendarDate.getFullYear();
                    }); 
                    const hasTask = tasks.some(t => {
                        const tDate = new Date(t.date);
                        return tDate.getDate() === day && tDate.getMonth() === calendarDate.getMonth() && tDate.getFullYear() === calendarDate.getFullYear();
                    });

                    return (
                        <div 
                            key={day} 
                            onClick={() => {
                                if (isSelected) setSelectedCalendarDate(null); // Toggle off
                                else setSelectedCalendarDate(currentDayDate);
                            }}
                            className={`aspect-square flex flex-col items-center justify-center rounded-2xl transition-all cursor-pointer border relative
                                ${isSelected ? 'bg-black text-white shadow-xl scale-110 z-10' : isToday ? 'bg-blue-100 text-blue-700 border-blue-200' : 'hover:bg-gray-50 border-transparent'}
                            `}
                        >
                            {day}
                            <div className="flex gap-1 mt-1">
                                {hasHarvest && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-green-400' : 'bg-green-500'}`}></div>}
                                {hasTask && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-orange-400' : 'bg-orange-500'}`}></div>}
                            </div>
                        </div> 
                    );
                })}
            </div>
        </div>
        
        {/* --- LIST SECTION (ALL OR FILTERED) --- */}
        <div className="animate-slide-up delay-100">
            <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {selectedCalendarDate 
                        ? `${t('showing_date')} ${selectedCalendarDate.toLocaleDateString(undefined, {month:'short', day:'numeric'})}` 
                        : t('view_all')
                    }
                </h3>
                {selectedCalendarDate && (
                    <button onClick={() => setSelectedCalendarDate(null)} className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1"><RefreshCw size={10}/> Reset</button>
                )}
            </div>
            
            {displayList.length === 0 && (!selectedCalendarDate || selectedDetails.tasksForDay.length === 0) && (
                <div className="bg-white p-10 rounded-[2rem] border border-gray-100 text-center text-gray-400 text-sm flex flex-col items-center gap-3">
                    <Leaf size={32} className="opacity-20"/>
                    No upcoming harvests found.
                </div>
            )}

            <div className="space-y-3 pb-12">
                {/* --- HARVEST DETAIL CARD (Visible Directly) --- */}
                {displayList.map((h, i) => (
                    <div key={h.id} onClick={() => setShowHarvestDetails(h)} className={`ios-card p-5 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group animate-slide-up`} style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl border border-green-100">{CROP_TYPES[h.name]?.icon}</div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">{t(h.name)} Harvest</h4>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded-md text-gray-500">{new Date(h.harvestDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">{getDaysUntilHarvest(h.harvestDate)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Revenue</div>
                            <div className="text-sm font-black text-green-600">RM {(h.yield * h.price).toLocaleString()}</div>
                        </div>
                    </div>
                ))}
                
                {/* Show Tasks only if date selected */}
                {selectedCalendarDate && selectedDetails.tasksForDay.map(t => (
                    <div key={t.id} className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3 border border-orange-100 text-orange-800 animate-slide-up">
                        <span className="text-xl">📌</span> 
                        <div><span className="font-bold">Task:</span> {t.title}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )};

  const renderSettings = () => {
    return (
      <div className="pb-32 pt-6 animate-entry">
        <div className="mb-8 px-2"><h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('settings')}</h1></div>
        
        {/* EDITABLE PROFILE SECTION */}
        <div className="ios-card p-6 rounded-[2.5rem] shadow-sm mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center border-2 border-white shadow-sm"><User size={24} /></div>
                    <div>
                        <h2 className="font-bold text-lg text-gray-900">{userName}</h2>
                        <p className="text-xs text-gray-400">{userEmail}</p>
                    </div>
                </div>
                {!isEditingProfile && (
                    <button onClick={() => setIsEditingProfile(true)} className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl shadow-md active:scale-95 transition-transform">{t('edit_profile')}</button>
                )}
            </div>

            {isEditingProfile ? (
                <div className="space-y-4 animate-fade-in">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{t('name_label')}</label>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                            <input type="text" className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl text-sm font-bold text-gray-900 border-2 border-transparent focus:border-green-500 outline-none transition-all" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{t('email_label')}</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                            <input type="email" className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl text-sm font-medium text-gray-900 border-2 border-transparent focus:border-green-500 outline-none transition-all" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{t('farm_name')}</label>
                        <div className="relative">
                            <Briefcase size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                            <input type="text" className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl text-sm font-medium text-gray-900 border-2 border-transparent focus:border-green-500 outline-none transition-all" value={farmName} onChange={(e) => setFarmName(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{t('phone_number')}</label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                            <input type="text" className="w-full bg-gray-50 pl-9 pr-4 py-3 rounded-xl text-sm font-medium text-gray-900 border-2 border-transparent focus:border-green-500 outline-none transition-all" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 bg-white border-2 border-gray-100 text-gray-500 rounded-xl text-xs font-bold hover:bg-gray-50">{t('cancel')}</button>
                        <button onClick={handleSaveProfile} className="flex-1 py-3 bg-green-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-green-200 hover:bg-green-700">{t('save_profile')}</button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 pt-2 border-t border-dashed border-gray-200">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">{t('farm_name')}</span>
                        <span className="text-sm font-bold text-gray-800">{farmName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">{t('phone_number')}</span>
                        <span className="text-sm font-bold text-gray-800">{phone}</span>
                    </div>
                </div>
            )}
        </div>

        <div className="ios-card p-8 rounded-[2.5rem] shadow-sm mb-10">
            <h4 className="text-xs font-bold text-gray-400 mb-5 flex items-center gap-2 uppercase tracking-widest ml-1"><Globe size={14}/> {t('language')}</h4>
            <div className="flex gap-3">
                {['en', 'ms', 'zh'].map(l => (
                    <button key={l} onClick={() => setLang(l)} className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-all shadow-sm ${lang === l ? 'bg-black text-white shadow-xl scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'}`}>
                        {l === 'en' ? 'English' : l === 'ms' ? 'Melayu' : '中文'}
                    </button>
                ))}
            </div>
        </div>
        
        {/* DANGER ZONE AT BOTTOM */}
        <div className="space-y-3">
            <button onClick={handleResetData} className="w-full bg-red-50 text-red-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-100 transition-all shadow-sm"><RefreshCw size={18} /> {t('reset_data')}</button>
            <button onClick={handleLogout} className="w-full bg-white border-2 border-gray-100 text-gray-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm"><LogOut size={18} /> {t('logout')}</button>
        </div>
        
        <div className="text-center mt-12 text-xs font-medium text-gray-300 pb-10">Farm Manager v4.1 Pro</div>
      </div>
    );
  };

  return (
    <div 
      className="font-sans min-h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden text-gray-800 bg-[#FAFAFA]"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3200&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-[2px] z-0"></div>

      <div className="p-6 h-screen overflow-y-auto custom-scrollbar relative z-10 hide-scrollbar">
        <style dangerouslySetInnerHTML={{__html: styles}} />
        {activeTab === 'home' && renderHome()}
        {activeTab === 'crops' && renderCrops()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'growth' && renderGrowth()}
        {activeTab === 'harvest' && renderHarvest()}
        {activeTab === 'settings' && renderSettings()}
      </div>
      
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-white/40 shadow-[0_-5px_30px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between items-center px-6 py-4">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === 'home' ? 'text-green-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}><Home size={24} strokeWidth={activeTab === 'home' ? 3 : 2.5} /><span className="text-[10px] font-bold">{t('welcome').split(',')[0]}</span></button>
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