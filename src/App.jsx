import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Sprout, Bell, TrendingUp, Calendar, Settings, Plus, Droplets, 
  Scissors, Trash2, Check, Wind, CloudSun, CloudRain, ChevronRight, ChevronDown,
  ChevronLeft, User, LogOut, Leaf, Sun, Cloud, X, Clock, 
  Image as ImageIcon, Globe, Edit2, Lock, Mail, Tractor, MapPin, DollarSign, RefreshCw, Camera, CalendarDays, Phone, Briefcase, TrendingDown, Info, BarChart3, ArrowUpRight, Scale, Tag, UserCheck, Award, Search,
  AlertTriangle, Warehouse, Store, History, Layers, ArrowRight, Package, LayoutGrid
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
  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .animate-slide-up { animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-grow-width { animation: growWidth 1s ease-out forwards; }
  .animate-breathe { animation: breathe 3s ease-in-out infinite; }
  
  .delay-100 { animation-delay: 100ms; opacity: 0; animation-fill-mode: forwards; }
  .delay-200 { animation-delay: 200ms; opacity: 0; animation-fill-mode: forwards; }
  
  /* Premium Glass Effect */
  .premium-card {
    background: rgba(255, 255, 255, 0.98); 
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.05);
  }

  .dark-premium-card {
    background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
    color: white;
    box-shadow: 0 20px 40px -10px rgba(6, 78, 59, 0.4);
    border: 1px solid rgba(255,255,255,0.1);
  }

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
    good_morning: "Good Morning,",
    good_afternoon: "Good Afternoon,",
    good_evening: "Good Evening,",
    tasks: "Tasks",
    crops: "My Farm",
    growth: "Journal", 
    harvest: "Harvest",
    settings: "Settings",
    
    qa_water: "💧 Water All",
    qa_fert: "💊 Fertilize",
    qa_prune: "✂️ Prune",
    qa_harv: "🧺 Harvest",
    apply_all_crops: "Apply to all active crops?",
    select_crop_target: "Target Crop (Optional)",
    select_crop_placeholder: "General Farm Task",
    
    harvest_action: "Disposition",
    action_sell: "Sell Now",
    action_keep: "Store / Keep",
    stored_note: "Item is currently in storage.",
    sell_from_storage: "Sell from Storage",
    saved_value: "Inventory Value",
    
    all_crops: "All Crops",
    section_inventory: "📦 In Storage / Warehouse",
    section_sold: "💰 Sold History",
    
    active_crops: "Active Plantings",
    tasks_today: "Today's Agenda",
    today_tasks: "Priority Tasks",
    reminders: "Reminders",
    active: "Active",
    completed: "Done",
    add_note: "Add Entry",
    save: "Save Changes",
    profile: "Profile",
    language: "Language",
    logout: "Log Out",
    days_left: "Days Left",
    total_yield: "Exp. Yield",
    delete_confirm: "Delete this item?",
    water_advice: " AI Advice",
    water_ok: "Soil moisture optimal.",
    water_skip: "Rain expected. Skip watering.",
    water_more: "High heat alert. Water liberally.",
    custom_crop: "Custom Crop",
    enter_crop_name: "Crop Name",
    enter_days: "Days to Harvest",
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
    login_title: "My Farm",
    login_subtitle: "Premium Farm Management",
    login_btn: "Sign In",
    signup_btn: "Create Account",
    demo_hint: "Demo: Enter any details",
    add_task_btn: "Add Task",
    task_name_placeholder: "What needs to be done?",
    crop_notes: "Notes",
    reset_data: "Reset Demo Data",
    est_value: "Est. Revenue",
    currency: "RM",
    save_profile: "Save Profile",
    edit_profile: "Edit",
    cancel: "Cancel",
    farm_name: "Farm Name",
    phone_number: "Phone",
    total_revenue: "Total Revenue",
    crop_location: "Location",
    harvest_details: "Harvest Receipt",
    market_price: "Price (RM/kg)",
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
    complete_harvest: "Log Harvest",
    harvested_on: "Harvested On",
    actual_yield: "Actual Weight (kg)",
    monthly_report: "Monthly Report",
    search_crops: "Search crops, location...",
    variety: "Variety",
    grade: "Grade",
    sold_to: "Sold To / Buyer",
    items: "items",
    upload_photo: "Upload Photo",
    name_label: "Name",
    email_label: "Email",
    confirm_stage_title: "Update Stage?",
    confirm_stage_desc: "Move crop to",
    yes_update: "Update",
    no_cancel: "Cancel",
    other_variety: "Other Variety",
    enter_variety: "Enter variety name...",
    inventory_btn: "Warehouse",
    empty_inventory: "Warehouse is empty.",
    
    // Stages
    Seedling: "Seedling",
    Vegetative: "Vegetative",
    Flowering: "Flowering",
    Fruiting: "Fruiting",
    
    condition_cloudy: "Cloudy",
    condition_sunny: "Sunny",
    condition_rain: "Rainy",
  },
  ms: {
    welcome: "Selamat Kembali,", 
    good_morning: "Selamat Pagi,",
    good_afternoon: "Selamat Petang,",
    good_evening: "Selamat Malam,",
    tasks: "Tugasan",
    crops: "Tanaman",
    growth: "Jurnal", 
    harvest: "Tuai",
    settings: "Tetapan",
    
    qa_water: "💧 Siram Semua",
    qa_fert: "💊 Baja",
    qa_prune: "✂️ Cantas",
    qa_harv: "🧺 Tuai",
    apply_all_crops: "Guna untuk semua tanaman?",
    select_crop_target: "Pilih Tanaman (Pilihan)",
    select_crop_placeholder: "Tugasan Umum Ladang",
    
    harvest_action: "Tindakan",
    action_sell: "Jual Segera",
    action_keep: "Simpan / Stok",
    stored_note: "Item disimpan dalam inventori.",
    sell_from_storage: "Jual dari Simpanan",
    saved_value: "Nilai Inventori",
    
    all_crops: "Semua",
    section_inventory: "📦 Dalam Simpanan",
    section_sold: "💰 Sejarah Jualan",

    active_crops: "Tanaman Aktif",
    tasks_today: "Agenda Hari Ini",
    today_tasks: "Tugasan Utama",
    reminders: "Peringatan",
    active: "Aktif",
    completed: "Selesai",
    add_note: "Tambah Nota",
    save: "Simpan",
    profile: "Profil",
    language: "Bahasa",
    logout: "Log Keluar",
    days_left: "Hari Lagi",
    total_yield: "Jumlah Hasil",
    delete_confirm: "Padam item ini?",
    water_advice: "Nasihat AI",
    water_ok: "Kelembapan tanah baik.",
    water_skip: "Hujan dijangka! Jangan siram.",
    water_more: "Cuaca panas! Siram lebih.",
    custom_crop: "Lain-lain / Tersuai",
    enter_crop_name: "Nama Tanaman",
    enter_days: "Hari hingga Tuai",
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
    login_title: "Ladang Saya",
    login_subtitle: "Pengurusan Ladang Pintar",
    login_btn: "Log Masuk",
    signup_btn: "Daftar",
    demo_hint: "Demo: Masukkan sebarang butiran",
    add_task_btn: "Tambah",
    task_name_placeholder: "Apa perlu dibuat?",
    crop_notes: "Nota",
    reset_data: "Set Semula Data",
    est_value: "Nilai",
    currency: "RM",
    save_profile: "Simpan Profil",
    edit_profile: "Sunting",
    cancel: "Batal",
    farm_name: "Nama Ladang",
    phone_number: "Telefon",
    total_revenue: "Jumlah Pendapatan",
    crop_location: "Lokasi",
    harvest_details: "Resit Tuaian",
    market_price: "Harga Pasaran",
    est_revenue: "Anggaran Hasil",
    countdown_today: "Tuai Hari Ini!",
    countdown_future: "lagi",
    countdown_past: "Dituai",
    days: "hari",
    view_all: "Senarai Tuaian",
    showing_date: "Tuaian pada",
    monthly_forecast: "Bulan Ini",
    revenue_breakdown: "Perincian Hasil", 
    revenue_source: "Sumber",
    tab_upcoming: "Akan Datang",
    tab_history: "Sejarah",
    complete_harvest: "Selesai Tuai",
    harvested_on: "Dituai Pada",
    actual_yield: "Berat Sebenar (kg)",
    monthly_report: "Laporan Bulanan",
    search_crops: "Cari tanaman, lokasi...",
    variety: "Varieti",
    grade: "Gred",
    sold_to: "Pembeli",
    items: "item",
    upload_photo: "Muat Naik Foto",
    name_label: "Nama",
    email_label: "Emel",
    confirm_stage_title: "Kemaskini Peringkat?",
    confirm_stage_desc: "Tukar peringkat ke",
    yes_update: "Ya, Tukar",
    no_cancel: "Batal",
    other_variety: "Lain-lain",
    enter_variety: "Masukkan nama varieti...",
    inventory_btn: "Stok / Gudang",
    empty_inventory: "Tiada stok dalam gudang.",

    Seedling: "Anak Benih",
    Vegetative: "Vegetatif",
    Flowering: "Berbunga",
    Fruiting: "Berbuah",

    condition_cloudy: "Mendung",
    condition_sunny: "Panas",
    condition_rain: "Hujan",
  },
  zh: {
    welcome: "早上好，",
    good_morning: "早上好，",
    good_afternoon: "下午好，",
    good_evening: "晚上好，",
    tasks: "任务",
    crops: "我的农场",
    growth: "生长日记", 
    harvest: "收获管理",
    settings: "设置",
    
    qa_water: "💧 一键浇水",
    qa_fert: "💊 施肥",
    qa_prune: "✂️ 修剪",
    qa_harv: "🧺 收割",
    apply_all_crops: "应用到所有活跃作物？",
    select_crop_target: "指定作物 (可选)",
    select_crop_placeholder: "通用农场任务",
    
    harvest_action: "处理方式",
    action_sell: "直接出售",
    action_keep: "存入仓库",
    stored_note: "作物已存入农场仓库。",
    sell_from_storage: "库存出货 / 补录销售",
    saved_value: "库存价值",
    
    all_crops: "全部",
    section_inventory: "📦 仓库 / 库存 (未售)",
    section_sold: "💰 销售记录 (已售)",

    active_crops: "活跃作物",
    tasks_today: "今日待办",
    today_tasks: "重点任务",
    reminders: "提醒",
    active: "进行中",
    completed: "已完成",
    add_note: "添加记录",
    save: "保存",
    profile: "个人资料",
    language: "语言",
    logout: "登出",
    days_left: "剩余天数",
    total_yield: "总产量",
    delete_confirm: "确定删除？",
    water_advice: "智能建议",
    water_ok: "土壤湿度良好。",
    water_skip: "预计有雨！无需浇水。",
    water_more: "天气炎热！建议多浇水。",
    custom_crop: "其他 / 自定义",
    enter_crop_name: "作物名称",
    enter_days: "平均收获天数",
    select_crop_type: "选择作物",
    planting_date: "种植日期",
    current_stage: "当前阶段",
    add_new_crop: "添加新作物",
    edit_crop: "编辑信息",
    plant_crop_btn: "立即种植",
    update_crop_btn: "保存更改",
    write_note: "写下生长日记...",
    add_growth_note: "新记录",
    quick_add: "快速添加:",
    edit_task: "编辑任务",
    update: "更新",
    login_title: "农场管家",
    login_subtitle: "专业级农场管理系统",
    login_btn: "登录",
    signup_btn: "注册",
    demo_hint: "演示模式：输入任意信息",
    add_task_btn: "添加",
    task_name_placeholder: "需要做什么？",
    crop_notes: "备注（可选）",
    reset_data: "重置数据",
    est_value: "预估产值",
    currency: "RM",
    save_profile: "保存资料",
    edit_profile: "编辑",
    cancel: "取消",
    farm_name: "农场名称",
    phone_number: "电话",
    total_revenue: "预计总收入",
    crop_location: "地点",
    harvest_details: "收成详情单",
    market_price: "市场单价 (RM/kg)",
    est_revenue: "预计收入",
    countdown_today: "今天收成！",
    countdown_future: "还有",
    countdown_past: "已过",
    days: "天",
    view_all: "所有即将到来的收获",
    showing_date: "当日收获：",
    monthly_forecast: "本月预测",
    revenue_breakdown: "收入详情",
    revenue_source: "来源",
    tab_upcoming: "待收成",
    tab_history: "历史记录",
    complete_harvest: "确认收割",
    harvested_on: "收割日期",
    actual_yield: "实际重量 (kg)",
    monthly_report: "月度报表",
    search_crops: "搜索作物、地点、品种...",
    variety: "品种",
    grade: "等级",
    sold_to: "买家 / 批发商",
    items: "棵",
    upload_photo: "上传照片",
    name_label: "姓名",
    email_label: "邮箱",
    confirm_stage_title: "更新阶段",
    confirm_stage_desc: "确定更新作物阶段为",
    yes_update: "确认更新",
    no_cancel: "取消",
    other_variety: "其他品种",
    enter_variety: "输入品种名称...",
    inventory_btn: "仓库 / 库存",
    empty_inventory: "仓库目前是空的。",
    
    Seedling: "幼苗期",
    Vegetative: "生长期",
    Flowering: "开花期",
    Fruiting: "结果期",
    
    condition_cloudy: "多云",
    condition_sunny: "晴朗",
    condition_rain: "有雨",
  }
};

// --- CROP DATABASE ---
const CROP_TYPES = {
  'Durian': { minDays: 120, maxDays: 130, yield: 500, price: 40, icon: '🌳', varieties: ['Musang King', 'Black Thorn', 'D24', 'Red Prawn', 'IOI', 'Other'] }, 
  'Mango': { minDays: 95, maxDays: 105, yield: 300, price: 8, icon: '🥭', varieties: ['Harumanis', 'Chok Anan', 'Gold Lily', 'Other'] },
  'Watermelon': { minDays: 80, maxDays: 90, yield: 50, price: 3, icon: '🍉', varieties: ['Red Seedless', 'Yellow Flesh', 'Other'] },
  'Papaya': { minDays: 145, maxDays: 155, yield: 40, price: 4, icon: '🍈', varieties: ['Eksotika', 'Sekaki', 'Other'] },
  'Banana': { minDays: 260, maxDays: 280, yield: 25, price: 5, icon: '🍌', varieties: ['Berangan', 'Mas', 'Cavendish', 'Other'] },
  'Apple': { minDays: 115, maxDays: 125, yield: 60, price: 10, icon: '🍎' },
  'Orange': { minDays: 145, maxDays: 155, yield: 55, price: 9, icon: '🍊' },
  'Pineapple': { minDays: 290, maxDays: 310, yield: 2, price: 6, icon: '🍍', varieties: ['MD2', 'Morris', 'Other'] },
  'Strawberry': { minDays: 85, maxDays: 95, yield: 1, price: 25, icon: '🍓' }
};

// --- Initial Data ---
const getTodayStr = () => new Date().toISOString().split('T')[0];
const INITIAL_TASKS = [];

// --- COMPONENTS ---

const TaskCard = ({ task, onToggle, onDelete, onEdit, crops }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'water': return <Droplets size={20} className="text-blue-500" />;
      case 'prune': return <Scissors size={20} className="text-purple-500" />;
      case 'harvest': return <Leaf size={20} className="text-orange-500" />;
      case 'fertilize': return <Sprout size={20} className="text-emerald-500" />;
      default: return <Check size={20} className="text-gray-500" />;
    }
  };

  const linkedCrop = task.cropId && task.cropId !== 'ALL' ? crops.find(c => c.id == task.cropId) : null;
  const isAll = task.cropId === 'ALL';
  const isToday = task.date === new Date().toISOString().split('T')[0];
  const displayDate = isToday ? 'Today' : new Date(task.date).toLocaleDateString(undefined, {month:'short', day:'numeric'});

  return (
    <div className={`premium-card p-4 rounded-[20px] flex items-center justify-between mb-3 transition-all animate-slide-up ${task.completed ? 'opacity-50 grayscale' : 'hover:scale-[1.02]'}`}>
      <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => onEdit && onEdit(task)}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.completed ? 'bg-gray-100' : 'bg-green-50 border border-green-100 shadow-sm'}`}>
            {linkedCrop ? <span className="text-2xl">{CROP_TYPES[linkedCrop.name]?.icon || '🌱'}</span> : getIcon(task.type)}
        </div>
        <div>
            <h3 className={`font-bold text-gray-900 ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
            <div className="flex flex-col gap-0.5">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide flex items-center gap-1 mt-0.5">📍 {task.location}</p>
                {linkedCrop && <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">🔗 {linkedCrop.name} ({linkedCrop.variety || 'Standard'})</p>}
            </div>
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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('zh'); 
  
  // SAFE GUARD TRANSLATION FUNCTION
  const t = (key) => {
      const selectedLangObj = TRANSLATIONS[lang] || TRANSLATIONS['en']; // Fallback to English if lang is broken
      return selectedLangObj[key] || key;
  };
  
  // --- AUTH & SPLASH ---
  const [showSplash, setShowSplash] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); 
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- SETTINGS ---
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [farmName, setFarmName] = useState(localStorage.getItem('farm_name') || 'Green Valley Farm');
  const [phone, setPhone] = useState(localStorage.getItem('farm_phone') || '+60 12-345 6789');

  // --- WEATHER ---
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('Detecting...');

  // --- DATA ---
  const [tasks, setTasks] = useState(() => {
    try { const saved = localStorage.getItem('farm_tasks'); return saved ? JSON.parse(saved) : INITIAL_TASKS; } catch (e) { return INITIAL_TASKS; }
  });
  const [crops, setCrops] = useState(() => {
    try { const saved = localStorage.getItem('farm_crops'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; }
  });

  // --- INITIALIZATION ---
  useEffect(() => {
    const timer = setTimeout(() => { setShowSplash(false); }, 3000); 
    const savedLogin = localStorage.getItem('farm_loggedin');
    if (savedLogin === 'true') {
        setIsLoggedIn(true);
        setUserName(localStorage.getItem('farm_username') || 'Farmer'); 
        setUserEmail(localStorage.getItem('farm_email') || 'farmer@example.com');
    }
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const fetchWeather = (lat, lon) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`)
          .then(response => response.json())
          .then(data => { setWeather(data); })
          .catch(err => console.error("Weather error:", err));
        
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
          .then(res => res.json())
          .then(data => { setLocationName(data.city || data.locality || "My Farm"); })
          .catch(() => setLocationName("My Farm"));
    };

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => { fetchWeather(position.coords.latitude, position.coords.longitude); },
            (error) => { fetchWeather(2.9264, 101.6964); setLocationName("Putrajaya"); }
        );
    } else {
        fetchWeather(2.9264, 101.6964);
        setLocationName("Putrajaya");
    }
  }, []);

  const getWeatherInfo = (code) => {
      if (code === 0) return { icon: <Sun size={24}/>, key: 'condition_sunny' };
      if (code >= 1 && code <= 3) return { icon: <CloudSun size={24}/>, key: 'condition_cloudy' };
      if (code >= 51 && code <= 67) return { icon: <CloudRain size={24}/>, key: 'condition_rain' }; 
      if (code >= 95) return { icon: <Wind size={24}/>, key: 'condition_rain' }; 
      return { icon: <Cloud size={24}/>, key: 'condition_cloudy' }; 
  };
  
  useEffect(() => { localStorage.setItem('farm_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('farm_crops', JSON.stringify(crops)); }, [crops]);

  // --- STATE ---
  const [activeCropId, setActiveCropId] = useState(null);
  useEffect(() => { 
      // Reset view on tab change
      if (activeTab !== 'growth' && activeTab !== 'crops') {
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
  const [newTaskCropId, setNewTaskCropId] = useState(''); 
  const [isBulkTask, setIsBulkTask] = useState(false); 
  const [customSectionName, setCustomSectionName] = useState('');
  const [isCustomSection, setIsCustomSection] = useState(false);

  const [calendarDate, setCalendarDate] = useState(new Date()); 
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null); 
  const [showHarvestDetails, setShowHarvestDetails] = useState(null); 
  const [showRevenueDetails, setShowRevenueDetails] = useState(false);
  const [harvestTab, setHarvestTab] = useState('upcoming'); 
  const [showMonthlyReport, setShowMonthlyReport] = useState(false); 
  const [showInventory, setShowInventory] = useState(false); // NEW INVENTORY MODAL STATE
  const [cropSearchTerm, setCropSearchTerm] = useState(''); 

  const [showStageConfirm, setShowStageConfirm] = useState(false);
  const [pendingStage, setPendingStage] = useState(null);

  const [noteText, setNoteText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isCustomCrop, setIsCustomCrop] = useState(false);
  
  const [cropForm, setCropForm] = useState({ type: 'Durian', date: new Date().toISOString().split('T')[0], stage: 'Seedling', customName: '', customDays: 90, notes: '', location: '', variety: '', customVariety: '' });
  
  const today = new Date();
  const dateString = today.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'ms' ? 'ms-MY' : 'zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // --- HANDLERS ---
  const handleLogin = (e) => {
      e.preventDefault();
      // FIX: Changed 'userEmail' to 'userName' to match the form input
      if (userName && password) {
          setIsLoggedIn(true);
          localStorage.setItem('farm_loggedin', 'true');
          
          // Set default email if missing
          const emailToSave = userEmail || 'farmer@example.com';
          localStorage.setItem('farm_email', emailToSave);
          setUserEmail(emailToSave);

          setUserName(isSignUp ? userName : (localStorage.getItem('farm_username') || 'Farmer'));
          setActiveTab('home');
      }
  };

  const handleLogout = () => { setIsLoggedIn(false); localStorage.removeItem('farm_loggedin'); setPassword(''); setActiveTab('home'); };

  const handleSaveProfile = () => {
      localStorage.setItem('farm_username', userName);
      localStorage.setItem('farm_email', userEmail);
      localStorage.setItem('farm_name', farmName);
      localStorage.setItem('farm_phone', phone);
      setIsEditingProfile(false);
  };

  const handleResetData = () => {
    if(confirm('Reset all data?')) {
        setTasks(INITIAL_TASKS);
        setCrops([]);
        localStorage.clear();
        window.location.reload();
    }
  };

  const toggleTask = (id) => { setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)); };
  const deleteTask = (id) => { setTasks(tasks.filter(t => t.id !== id)); };
  const deleteCrop = (id) => { if (confirm(t('delete_confirm'))) { setCrops(crops.filter(c => c.id !== id)); } };
  const deleteGrowthLog = (cropId, logId) => { if (confirm(t('delete_confirm'))) { setCrops(crops.map(c => { if (c.id === cropId) { return { ...c, logs: c.logs.filter(l => l.id !== logId) }; } return c; })); } };

  const calculateHarvestDate = (plantedDate, cropName, customDays) => {
    const cropInfo = CROP_TYPES[cropName];
    let daysToAdd = customDays;
    if (cropInfo) {
        const avgDays = (cropInfo.minDays + cropInfo.maxDays) / 2;
        daysToAdd = avgDays;
        const currentTemp = weather?.current_weather?.temperature || 30;
        if (currentTemp > 32) daysToAdd -= 2; 
    }
    const date = new Date(plantedDate);
    date.setDate(date.getDate() + Math.round(daysToAdd));
    return date;
  };

  const getGreeting = () => {
     const hour = new Date().getHours();
     if (hour >= 5 && hour < 12) return t('good_morning');
     if (hour >= 12 && hour < 18) return t('good_afternoon');
     if (hour >= 18 || hour < 5) return t('good_evening');
     return "Welcome,";
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault(); 
    if (!newTaskName) return;
    const finalSection = isCustomSection ? customSectionName : newTaskSection;
    
    // --- BULK TASK LOGIC ---
    if (isBulkTask) {
        const activeCrops = crops.filter(c => c.status !== 'harvested');
        const batchTasks = activeCrops.map(c => ({
            id: Date.now() + Math.random(), 
            title: `${newTaskName}`, 
            location: c.location || finalSection, 
            time: newTaskTime, 
            date: newTaskDate, 
            type: 'general', 
            completed: false,
            cropId: c.id
        }));
        setTasks([...tasks, ...batchTasks]);
    } else {
        // Single Task
        const newTask = { 
            id: Date.now(), 
            title: newTaskName, 
            location: finalSection, 
            time: newTaskTime, 
            date: newTaskDate, 
            type: 'general', 
            completed: false,
            cropId: newTaskCropId 
        };
        if (editingTask) {
            setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...newTask, id: editingTask.id } : t));
            setEditingTask(null);
        } else {
            setTasks([...tasks, newTask]);
        }
    }
    
    setNewTaskName(''); setShowAddTask(false); setNewTaskCropId(''); setIsBulkTask(false);
  };

  const openEditTask = (task) => { 
      setEditingTask(task); 
      setNewTaskName(task.title); 
      setNewTaskSection(task.location); 
      setNewTaskTime(task.time); 
      setNewTaskDate(task.date); 
      setNewTaskCropId(task.cropId || '');
      setShowAddTask(true); 
  };
  
  const addQuickTask = (text) => { setNewTaskName(text); };

  const handleCropSubmit = (e) => {
    e.preventDefault();
    let name = isCustomCrop ? (cropForm.customName || "Custom") : cropForm.type;
    let days = isCustomCrop ? (parseInt(cropForm.customDays) || 90) : (CROP_TYPES[cropForm.type]?.maxDays || 90);
    const cropInfo = CROP_TYPES[name] || { yield: 100, price: 5, icon: '🌱' };
    const harvestDate = calculateHarvestDate(cropForm.date, name, days);

    // Variety Logic
    let finalVariety = cropForm.variety;
    if (cropForm.variety === 'Other') {
        finalVariety = cropForm.customVariety || 'Other';
    }

    const newCrop = { 
        id: Date.now(), 
        name: name, 
        plantedDate: cropForm.date, 
        harvestDate: harvestDate.toDateString(), 
        harvestIso: harvestDate.toISOString(), 
        stage: cropForm.stage, 
        daysToMaturity: days, 
        yield: cropInfo.yield, 
        price: cropInfo.price,
        location: cropForm.location,
        variety: finalVariety, 
        status: 'active',
        actualYield: 0, 
        grade: '', 
        buyer: '', 
        logs: [],
        description: cropForm.notes,
        isStored: false
    };

    if (editingCrop) {
        setCrops(crops.map(c => c.id === editingCrop.id ? { ...newCrop, id: editingCrop.id, logs: c.logs } : c));
        setEditingCrop(null);
    } else {
        setCrops([...crops, newCrop]);
    }
    setShowAddCrop(false); setCropForm({ ...cropForm, customName: '', notes: '', location: '', variety: '', customVariety: '' });
  };

  const openEditCrop = (crop) => {
      setEditingCrop(crop);
      setIsCustomCrop(!CROP_TYPES[crop.name]);
      const cropTypeInfo = CROP_TYPES[crop.name];
      let varietyVal = crop.variety || '';
      let customVarietyVal = '';
      
      // Logic to check if variety is in the standard list or custom/Other
      if (cropTypeInfo && cropTypeInfo.varieties) {
          if (!cropTypeInfo.varieties.includes(crop.variety) && crop.variety !== '') {
             varietyVal = 'Other';
             customVarietyVal = crop.variety;
          } else if (crop.variety === 'Other') {
              varietyVal = 'Other';
              customVarietyVal = '';
          }
      }

      setCropForm({ 
          ...cropForm, 
          type: crop.name, 
          date: crop.plantedDate, 
          stage: crop.stage, 
          location: crop.location || '', 
          notes: crop.description || '',
          variety: varietyVal,
          customVariety: customVarietyVal
      });
      setShowAddCrop(true);
  };

  const handleImageSelect = (e, setImgState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImgState(e.target.result); 
      reader.readAsDataURL(file);
    }
  };

  const addGrowthLog = (e) => {
    e.preventDefault();
    if(!noteText && !selectedImage) return;
    const newLog = { id: Date.now(), date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), text: noteText, image: selectedImage };
    setCrops(crops.map(c => c.id === activeCropId ? { ...c, logs: [newLog, ...(c.logs || [])] } : c));
    setNoteText(''); setSelectedImage(null); setShowAddLog(false);
  };

  const confirmStageChange = (newStage) => { setPendingStage(newStage); setShowStageConfirm(true); };
  const updateCropStage = (newStage) => { 
      setCrops(crops.map(c => c.id === activeCropId ? { ...c, stage: newStage } : c)); 
      setShowStageConfirm(false);
  };
  
  const getDaysLeft = (d) => Math.ceil((new Date(d) - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));

  // --- SPLASH SCREEN ---
  if (showSplash) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans bg-black">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3200&auto=format&fit=crop')" }}></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-green-950 via-green-900/60 to-black/30 animate-pulse"></div>
          <div className="relative z-10 text-center animate-slide-up">
              <div className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 shadow-2xl border border-white/20 ring-4 ring-green-400/20 animate-breathe">
                  <Sprout size={56} className="text-white drop-shadow-md" />
              </div>
              <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-lg mb-3">Farm Manager</h1>
              <p className="text-green-100/80 font-bold text-lg tracking-wide">Cultivating Excellence.</p>
          </div>
        </div>
      )
  }

  // --- RENDER LOGIN SCREEN ---
  if (!isLoggedIn) {
      return (
          <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3200&auto=format&fit=crop')" }}>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
              <div className="premium-card p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm relative z-10 animate-slide-up border border-white/50">
                  <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner transform -rotate-6">
                      <Tractor size={40} className="text-green-600" />
                  </div>
                  <h1 className="text-3xl font-black text-center text-gray-900 mb-1 tracking-tight">{t('login_title')}</h1>
                  <p className="text-center text-gray-500 mb-8 text-sm font-medium">{t('login_subtitle')}</p>
                  <form onSubmit={handleLogin} className="space-y-4">
                      <input type="text" required className="w-full bg-gray-50/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder-gray-300" placeholder="Farmer John" value={userName} onChange={(e) => setUserName(e.target.value)} />
                      <input type="password" required className="w-full bg-gray-50/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder-gray-300" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4">
                          {isSignUp ? t('signup_btn') : t('login_btn')}
                      </button>
                  </form>
              </div>
          </div>
      )
  }

  // --- REVENUE MODAL (Breakdown) ---
  const RevenueDetailModal = ({ crops, onClose }) => {
    const total = crops.reduce((acc, c) => acc + ((c.status==='harvested' && !c.isStored ? (c.actualYield || 0) : (c.yield || 0)) * (c.price || 0)), 0);
    // Sort by date: Newest harvest on top
    const sortedCrops = [...crops].filter(c => c.status === 'harvested' && !c.isStored).sort((a,b) => new Date(b.harvestedDate) - new Date(a.harvestedDate));

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center z-[100] p-4 animate-slide-up" onClick={onClose}>
            <div className="bg-white/95 w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl relative animate-slide-up" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={16}/></button>
                <h2 className="text-2xl font-black text-gray-900 mb-1">{t('revenue_breakdown')}</h2>
                <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">{t('total_revenue')}</p>
                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-2xl font-bold text-green-600">RM</span>
                    <span className="text-6xl font-black text-green-800 tracking-tight">{total.toLocaleString()}</span>
                </div>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    {sortedCrops.length > 0 ? sortedCrops.map((crop, i) => {
                        const val = (crop.actualYield||0) * (crop.price||0);
                        return (
                            <div key={crop.id} className="premium-card p-4 rounded-3xl mb-2 animate-slide-up border-l-4 border-l-green-500 shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-lg">{CROP_TYPES[crop.name]?.icon}</div>
                                        <div>
                                            <span className="block text-sm font-bold text-gray-900">{t(crop.name)}</span>
                                            <span className="block text-xs text-gray-400">{crop.variety || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-sm font-black text-green-700">RM {val.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-gray-500 font-medium bg-gray-50 px-3 py-1.5 rounded-lg">
                                    <span>📅 {new Date(crop.harvestedDate).toLocaleDateString()}</span>
                                    <span>⚖️ {crop.actualYield}kg @ RM{crop.price}</span>
                                </div>
                            </div>
                        )
                    }) : <div className="text-center text-gray-400 py-4">No revenue data yet.</div>}
                </div>
            </div>
        </div>
    )
  };

  // --- MONTHLY REPORT MODAL ---
  const MonthlyReportModal = ({ onClose }) => {
     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
     const filteredHarvests = crops.filter(c => {
         if (c.status !== 'harvested') return false;
         const d = new Date(c.harvestedDate);
         return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
     });
     const totalRevenue = filteredHarvests.reduce((acc, c) => acc + (c.isStored ? 0 : ((c.actualYield || 0) * (c.price || 0))), 0);
     const totalStoredValue = filteredHarvests.reduce((acc, c) => acc + (c.isStored ? ((c.actualYield || 0) * (c.price || 0)) : 0), 0);
     const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

     return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl relative animate-slide-up max-h-[90vh] overflow-y-auto hide-scrollbar" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={16}/></button>
                <h2 className="text-2xl font-black text-gray-900 mb-6">{t('monthly_report')}</h2>
                <div className="flex gap-2 mb-6">
                    <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} className="bg-gray-100 font-bold text-sm rounded-xl px-3 py-2 outline-none">{[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}</select>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} className="bg-gray-100 font-bold text-sm rounded-xl px-3 py-2 outline-none flex-1">{months.map((m, i) => <option key={i} value={i}>{m}</option>)}</select>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-green-50 p-4 rounded-2xl border border-green-100"><span className="text-[10px] uppercase font-bold text-green-600 block mb-1">Revenue</span><span className="text-xl font-black text-green-800 block">RM {totalRevenue.toLocaleString()}</span></div>
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100"><span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">Stored</span><span className="text-xl font-black text-blue-800 block">RM {totalStoredValue.toLocaleString()}</span></div>
                </div>
                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">History</h4>
                    {filteredHarvests.length > 0 ? filteredHarvests.map(c => (
                        <div key={c.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100">
                            <div className="flex items-center gap-3"><span className="text-xl">{CROP_TYPES[c.name]?.icon}</span><div><span className="font-bold text-gray-800 text-sm block">{c.name} ({c.variety || '-'})</span><span className="text-[10px] text-gray-500 block">{new Date(c.harvestedDate).toLocaleDateString()} • {c.actualYield}kg</span></div></div>
                            <div className="text-right">{c.isStored ? <span className="text-xs font-bold text-blue-500 bg-blue-100 px-2 py-1 rounded-md">STORED</span> : <span className="font-black text-green-700 text-sm">RM {(c.actualYield * c.price).toLocaleString()}</span>}</div>
                        </div>
                    )) : <div className="text-center text-gray-400 py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">No records.</div>}
                </div>
            </div>
        </div>
     );
  };

  // --- INVENTORY / WAREHOUSE MODAL ---
  const InventoryModal = ({ onClose }) => {
      const storedItems = crops.filter(c => c.isStored);
      const totalStoredValue = storedItems.reduce((acc, c) => acc + ((c.actualYield || 0) * (c.price || 0)), 0);

      return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl relative animate-slide-up max-h-[90vh] overflow-y-auto hide-scrollbar" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={16}/></button>
                <div className="flex items-center gap-2 mb-2">
                    <Warehouse size={28} className="text-blue-600"/>
                    <h2 className="text-2xl font-black text-gray-900">{t('inventory_btn')}</h2>
                </div>
                <p className="text-gray-500 font-medium text-sm mb-6">Manage your harvested stock.</p>
                
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 mb-6 text-center">
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">{t('saved_value')}</p>
                    <p className="text-4xl font-black text-blue-800">RM {totalStoredValue.toLocaleString()}</p>
                </div>

                <div className="space-y-4">
                    {storedItems.length > 0 ? storedItems.map(c => (
                        <div key={c.id} onClick={() => { setShowHarvestDetails(c); onClose(); }} className="premium-card p-4 rounded-3xl shadow-sm border-l-4 border-l-blue-500 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg">{CROP_TYPES[c.name]?.icon}</div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{t(c.name)}</h4>
                                    <p className="text-xs text-gray-500">{c.actualYield}kg • RM{c.price}/kg</p>
                                </div>
                            </div>
                            <div className="bg-blue-100 text-blue-700 p-2 rounded-xl"><ArrowRight size={16}/></div>
                        </div>
                    )) : <div className="text-center text-gray-400 py-10 border-2 border-dashed border-gray-100 rounded-3xl">{t('empty_inventory')}</div>}
                </div>
            </div>
        </div>
      )
  };

  // --- REUSABLE CROP NAVIGATOR (FIXED STYLE) ---
  const CropNavigator = ({ onItemClick, searchTerm = '' }) => {
      const activeCropsList = crops.filter(c => c.status !== 'harvested');
      const categories = ['All', ...new Set(activeCropsList.map(c => c.name))];
      const [activeCategory, setActiveCategory] = useState('All');

      let filteredCrops = activeCategory === 'All' ? activeCropsList : activeCropsList.filter(c => c.name === activeCategory);

      if(searchTerm) {
          filteredCrops = filteredCrops.filter(c => 
             c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             (c.location && c.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
             (c.variety && c.variety.toLowerCase().includes(searchTerm.toLowerCase()))
          );
      }

      const groupedCrops = filteredCrops.reduce((acc, crop) => {
          const groupKey = activeCategory === 'All' ? crop.name : (crop.variety || 'Standard');
          if (!acc[groupKey]) acc[groupKey] = [];
          acc[groupKey].push(crop);
          return acc;
      }, {});

      if (activeCropsList.length === 0) return <div className="text-center py-20 opacity-50"><Sprout size={64} className="mx-auto text-gray-300 mb-4"/><p className="font-bold text-gray-400">No active crops.</p></div>;

      return (
          <div className="animate-slide-up">
              {/* --- Modern Pill Filter Bar (FIXED STYLE) --- */}
              {/* Changed from boxes to smooth pills with no border for inactive ones */}
              <div className="sticky top-0 bg-[#FAFAFA] z-10 py-3 -mx-2 px-2 overflow-x-auto hide-scrollbar flex gap-2 mb-2">
                  {categories.map(cat => {
                      const isActive = activeCategory === cat;
                      return (
                          <button 
                              key={cat} 
                              onClick={() => setActiveCategory(cat)}
                              // CHANGED: rounded-[1.2rem] instead of rounded-full to match crop cards style more closely but still be button-like
                              className={`flex items-center gap-2 px-5 py-3 rounded-[1.2rem] transition-all whitespace-nowrap shrink-0 font-bold text-xs shadow-sm
                                  ${isActive 
                                    ? 'bg-black text-white shadow-lg shadow-gray-300 scale-105 ring-2 ring-offset-2 ring-gray-900' 
                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                                  }`}
                          >
                              {cat !== 'All' && <span>{CROP_TYPES[cat]?.icon}</span>}
                              <span>{cat === 'All' ? t('all_crops') : t(cat)}</span>
                              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                  {cat === 'All' ? activeCropsList.length : activeCropsList.filter(c => c.name === cat).length}
                              </span>
                          </button>
                      )
                  })}
              </div>

              {/* --- Grouped Content --- */}
              <div className="space-y-6 pb-20 mt-2">
                  {Object.entries(groupedCrops).map(([groupTitle, cropList]) => (
                      <div key={groupTitle} className="animate-slide-up">
                          <div className="flex items-center gap-2 mb-3 px-1">
                              <span className="text-lg font-black text-gray-800">{activeCategory === 'All' ? t(groupTitle) : groupTitle}</span>
                              <div className="h-[1px] bg-gray-200 flex-1"></div>
                              <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{cropList.length} {t('items')}</span>
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                              {cropList.map(c => {
                                  const daysLeft = getDaysLeft(c.harvestIso || c.harvestDate);
                                  const progress = 100 - (daysLeft / c.daysToMaturity * 100);
                                  const clampedProgress = Math.max(0, Math.min(100, progress));

                                  return (
                                      <div key={c.id} onClick={() => onItemClick(c.id)} className="premium-card p-4 rounded-[2rem] shadow-sm active:scale-[0.98] transition-all cursor-pointer border border-white relative overflow-hidden group">
                                          <div className="absolute bottom-0 left-0 h-1.5 bg-green-500 transition-all duration-1000" style={{width: `${clampedProgress}%`}}></div>
                                          
                                          <div className="flex justify-between items-center relative z-10">
                                              <div className="flex items-center gap-4">
                                                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-gray-100">
                                                      {CROP_TYPES[c.name]?.icon || '🌱'}
                                                  </div>
                                                  <div>
                                                      <div className="flex items-center gap-2 mb-1">
                                                          <h4 className="font-bold text-gray-900 text-base">{t(c.stage)}</h4>
                                                          {activeCategory === 'All' && c.variety && (
                                                              <span className="bg-gray-100 text-gray-500 text-[9px] font-bold px-2 py-0.5 rounded-full">{c.variety}</span>
                                                          )}
                                                      </div>
                                                      <div className="flex flex-col">
                                                          <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
                                                              <MapPin size={10} className="text-green-600"/> {c.location || 'No Location'}
                                                          </span>
                                                          <span className="text-[10px] text-gray-300 font-medium mt-0.5">
                                                              Planted: {new Date(c.plantedDate).toLocaleDateString()}
                                                          </span>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="text-right bg-green-50 px-3 py-2 rounded-2xl min-w-[70px] flex flex-col items-center justify-center border border-green-100 group-hover:bg-green-100 transition-colors">
                                                  <span className="text-xl font-black text-green-700 leading-none">{daysLeft}</span>
                                                  <span className="text-[9px] font-bold text-green-800/60 uppercase">{t('days')}</span>
                                              </div>
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  // --- RENDER FUNCTIONS ---

  const renderHome = () => {
    const activeTasks = [...tasks].filter(t => !t.completed).sort((a,b)=> new Date(a.date)-new Date(b.date));
    let waterAdvice = t('water_ok');
    const temp = weather?.current_weather?.temperature || 29;
    if (temp > 32) waterAdvice = t('water_more');
    const totalRevenue = crops.reduce((acc, c) => acc + ((c.status==='harvested' && !c.isStored ? (c.actualYield || 0) : (c.yield || 0)) * (c.price || 0)), 0);

    return (
      <div className="space-y-6 pb-32 animate-slide-up">
        <style dangerouslySetInnerHTML={{__html: styles}} />
        {showRevenueDetails && <RevenueDetailModal crops={crops} onClose={() => setShowRevenueDetails(false)} />}
        
        <div className="flex justify-between items-center px-1 pt-4">
            <div>
                <p className="text-green-900 text-xs font-bold uppercase tracking-wider mb-0.5 opacity-80">{dateString}</p>
                <h1 key={activeTab + "welcome"} className="text-3xl font-black text-gray-900 tracking-tight animate-slide-up">{getGreeting()} <br/><span className="text-green-700">{userName}</span>.</h1>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-lg overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveTab('settings')}>
                <User size={24} className="text-green-800"/>
            </div>
        </div>
        
        <div className={`dark-premium-card rounded-[2.5rem] p-6 relative overflow-hidden transition-colors duration-500 animate-slide-up delay-100 bg-gradient-to-br from-emerald-700 to-teal-900 shadow-2xl`}>
            <div className="absolute top-0 right-0 p-6 opacity-20"><Sun size={80} className="text-white"/></div>
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <div className="text-6xl font-light tracking-tighter mb-1 text-white">{temp}°</div>
                    <div className="text-sm font-bold opacity-90 flex items-center gap-2 uppercase tracking-wide text-white">{getWeatherInfo(weather?.current_weather?.weathercode || 0).icon} {t(getWeatherInfo(weather?.current_weather?.weathercode || 0).key)}</div>
                </div>
                <div className="text-right flex flex-col items-end text-white">
                    <div className="text-sm font-bold opacity-80 flex items-center justify-end gap-1"><MapPin size={12}/>{locationName}</div>
                </div>
            </div>
            <div className={`mt-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3`}>
                <div className="bg-white/20 p-2 rounded-full"><Droplets size={18} className="text-white" /></div>
                <p className="text-xs font-bold leading-relaxed opacity-95 text-white">{waterAdvice}</p>
            </div>
        </div>

        <div onClick={() => setShowRevenueDetails(true)} className="bg-black text-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-200/50 flex items-center justify-between relative overflow-hidden group cursor-pointer animate-slide-up delay-200 active:scale-95 transition-transform" style={{ zIndex: 10, pointerEvents: 'auto' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-90"></div>
            <div className="relative z-10 pointer-events-none">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">{t('total_revenue')} <ArrowUpRight size={12}/></p>
                <h2 className="text-4xl font-black text-white flex items-start gap-1"><span className="text-lg mt-1 font-bold text-green-400">RM</span>{totalRevenue.toLocaleString()}</h2>
            </div>
            <div className="relative z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform pointer-events-none">
                <BarChart3 size={24} className="text-green-400"/>
            </div>
        </div>

        <div className="animate-slide-up delay-400">
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-xl font-bold text-gray-900">{t('today_tasks')}</h2>
            <button onClick={() => setActiveTab('tasks')} className="text-xs font-bold text-green-700 bg-green-100 px-4 py-2 rounded-full hover:bg-green-200 transition-colors">View All</button>
          </div>
          {activeTasks.slice(0, 2).map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditTask} crops={crops} />)}
          {activeTasks.length === 0 && <div className="p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] text-center text-gray-400 text-sm font-medium">✨ All caught up!</div>}
        </div>
      </div>
    );
  };

  const renderTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
    const activeTasks = sortedTasks.filter(t => !t.completed);
    const completedTasks = sortedTasks.filter(t => t.completed);
    const activeCrops = crops.filter(c => c.status !== 'harvested');

    return (
      <div className="pb-32 pt-6 animate-slide-up">
        <h1 className="text-4xl font-black text-gray-900 px-2 mb-8 tracking-tight">{t('reminders')}</h1>
        <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white/60 mb-8 sticky top-4 z-20">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{editingTask ? t('edit_task') : t('quick_add')}</h3>
               <button onClick={() => { setShowAddTask(!showAddTask); setEditingTask(null); setNewTaskName(''); setIsBulkTask(false); }} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${showAddTask ? 'bg-gray-200 text-gray-600' : 'bg-black text-white'}`}>{showAddTask ? <X size={20}/> : <Plus size={20}/>}</button>
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
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl">
                            <input type="checkbox" id="bulkTask" className="w-5 h-5 text-green-600 rounded-lg focus:ring-green-500" checked={isBulkTask} onChange={(e) => setIsBulkTask(e.target.checked)}/>
                            <label htmlFor="bulkTask" className="text-sm font-bold text-gray-700 cursor-pointer">{t('apply_all_crops')}</label>
                        </div>
                        {!isBulkTask && (
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 mb-1 block">{t('select_crop_target')}</label>
                                <select className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500 w-full" value={newTaskCropId} onChange={(e) => setNewTaskCropId(e.target.value)}>
                                    <option value="">{t('select_crop_placeholder')}</option>
                                    {activeCrops.map(c => (
                                        <option key={c.id} value={c.id}>{CROP_TYPES[c.name]?.icon} {c.name} ({c.variety}) - {c.location}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="flex gap-2">
                             <input type="date" className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500 w-1/2" value={newTaskDate} onChange={(e) => setNewTaskDate(e.target.value)} />
                             <input type="time" className="bg-gray-50 border-0 rounded-2xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500 w-1/2" value={newTaskTime} onChange={(e) => setNewTaskTime(e.target.value)} />
                        </div>
                        <button type="submit" className="bg-green-600 text-white px-6 rounded-2xl font-bold text-sm shadow-lg hover:bg-green-700 transition-colors py-4 shadow-green-500/30">{editingTask ? t('update') : t('add_task_btn')}</button>
                    </div>
                </form>
            )}
        </div>
        <div className="space-y-2">
            {activeTasks.length > 0 ? activeTasks.map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditTask} crops={crops} />) : <div className="text-center py-16 text-gray-400 font-medium opacity-60">No active tasks</div>}
        </div>
        {completedTasks.length > 0 && (
            <div className="mt-12 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">{t('completed')}</h3>
                <div className="space-y-2">
                  {completedTasks.map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} crops={crops} />)}
                </div>
            </div>
        )}
      </div>
    );
  };

  const renderCrops = () => {
    return (
    <div className="pb-32 pt-6 animate-slide-up">
      <div className="flex justify-between items-center mb-6 px-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('crops')}</h1>
        <button onClick={() => { setEditingCrop(null); setCropForm({ type: 'Durian', date: new Date().toISOString().split('T')[0], stage: 'Seedling', customName: '', customDays: 90, notes: '', location: '', variety: '', customVariety: '' }); setShowAddCrop(true); }} className="bg-green-600 text-white px-5 py-3 rounded-full text-sm font-bold shadow-xl shadow-green-500/30 flex items-center gap-2 hover:scale-105 transition-transform active:scale-95"><Plus size={18}/> {t('add_new_crop')}</button>
      </div>
      
      <div className="mb-6 mx-2 relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
          <input type="text" placeholder={t('search_crops')} className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 shadow-sm outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium" value={cropSearchTerm} onChange={(e) => setCropSearchTerm(e.target.value)} />
      </div>
      
      {showAddCrop && (
        <div className="fixed inset-0 bg-green-900/60 flex items-end sm:items-center justify-center z-50 p-4 backdrop-blur-md animate-fade-in">
          <form onSubmit={handleCropSubmit} className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center"><h3 className="font-bold text-2xl text-gray-900">{t('add_new_crop')}</h3><button type="button" onClick={() => setShowAddCrop(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"><X size={20}/></button></div>
            <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('select_crop_type')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-lg font-medium focus:ring-2 focus:ring-green-500 outline-none" value={isCustomCrop ? 'custom' : cropForm.type} onChange={(e) => { 
                  if (e.target.value === 'custom') { setIsCustomCrop(true); } 
                  else { setIsCustomCrop(false); setCropForm({...cropForm, type: e.target.value, variety: '', customVariety: ''}); } 
              }}>{Object.keys(CROP_TYPES).map(type => <option key={type} value={type}>{CROP_TYPES[type].icon} {t(type)}</option>)}<option value="custom">➕ {t('custom_crop')}</option></select></div>
              {isCustomCrop && (<div className="space-y-4 animate-in slide-in-from-top-4"><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_crop_name')}</label><input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.customName} onChange={(e) => setCropForm({...cropForm, customName: e.target.value})} placeholder="e.g. Dragonfruit" /></div><div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('enter_days')}</label><input type="number" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.customDays} onChange={(e) => setCropForm({...cropForm, customDays: e.target.value})} /></div></div>)}
              
              {/* Variety Selection Logic - Added Other Option */}
              {CROP_TYPES[cropForm.type]?.varieties && (
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('variety')}</label>
                    <select className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-lg font-medium focus:ring-2 focus:ring-green-500 outline-none mb-2" value={cropForm.variety} onChange={(e) => setCropForm({...cropForm, variety: e.target.value})}>
                        <option value="">Select Variety</option>
                        {CROP_TYPES[cropForm.type].varieties.map(v => <option key={v} value={v}>{v === 'Other' ? t('other_variety') : v}</option>)}
                    </select>
                    {cropForm.variety === 'Other' && (
                        <input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium animate-in slide-in-from-top-2" placeholder={t('enter_variety')} value={cropForm.customVariety} onChange={(e) => setCropForm({...cropForm, customVariety: e.target.value})} />
                    )}
                  </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('planting_date')}</label><input type="date" required className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium" value={cropForm.date} onChange={(e) => setCropForm({...cropForm, date: e.target.value})} /></div>
                  <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('current_stage')}</label><select className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium" value={cropForm.stage} onChange={(e) => setCropForm({...cropForm, stage: e.target.value})}><option value="Seedling">{t('Seedling')}</option><option value="Vegetative">{t('Vegetative')}</option><option value="Flowering">{t('Flowering')}</option><option value="Fruiting">{t('Fruiting')}</option></select></div>
              </div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('crop_location')}</label><input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium" value={cropForm.location} onChange={(e) => setCropForm({...cropForm, location: e.target.value})} placeholder="e.g. Section A, Row 4" /></div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('crop_notes')}</label><textarea className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 font-medium h-24 resize-none" value={cropForm.notes} onChange={(e) => setCropForm({...cropForm, notes: e.target.value})} placeholder="..." /></div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto"><button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all">{editingCrop ? t('update_crop_btn') : t('plant_crop_btn')}</button></div>
          </form>
        </div>
      )}

      {/* NEW NESTED NAVIGATION with Search Term passed */}
      <CropNavigator 
        onItemClick={(id) => {
            const crop = crops.find(c => c.id === id);
            openEditCrop(crop);
        }}
        searchTerm={cropSearchTerm} 
      />
    </div>
  )};

  const renderHarvest = () => {
    // 🌾 Harvest Countdown Logic
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
    const activeHarvests = displayList.filter(c => c.status !== 'harvested').sort((a,b) => new Date(a.harvestDate) - new Date(b.harvestDate)); // Ensure sort order
    
    // Split History into Stored vs Sold
    const historyHarvests = displayList.filter(c => c.status === 'harvested').sort((a,b) => new Date(b.harvestedDate) - new Date(a.harvestedDate));
    const storedItems = historyHarvests.filter(c => c.isStored);
    const soldItems = historyHarvests.filter(c => !c.isStored);
    
    const finalDisplayList = harvestTab === 'upcoming' ? activeHarvests : historyHarvests;
    const currentMonthRevenue = allHarvests
        .filter(h => new Date(h.harvestDate).getMonth() === calendarDate.getMonth())
        .reduce((acc, h) => acc + (h.isStored ? 0 : (h.status==='harvested' ? h.actualYield : h.yield) * h.price), 0);

    // --- MODAL FOR HARVEST DETAILS ---
    const HarvestDetailModal = ({ crop, onClose }) => {
        const [actualWeight, setActualWeight] = useState(crop.yield);
        const [marketPrice, setMarketPrice] = useState(crop.price);
        const [grade, setGrade] = useState(crop.grade || '');
        const [buyer, setBuyer] = useState(crop.buyer || '');
        const [harvestType, setHarvestType] = useState('sell'); 
        
        return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-in zoom-in-95 duration-200" onClick={onClose}>
            <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative animate-slide-up flex flex-col max-h-[90vh] overflow-y-auto hide-scrollbar" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={16}/></button>
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-5xl mb-4 shadow-inner border border-green-100">
                        {CROP_TYPES[crop.name]?.icon || '🌱'}
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">{t(crop.name) || crop.name}</h2>
                    {crop.variety && <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mt-2 uppercase tracking-wide">{crop.variety}</span>}
                    
                    {crop.status === 'harvested' ? (
                        <div className="text-sm font-medium mt-2 bg-gray-100 px-3 py-1 rounded-full text-gray-500 flex items-center gap-1">
                            <Check size={12}/> {t('harvested_on')} {new Date(crop.harvestDate).toLocaleDateString()}
                        </div>
                    ) : (
                        <div className="text-sm font-medium mt-2 bg-green-50 px-3 py-1 rounded-full text-green-700">{getDaysUntilHarvest(crop.harvestDate)}</div>
                    )}
                </div>
                
                <div className="space-y-4">
                    {(crop.status !== 'harvested' || crop.isStored) ? (
                        <>  
                            {crop.status !== 'harvested' && (
                                <div className="bg-gray-100 p-1.5 rounded-2xl flex mb-2">
                                    <button onClick={() => setHarvestType('sell')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 ${harvestType === 'sell' ? 'bg-white text-green-700 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>
                                        <DollarSign size={14}/> {t('action_sell')}
                                    </button>
                                    <button onClick={() => setHarvestType('store')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 ${harvestType === 'store' ? 'bg-white text-blue-700 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>
                                        <Warehouse size={14}/> {t('action_keep')}
                                    </button>
                                </div>
                            )}
                            
                            {crop.isStored && (
                                <div className="p-3 bg-blue-50 text-blue-700 font-bold rounded-xl text-center mb-2">{t('sell_from_storage')}</div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                                    <label className="block text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1">{t('actual_yield')}</label>
                                    <div className="flex items-center gap-1">
                                        <input type="number" className="bg-transparent font-black text-xl text-gray-900 w-full outline-none" value={actualWeight} onChange={(e) => setActualWeight(Number(e.target.value))} />
                                        <span className="text-xs font-bold text-gray-400">kg</span>
                                    </div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                    <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">{t('market_price')}</label>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-bold text-gray-400">RM</span>
                                        <input type="number" className="bg-transparent font-black text-xl text-gray-900 w-full outline-none" value={marketPrice} onChange={(e) => setMarketPrice(Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                            
                            {(harvestType === 'sell' || crop.isStored) && (
                                <div className="animate-fade-in space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">{t('grade')}</label>
                                        <div className="flex gap-2">
                                            {['A','B','C'].map(g => (
                                                <button key={g} onClick={() => setGrade(g)} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${grade === g ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400'}`}>{g}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">{t('sold_to')}</label>
                                        <input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-green-500" placeholder="e.g. Ah Seng Fruit Wholesaler" value={buyer} onChange={(e) => setBuyer(e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {harvestType === 'store' && !crop.isStored && (
                                <div className="p-4 bg-blue-50 text-blue-800 text-sm font-medium rounded-2xl flex items-center gap-2 animate-fade-in border border-blue-100">
                                    <Info size={18}/> {t('stored_note')}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-3">
                            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                                <span className="text-xs text-gray-400 font-bold uppercase">{t('grade')}</span>
                                <span className="text-sm font-bold text-gray-900">{crop.grade || '-'}</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                                <span className="text-xs text-gray-400 font-bold uppercase">{t('sold_to')}</span>
                                <span className="text-sm font-bold text-gray-900">{crop.buyer || '-'}</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                                <span className="text-xs text-gray-400 font-bold uppercase">{t('actual_yield')}</span>
                                <span className="text-sm font-bold text-gray-900">{crop.actualYield} kg</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xs text-gray-400 font-bold uppercase">{t('market_price')}</span>
                                <span className="text-sm font-bold text-gray-900">RM {crop.price}/kg</span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-2 px-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">{(harvestType === 'store' && !crop.isStored) || crop.isStored ? t('saved_value') : t('est_revenue')}</span>
                        <span className={`text-3xl font-black ${(harvestType === 'store' && !crop.isStored) || crop.isStored ? 'text-blue-600' : 'text-green-600'}`}>RM {((crop.status==='harvested'?crop.actualYield:actualWeight) * (crop.status==='harvested'?crop.price:marketPrice)).toLocaleString()}</span>
                    </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                      {(crop.status !== 'harvested' || crop.isStored) && (
                          <button onClick={() => { 
                             const updatedCrop = { 
                                 ...crop, 
                                 status: 'harvested', 
                                 harvestedDate: crop.harvestedDate || new Date().toISOString(), 
                                 actualYield: actualWeight, 
                                 price: marketPrice, 
                                 grade: grade, 
                                 buyer: buyer, 
                                 isStored: harvestType === 'store' && !crop.isStored 
                             };
                             if(crop.isStored) updatedCrop.isStored = false;
                             setCrops(crops.map(c => c.id === crop.id ? updatedCrop : c));
                             onClose(); 
                          }} className={`flex-1 text-white py-4 rounded-2xl font-bold shadow-lg transition-colors flex items-center justify-center gap-2 ${harvestType === 'store' && !crop.isStored ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-green-600 hover:bg-green-700 shadow-green-200'}`}>
                             {(harvestType === 'store' && !crop.isStored) ? <Warehouse size={20}/> : <Check size={20}/>} 
                             {(harvestType === 'store' && !crop.isStored) ? t('action_keep') : t('complete_harvest')}
                          </button>
                      )}
                      {crop.status === 'harvested' && !crop.isStored && <button onClick={onClose} className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-colors">Close Receipt</button>}
                </div>
            </div>
        </div>
    )};

    // --- SUB-COMPONENT FOR LIST ITEM ---
    const HarvestItem = ({ h }) => (
        <div onClick={() => setShowHarvestDetails(h)} className={`premium-card p-5 rounded-3xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-between group animate-slide-up ${harvestTab === 'history' ? (h.isStored ? 'border-l-4 border-l-blue-400' : 'border-l-4 border-l-gray-300') : 'border-l-4 border-l-green-500'}`}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shadow-sm ${harvestTab === 'history' ? 'bg-gray-100 border-gray-200' : 'bg-green-50 border-green-100'}`}>{CROP_TYPES[h.name]?.icon}</div>
                <div>
                    <h4 className="font-bold text-gray-900 text-lg">{t(h.name)} {h.variety && <span className="text-xs font-medium text-gray-400">({h.variety})</span>}</h4>
                    <div className="flex gap-2 mt-1">
                        <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded-md text-gray-500">{new Date(h.harvestDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                        {harvestTab === 'upcoming' && (<span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">{getDaysUntilHarvest(h.harvestDate)}</span>)}
                        {harvestTab === 'history' && (h.isStored ? <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md flex items-center gap-1"><Warehouse size={10}/> Stored</span> : <span className="text-xs font-bold text-white bg-black px-2 py-0.5 rounded-md flex items-center gap-1"><Check size={10}/> Sold</span>)}
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{h.isStored ? 'Value' : 'Revenue'}</div>
                <div className={`text-sm font-black ${harvestTab === 'history' ? (h.isStored ? 'text-blue-600' : 'text-gray-900') : 'text-green-600'}`}>RM {((h.status === 'harvested' ? h.actualYield : h.yield) * h.price).toLocaleString()}</div>
            </div>
        </div>
    );

    return (
    <div className="pb-32 pt-6 animate-slide-up">
      {showHarvestDetails && <HarvestDetailModal crop={showHarvestDetails} onClose={() => setShowHarvestDetails(null)} />}
      {showMonthlyReport && <MonthlyReportModal onClose={() => setShowMonthlyReport(false)} />}
      {showInventory && <InventoryModal onClose={() => setShowInventory(false)} />}

      <div className="flex justify-between items-center mb-6 px-2">
          <div><h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('harvest')}</h1></div>
          
          <div className="flex gap-2">
              {/* Store / Warehouse Button */}
              <div onClick={() => setShowInventory(true)} className="bg-blue-50 px-3 py-2 rounded-2xl border border-blue-100 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform hover:bg-blue-100 min-w-[50px]">
                  <Warehouse size={18} className="text-blue-600 mb-0.5"/>
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wide">Stock</span>
              </div>
              
              {/* Monthly Forecast Button */}
              <div onClick={() => setShowMonthlyReport(true)} className="bg-green-50 px-4 py-2 rounded-2xl border border-green-100 flex flex-col items-end cursor-pointer active:scale-95 transition-transform hover:bg-green-100">
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide flex items-center gap-1">{t('monthly_forecast')} <History size={10}/></span>
                  <span className="text-lg font-black text-green-800">RM {currentMonthRevenue.toLocaleString()}</span>
              </div>
          </div>
      </div>
      
      <div className="bg-gray-100 p-1.5 rounded-2xl flex mb-8 mx-1">
          <button onClick={() => { setHarvestTab('upcoming'); setSelectedCalendarDate(null); }} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${harvestTab === 'upcoming' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{t('tab_upcoming')}</button>
          <button onClick={() => { setHarvestTab('history'); setSelectedCalendarDate(null); }} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${harvestTab === 'history' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>{t('tab_history')}</button>
      </div>

      {harvestTab === 'upcoming' && (
      <div className="premium-card p-8 rounded-[2.5rem] shadow-sm mb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))} className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100"><ChevronLeft size={20}/></button>
                <h3 className="font-bold text-gray-900 text-xl text-center">{calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))} className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100"><ChevronRight size={20}/></button>
            </div>
            <div className="grid grid-cols-7 gap-3 text-center text-xs font-bold text-gray-300 mb-4 uppercase tracking-widest">{['S','M','T','W','T','F','S'].map((d,i)=><div key={i}>{d}</div>)}</div>
            <div className="grid grid-cols-7 gap-3 text-sm font-bold text-gray-700">
                {[...Array(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay())].map((_, i) => (<div key={`empty-${i}`} className="aspect-square"></div>))}
                {[...Array(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate())].map((_, i) => { 
                    const day = i + 1; 
                    const currentDayDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
                    const isToday = day === new Date().getDate() && calendarDate.getMonth() === new Date().getMonth() && calendarDate.getFullYear() === new Date().getFullYear();
                    const isSelected = selectedCalendarDate && day === selectedCalendarDate.getDate() && calendarDate.getMonth() === selectedCalendarDate.getMonth();
                    const hasHarvest = activeHarvests.some(c => {
                        const hDate = new Date(c.harvestDate);
                        return hDate.getDate() === day && hDate.getMonth() === calendarDate.getMonth() && hDate.getFullYear() === calendarDate.getFullYear();
                    }); 
                    return (
                        <div key={day} onClick={() => { if (isSelected) setSelectedCalendarDate(null); else setSelectedCalendarDate(currentDayDate); }} className={`aspect-square flex flex-col items-center justify-center rounded-2xl transition-all cursor-pointer border relative ${isSelected ? 'bg-black text-white shadow-xl scale-110 z-10' : isToday ? 'bg-blue-100 text-blue-700 border-blue-200' : 'hover:bg-gray-50 border-transparent'}`}>
                            {day}
                            <div className="flex gap-1 mt-1">{hasHarvest && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-green-400' : 'bg-green-500'}`}></div>}</div>
                        </div> 
                    );
                })}
            </div>
        </div>
        )}
        
        <div className="animate-slide-up delay-100">
            {harvestTab === 'upcoming' && (
                <div className="flex justify-between items-center mb-4 px-2">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{selectedCalendarDate ? `${t('showing_date')} ${selectedCalendarDate.toLocaleDateString(undefined, {month:'short', day:'numeric'})}` : t('view_all')}</h3>
                    {selectedCalendarDate && (<button onClick={() => setSelectedCalendarDate(null)} className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1"><RefreshCw size={10}/> Reset</button>)}
                </div>
            )}
            
            {/* LIST SECTION */}
            {finalDisplayList.length === 0 ? (
                <div className="bg-white/50 p-10 rounded-[2rem] border border-dashed border-gray-200 text-center text-gray-400 text-sm flex flex-col items-center gap-3"><Leaf size={32} className="opacity-20"/> No records found.</div>
            ) : (
                <div className="space-y-3 pb-12">
                    {/* IF HISTORY TAB: Separate Stored vs Sold */}
                    {harvestTab === 'history' ? (
                        <>
                            {storedItems.length > 0 && (
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 px-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t('section_inventory')}</h4>
                                    </div>
                                    {storedItems.map((h, i) => <HarvestItem key={h.id} h={h} />)}
                                </div>
                            )}
                            
                            {soldItems.length > 0 && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 px-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('section_sold')}</h4>
                                    </div>
                                    {soldItems.map((h, i) => <HarvestItem key={h.id} h={h} />)}
                                </div>
                            )}
                        </>
                    ) : (
                        // IF UPCOMING: Just List
                        finalDisplayList.map((h, i) => <HarvestItem key={h.id} h={h} />)
                    )}

                    {selectedCalendarDate && selectedDetails.tasksForDay.map(t => (
                        <div key={t.id} className="bg-orange-50 p-4 rounded-2xl flex items-center gap-3 border border-orange-100 text-orange-800 animate-slide-up shadow-sm">
                            <span className="text-xl">📌</span> 
                            <div><span className="font-bold">Task:</span> {t.title}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )};

  const renderGrowth = () => {
    const activeCrop = crops.find(c => c.id === activeCropId);

    return (
      <div className="pb-32 pt-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6 px-2">
           <h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('growth')}</h1>
           {activeCrop && (
             <button onClick={() => setActiveCropId(null)} className="text-xs font-bold text-gray-400 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">Back to List</button>
           )}
        </div>

        {showStageConfirm && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-fade-in">
                <div className="bg-white p-6 rounded-[2rem] shadow-2xl w-full max-w-sm text-center animate-slide-up">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600"><AlertTriangle size={32}/></div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{t('confirm_stage_title')}</h3>
                    <p className="text-gray-500 mb-6 font-medium">{t('confirm_stage_desc')} <span className="text-green-600 font-bold">"{t(pendingStage)}"</span>?</p>
                    <div className="flex gap-3">
                        <button onClick={() => setShowStageConfirm(false)} className="flex-1 py-3 bg-gray-100 font-bold rounded-xl text-gray-600">{t('no_cancel')}</button>
                        <button onClick={() => updateCropStage(pendingStage)} className="flex-1 py-3 bg-green-600 font-bold rounded-xl text-white shadow-lg shadow-green-200">{t('yes_update')}</button>
                    </div>
                </div>
            </div>
        )}

        {!activeCrop && (
          <CropNavigator 
            onItemClick={(id) => setActiveCropId(id)}
            searchTerm={cropSearchTerm} 
          />
        )}

        {activeCrop && (
          <div className="animate-slide-up">
              <div className="premium-card p-5 rounded-[2rem] shadow-sm mb-6 flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-3xl">{CROP_TYPES[activeCrop.name]?.icon || '🌱'}</div>
                  <div>
                      <h2 className="font-bold text-gray-900 text-lg">{t(activeCrop.name)}</h2>
                      <p className="text-xs text-gray-500">{activeCrop.variety} • {activeCrop.location}</p>
                  </div>
              </div>

              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm mb-6 overflow-x-auto hide-scrollbar">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Current Stage</h3>
                 <div className="flex items-center justify-between min-w-[300px] gap-2">
                    {['Seedling', 'Vegetative', 'Flowering', 'Fruiting'].map((s, i) => {
                       const isActive = activeCrop.stage === s;
                       const isPast = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting'].indexOf(activeCrop.stage) > i;
                       return (
                         <button key={s} onClick={() => confirmStageChange(s)} className={`flex-1 flex flex-col items-center gap-2 group`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isActive ? 'bg-green-600 border-green-600 text-white scale-110' : isPast ? 'bg-green-100 border-green-100 text-green-600' : 'border-gray-100 text-gray-300'}`}>
                               {isPast ? <Check size={14}/> : <div className="w-2 h-2 rounded-full bg-current"/>}
                            </div>
                            <span className={`text-[10px] font-bold ${isActive ? 'text-green-800' : 'text-gray-300'}`}>{t(s)}</span>
                         </button>
                       )
                    })}
                 </div>
              </div>

              <button onClick={() => setShowAddLog(true)} className="w-full bg-black text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl flex items-center justify-center gap-3 mb-8 hover:scale-[1.02] transition-transform">
                 <Camera size={24} /> {t('add_note')}
              </button>

              <div className="space-y-6 pl-4 border-l-2 border-gray-100 ml-4 relative">
                 {activeCrop.logs && activeCrop.logs.length > 0 ? activeCrop.logs.map((log, idx) => (
                   <div key={log.id} className="relative animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
                      <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm"></div>
                      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 group">
                         <div className="flex justify-between items-start mb-3">
                            <div><span className="text-xs font-black text-gray-900 block">{log.date}</span><span className="text-[10px] font-bold text-gray-400 uppercase">{log.time}</span></div>
                            <button onClick={() => deleteGrowthLog(activeCrop.id, log.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                         </div>
                         <p className="text-gray-700 font-medium text-sm leading-relaxed">{log.text}</p>
                         {log.image && (<div className="mt-3 rounded-2xl overflow-hidden shadow-md"><img src={log.image} alt="Log" className="w-full h-auto object-cover" /></div>)}
                      </div>
                   </div>
                 )) : <div className="text-gray-400 text-sm font-medium italic pl-4 py-4">No records yet. Start writing!</div>}
              </div>
          </div>
        )}

        {showAddLog && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
             <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-black text-xl text-gray-900">{t('add_growth_note')}</h3>
                   <button onClick={() => {setShowAddLog(false); setSelectedImage(null); setNoteText('');}} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={20}/></button>
                </div>
                <textarea className="w-full bg-gray-50 border-0 rounded-3xl p-5 h-32 text-gray-800 font-medium focus:ring-2 focus:ring-green-500 outline-none resize-none mb-4 text-lg" placeholder={t('write_note')} value={noteText} onChange={(e) => setNoteText(e.target.value)} />
                <div className="mb-6">
                   <label onClick={() => fileInputRef.current.click()} className="w-full h-32 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-green-300 transition-all">
                      {selectedImage ? (<img src={selectedImage} className="h-full w-full object-cover rounded-[1.4rem]" alt="Preview" />) : (<><ImageIcon size={32} className="mb-2"/><span className="text-xs font-bold uppercase tracking-wider">{t('upload_photo')}</span></>)}
                   </label>
                   <input type="file" ref={fileInputRef} onChange={(e) => handleImageSelect(e, setSelectedImage)} className="hidden" accept="image/*" />
                </div>
                <button onClick={addGrowthLog} className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-200 hover:scale-[1.02] transition-transform">{t('save')}</button>
             </div>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="pb-32 pt-6 animate-slide-up">
        <div className="mb-8 px-2"><h1 className="text-4xl font-black text-gray-900 tracking-tight">{t('settings')}</h1></div>
        
        <div className="premium-card p-6 rounded-[2.5rem] shadow-sm mb-6 border border-white/60">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white"><User size={30} /></div>
                    <div><h2 className="font-black text-xl text-gray-900 leading-tight">{userName}</h2><span className="inline-block bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-md mt-1">PRO MEMBER</span></div>
                </div>
                {!isEditingProfile && (<button onClick={() => setIsEditingProfile(true)} className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"><Edit2 size={18} /></button>)}
            </div>

            {isEditingProfile ? (
                <div className="space-y-4 animate-fade-in bg-gray-50/50 p-4 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-2">Edit Profile</p>
                    <div><label className="text-[10px] font-bold text-gray-400 uppercase ml-3 mb-1 block">{t('name_label')}</label><input type="text" className="w-full bg-white pl-4 pr-4 py-3 rounded-2xl text-sm font-bold text-gray-900 border border-gray-100 focus:ring-2 focus:ring-green-500 outline-none" value={userName} onChange={(e) => setUserName(e.target.value)} /></div>
                    <div><label className="text-[10px] font-bold text-gray-400 uppercase ml-3 mb-1 block">{t('email_label')}</label><input type="email" className="w-full bg-white pl-4 pr-4 py-3 rounded-2xl text-sm font-bold text-gray-900 border border-gray-100 focus:ring-2 focus:ring-green-500 outline-none" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} /></div>
                    <div><label className="text-[10px] font-bold text-gray-400 uppercase ml-3 mb-1 block">{t('farm_name')}</label><input type="text" className="w-full bg-white pl-4 pr-4 py-3 rounded-2xl text-sm font-bold text-gray-900 border border-gray-100 focus:ring-2 focus:ring-green-500 outline-none" value={farmName} onChange={(e) => setFarmName(e.target.value)} /></div>
                    <div><label className="text-[10px] font-bold text-gray-400 uppercase ml-3 mb-1 block">{t('phone_number')}</label><input type="text" className="w-full bg-white pl-4 pr-4 py-3 rounded-2xl text-sm font-bold text-gray-900 border border-gray-100 focus:ring-2 focus:ring-green-500 outline-none" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                    <div className="flex gap-2 pt-4">
                        <button onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 bg-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-300">{t('cancel')}</button>
                        <button onClick={handleSaveProfile} className="flex-1 py-3 bg-green-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-green-200">{t('save_profile')}</button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100"><span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">{t('farm_name')}</span><span className="text-sm font-bold text-gray-900 truncate block">{farmName}</span></div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100"><span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">{t('phone_number')}</span><span className="text-sm font-bold text-gray-900 truncate block">{phone}</span></div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3"><div className="bg-white p-2 rounded-full"><Mail size={16} className="text-gray-400"/></div><span className="text-sm font-bold text-gray-900 truncate">{userEmail || 'No email set'}</span></div>
                </div>
            )}
        </div>

        <div className="premium-card p-6 rounded-[2.5rem] shadow-sm mb-8">
            <h4 className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-widest ml-1"><Globe size={14}/> {t('language')}</h4>
            <div className="flex bg-gray-50 p-1.5 rounded-2xl">
                {['en', 'ms', 'zh'].map(l => (
                    <button key={l} onClick={() => setLang(l)} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${lang === l ? 'bg-white text-green-700 shadow-md transform scale-100' : 'text-gray-400 hover:text-gray-600'}`}>{l === 'en' ? 'ENG' : l === 'ms' ? 'BM' : '中文'}</button>
                ))}
            </div>
        </div>
        
        <div className="space-y-3 px-2">
            <button onClick={handleResetData} className="w-full bg-white border border-red-100 text-red-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all text-sm"><Trash2 size={16} /> {t('reset_data')}</button>
            <button onClick={handleLogout} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all text-sm shadow-lg"><LogOut size={16} /> {t('logout')}</button>
        </div>
        
        <div className="text-center mt-12 text-[10px] font-bold text-gray-300 pb-10 uppercase tracking-widest">Farm Manager Pro v4.6 <br/> Build 2024.12.16</div>
      </div>
    );
  };

  return (
    <div className="font-sans min-h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden text-gray-800 bg-[#FAFAFA]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3200&auto=format&fit=crop')" }}>
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
