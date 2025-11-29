import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Sprout, Bell, TrendingUp, Calendar, Settings, Plus, Droplets, 
  Scissors, Trash2, Check, Wind, CloudSun, CloudRain, ChevronRight, 
  User, Shield, LogOut, Leaf, Camera, Sun, Cloud, Moon, X, Clock, 
  Image as ImageIcon, Stethoscope, Activity, Globe, BookOpen, AlertTriangle, Edit2
} from 'lucide-react';

// --- TRANSLATIONS 🌍 ---
const TRANSLATIONS = {
  en: {
    welcome: "Welcome Back",
    tasks: "Tasks",
    crops: "Crops",
    growth: "Growth",
    harvest: "Harvest",
    settings: "Settings",
    active_crops: "Active Crops",
    tasks_today: "Tasks Today",
    today_tasks: "Today's Tasks",
    reminders: "Reminders",
    active: "Active",
    completed: "Completed",
    add_note: "Add Note",
    plant_doctor: "AI Plant Doctor",
    diagnose_desc: "Scan for diseases & pests",
    analyze: "Analyze Plant",
    upload_photo: "Upload Photo",
    save: "Save",
    profile: "Profile",
    language: "Language",
    logout: "Log Out",
    harvest_prediction: "Harvest Prediction",
    days_left: "Days Left",
    total_yield: "Total Yield",
    upcoming: "Upcoming",
    healthy: "Healthy",
    delete_confirm: "Are you sure you want to delete?",
    doc_result: "Diagnosis Result",
    treatment: "Recommended Treatment",
    pest_guide: "Pest & Disease Guide",
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
    analyzing: "Analyzing...",
    confidence: "Confidence",
    symptoms: "Symptoms Detected",
    prevention: "Prevention",
    write_note: "Write a note...",
    add_growth_note: "Add Growth Note",
    quick_add: "Quick Add:",
    edit_task: "Edit Task",
    update: "Update",
    username_placeholder: "Username",
    // AI DOCTOR RESULTS
    disease_rust_name: "Leaf Rust",
    disease_rust_treat: "Use Copper Fungicide. Remove infected leaves immediately.",
    disease_rust_symp: "Orange/brown spots on leaves.",
    disease_aphids_name: "Aphids Infestation",
    disease_aphids_treat: "Spray Neem Oil or soapy water every 3 days.",
    disease_aphids_symp: "Small green bugs under leaves, sticky residue.",
    disease_calcium_name: "Calcium Deficiency",
    disease_calcium_treat: "Add crushed eggshells or lime to soil.",
    disease_calcium_symp: "Curled or distorted new leaves.",
    disease_fungus_name: "Powdery Mildew",
    disease_fungus_treat: "Mix baking soda and water, spray on leaves.",
    disease_fungus_symp: "White powdery spots on leaves and stems."
  },
  ms: {
    welcome: "Selamat Kembali",
    tasks: "Tugasan",
    crops: "Tanaman",
    growth: "Tumbesaran",
    harvest: "Tuai",
    settings: "Tetapan",
    active_crops: "Tanaman Aktif",
    tasks_today: "Tugasan Hari Ini",
    today_tasks: "Tugasan Utama",
    reminders: "Peringatan",
    active: "Aktif",
    completed: "Selesai",
    add_note: "Tambah Nota",
    plant_doctor: "Doktor Tanaman AI",
    diagnose_desc: "Imbas penyakit & perosak",
    analyze: "Analisis Tanaman",
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
    doc_result: "Keputusan Diagnosis",
    treatment: "Rawatan Disyorkan",
    pest_guide: "Panduan Perosak",
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
    analyzing: "Menganalisis...",
    confidence: "Keyakinan",
    symptoms: "Gejala Dikesan",
    prevention: "Pencegahan",
    write_note: "Tulis nota...",
    add_growth_note: "Tambah Nota Tumbesaran",
    quick_add: "Tambah Cepat:",
    edit_task: "Edit Tugasan",
    update: "Kemaskini",
    username_placeholder: "Nama Pengguna",
    // AI DOCTOR RESULTS
    disease_rust_name: "Karat Daun",
    disease_rust_treat: "Gunakan Racun Kulat Kuprum. Buang daun yang dijangkiti.",
    disease_rust_symp: "Bintik oren/coklat pada daun.",
    disease_aphids_name: "Serangan Kutu Daun",
    disease_aphids_treat: "Sembur Minyak Nimba atau air sabun setiap 3 hari.",
    disease_aphids_symp: "Pepijat hijau kecil di bawah daun.",
    disease_calcium_name: "Kekurangan Kalsium",
    disease_calcium_treat: "Tambah kulit telur hancur atau kapur ke tanah.",
    disease_calcium_symp: "Daun baru bergulung atau herot.",
    disease_fungus_name: "Kulapuk Berdebu",
    disease_fungus_treat: "Campurkan soda penaik dan air, sembur pada daun.",
    disease_fungus_symp: "Bintik putih berdebu pada daun dan batang."
  },
  zh: {
    welcome: "欢迎回来",
    tasks: "任务",
    crops: "作物",
    growth: "生长",
    harvest: "收获",
    settings: "设置",
    active_crops: "活跃作物",
    tasks_today: "今日任务",
    today_tasks: "今日重点",
    reminders: "提醒",
    active: "进行中",
    completed: "已完成",
    add_note: "添加笔记",
    plant_doctor: "AI 植物医生",
    diagnose_desc: "扫描病虫害",
    analyze: "分析植物",
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
    doc_result: "诊断结果",
    treatment: "建议治疗",
    pest_guide: "病虫害指南",
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
    analyzing: "分析中...",
    confidence: "置信度",
    symptoms: "检测到的症状",
    prevention: "预防措施",
    write_note: "写笔记...",
    add_growth_note: "添加生长笔记",
    quick_add: "快速添加:",
    edit_task: "编辑任务",
    update: "更新",
    username_placeholder: "用户名",
    // AI DOCTOR RESULTS
    disease_rust_name: "叶锈病",
    disease_rust_treat: "使用铜杀菌剂。立即去除受感染的叶子。",
    disease_rust_symp: "叶子上有橙色/棕色斑点。",
    disease_aphids_name: "蚜虫侵扰",
    disease_aphids_treat: "每3天喷洒印楝油或肥皂水。",
    disease_aphids_symp: "叶子下有小绿虫，有粘性残留物。",
    disease_calcium_name: "缺钙",
    disease_calcium_treat: "向土壤中添加碎蛋壳或石灰。",
    disease_calcium_symp: "新叶卷曲或变形。",
    disease_fungus_name: "白粉病",
    disease_fungus_treat: "混合小苏打和水，喷洒在叶子上。",
    disease_fungus_symp: "叶子和茎上有白色粉状斑点。"
  }
};

// --- Initial Data ---
const INITIAL_TASKS = [
  { id: 1, title: 'Water Apple Trees', location: 'Section A', time: '09:00', type: 'water', completed: false },
  { id: 2, title: 'Prune Orange Trees', location: 'Section B', time: '11:00', type: 'prune', completed: false },
];

// --- CROP DATABASE (Chili Removed) ---
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

const PEST_DATA = [
  { name: "Aphids (Kutu Daun)", crop: "All", treat: "Spray Neem Oil or soapy water." },
  { name: "Fruit Fly (Lalat Buah)", crop: "Mango, Papaya", treat: "Wrap fruits with paper or plastic." },
  { name: "Stem Borer (Pengorek Batang)", crop: "Durian", treat: "Inject insecticide into hole & seal." },
  { name: "Mealybugs (Koya)", crop: "Papaya, Pineapple", treat: "Remove ants, spray white oil." }
];

const WEATHER_DATA = {
  temp: 33, condition: 'Hot & Sunny', high: 34, low: 26, location: 'Putrajaya', 
  hourly: [
    { time: 'Now', icon: <Sun size={16} />, temp: 33 },
    { time: '3 PM', icon: <CloudSun size={16} />, temp: 32 },
    { time: '4 PM', icon: <CloudSun size={16} />, temp: 31 },
    { time: '5 PM', icon: <Cloud size={16} />, temp: 30 },
    { time: '6 PM', icon: <Cloud size={16} />, temp: 29 },
  ],
  daily: [
    { day: 'Today', icon: <Sun size={14} />, low: 26, high: 34, rain: false },
    { day: 'Tue', icon: <CloudSun size={14} />, low: 25, high: 32, rain: false },
    { day: 'Wed', icon: <CloudRain size={14} />, low: 24, high: 30, rain: true },
    { day: 'Thu', icon: <CloudRain size={14} />, low: 24, high: 29, rain: true },
    { day: 'Fri', icon: <Cloud size={14} />, low: 25, high: 31, rain: false },
  ]
};

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'water': return <Droplets size={18} className="text-blue-500" />;
      case 'prune': return <Scissors size={18} className="text-purple-500" />;
      case 'harvest': return <Leaf size={18} className="text-orange-500" />;
      case 'fertilize': return <Sprout size={18} className="text-pink-500" />;
      default: return <Check size={18} className="text-green-500" />;
    }
  };
  return (
    <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50 flex items-center justify-between mb-3 transition-all hover:shadow-md hover:bg-white/70">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onEdit && onEdit(task)}>
        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">{getIcon(task.type)}</div>
        <div><h3 className={`font-bold text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h3><p className="text-xs text-green-600 flex items-center gap-1 font-medium">📍 {task.location}</p></div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {!task.completed && <span className="text-xs font-bold bg-green-100/80 text-green-800 px-3 py-1 rounded-full">{task.time}</span>}
        <div className="flex gap-2">
           {!task.completed && <button onClick={() => onToggle(task.id)} className="p-2 rounded-xl bg-white text-gray-400 hover:text-green-600 shadow-sm transition-colors"><Check size={18} /></button>}
           <button onClick={() => onDelete(task.id)} className="p-2 rounded-xl bg-white text-gray-400 hover:text-red-500 shadow-sm transition-colors"><Trash2 size={18} /></button>
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
  const USERNAME = t('username_placeholder'); // Dynamic Username

  // --- DATA ---
  const [tasks, setTasks] = useState(() => {
    try { const saved = localStorage.getItem('farm_tasks'); return saved ? JSON.parse(saved) : INITIAL_TASKS; } catch (e) { return INITIAL_TASKS; }
  });
  const [crops, setCrops] = useState(() => {
    try { const saved = localStorage.getItem('farm_crops'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; }
  });
  
  useEffect(() => { localStorage.setItem('farm_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { try { localStorage.setItem('farm_crops', JSON.stringify(crops)); } catch (e) { alert("Storage full! Delete old data."); } }, [crops]);

  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  
  // EDIT TASK STATE
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  
  const [showPestGuide, setShowPestGuide] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const [activeCropId, setActiveCropId] = useState(null);
  const [showDoctor, setShowDoctor] = useState(false);
  const [doctorAnalyzing, setDoctorAnalyzing] = useState(false);
  const [doctorResultKey, setDoctorResultKey] = useState(null); 

  const [noteText, setNoteText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const doctorInputRef = useRef(null);

  const [isCustomCrop, setIsCustomCrop] = useState(false);
  const [cropForm, setCropForm] = useState({ type: 'Durian', date: new Date().toISOString().split('T')[0], stage: 'Seedling', customName: '', customDays: 90 });
  
  const today = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'ms' ? 'ms-MY' : 'zh-CN', dateOptions);

  const toggleTask = (id) => { setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)); };
  const deleteTask = (id) => { setTasks(tasks.filter(t => t.id !== id)); };
  
  const deleteCrop = (id) => { if (confirm(t('delete_confirm'))) { setCrops(crops.filter(c => c.id !== id)); } };
  const deleteGrowthLog = (cropId, logId) => { if (confirm(t('delete_confirm'))) { setCrops(crops.map(c => { if (c.id === cropId) { return { ...c, logs: c.logs.filter(l => l.id !== logId) }; } return c; })); } };

  // --- ADD / EDIT TASK ---
  const handleTaskSubmit = (e) => {
    e.preventDefault(); 
    if (!newTaskName) return;

    if (editingTask) {
        // UPDATE EXISTING TASK
        setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, title: newTaskName } : t));
        setEditingTask(null);
    } else {
        // ADD NEW TASK
        let type = 'general';
        if (newTaskName.toLowerCase().includes('water')) type = 'water';
        if (newTaskName.toLowerCase().includes('prune')) type = 'prune';
        if (newTaskName.toLowerCase().includes('harvest')) type = 'harvest';
        if (newTaskName.toLowerCase().includes('fertilize')) type = 'fertilize';

        setTasks([...tasks, { id: Date.now(), title: newTaskName, location: 'New Section', time: 'Now', type: type, completed: false }]);
    }
    setNewTaskName(''); 
    setShowAddTask(false);
  };

  const openEditTask = (task) => {
      setEditingTask(task);
      setNewTaskName(task.title);
      setShowAddTask(true);
  };

  // --- QUICK SUGGESTIONS ---
  const addQuickTask = (text) => {
      setNewTaskName(text);
      // Automatically focus input or just set state
  };

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
      logs: [] 
    }]);
    setShowAddCrop(false);
    setIsCustomCrop(false);
    setCropForm({ ...cropForm, customName: '', customDays: 90 });
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
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
          setImgState(compressedDataUrl);
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

  const handleDoctorScan = (e) => {
    handleImageSelect(e, setSelectedImage);
    setDoctorAnalyzing(true);
    setDoctorResultKey(null);
    setTimeout(() => {
        setDoctorAnalyzing(false);
        const diseases = ['rust', 'aphids', 'calcium', 'fungus']; 
        setDoctorResultKey(diseases[Math.floor(Math.random() * diseases.length)]);
    }, 2000);
  };

  const getDaysLeft = (harvestDateString) => {
    const today = new Date();
    const harvest = new Date(harvestDateString);
    const diffTime = harvest - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const renderHome = () => {
    const activeTasks = tasks.filter(t => !t.completed);
    let waterAdvice = t('water_ok');
    let waterColor = "bg-blue-500/90";
    if (WEATHER_DATA.temp > 32) { waterAdvice = t('water_more'); waterColor = "bg-orange-500/90"; }
    if (WEATHER_DATA.daily[0].rain) { waterAdvice = t('water_skip'); waterColor = "bg-gray-500/90"; }

    return (
      <div className="space-y-6 pb-28">
        <div><h1 className="text-3xl font-extrabold text-emerald-900 tracking-tight">{t('welcome')} {USERNAME}!</h1><p className="text-emerald-700 font-medium opacity-80">{dateString}</p></div>
        <div className={`${waterColor} backdrop-blur-md text-white p-5 rounded-3xl shadow-lg flex items-center gap-4 animate-in slide-in-from-top-2 border border-white/20`}>
           <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"><Droplets size={24} className="animate-bounce" /></div>
           <div><h3 className="font-bold text-sm uppercase opacity-80 tracking-wider">{t('water_advice')}</h3><p className="font-semibold text-lg leading-tight">{waterAdvice}</p></div>
        </div>
        <div className="rounded-[2.5rem] p-6 text-white shadow-xl bg-gradient-to-br from-[#4fa8e6] to-[#2c7bb6] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex flex-col items-center mb-6 relative z-10">
            <h2 className="text-xl font-medium drop-shadow-sm flex items-center gap-2"><span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">Putrajaya</span></h2>
            <div className="text-7xl font-thin tracking-tighter drop-shadow-lg my-2">{WEATHER_DATA.temp}°</div>
            <div className="text-sm font-medium bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full">{WEATHER_DATA.condition}</div>
          </div>
          <div className="bg-black/10 backdrop-blur-lg rounded-3xl p-4 border border-white/10 mb-4">
             <div className="flex overflow-x-auto gap-6 pb-2 hide-scrollbar">
               {WEATHER_DATA.hourly.map((h, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 min-w-[3rem]"><span className="text-[10px] font-bold opacity-70 uppercase tracking-wide">{h.time}</span><div className="text-white drop-shadow-md">{h.icon}</div><span className="text-sm font-bold">{h.temp}°</span></div>
               ))}
             </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-100/50 backdrop-blur-md p-5 rounded-3xl border border-white/50 flex flex-col items-center justify-center text-center gap-2 hover:bg-emerald-100/80 transition-colors"><div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30"><Sprout size={24} /></div><div><div className="text-3xl font-black text-emerald-900">{crops.length}</div><div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">{t('active_crops')}</div></div></div>
          <div className="bg-orange-100/50 backdrop-blur-md p-5 rounded-3xl border border-white/50 flex flex-col items-center justify-center text-center gap-2 hover:bg-orange-100/80 transition-colors"><div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30"><Calendar size={24} /></div><div><div className="text-3xl font-black text-orange-900">{activeTasks.length}</div><div className="text-xs font-bold text-orange-700 uppercase tracking-wide">{t('tasks_today')}</div></div></div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-emerald-900 mb-4 px-2">{t('today_tasks')}</h2>
          {activeTasks.slice(0, 2).map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditTask} />)}
          {activeTasks.length === 0 && <div className="p-8 bg-white/50 border border-dashed border-emerald-200 rounded-3xl text-center text-emerald-600 font-medium">✨ All caught up! Great job.</div>}
        </div>
      </div>
    );
  };

  const renderTasks = () => {
    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);
    return (
      <div className="pb-28 pt-4">
        <div className="flex justify-between items-center mb-8 px-2"><div><h1 className="text-3xl font-extrabold text-emerald-900">{t('reminders')}</h1><p className="text-emerald-600 font-medium">{activeTasks.length} {t('active')}</p></div><button onClick={() => { setShowAddTask(!showAddTask); setEditingTask(null); setNewTaskName(''); }} className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-600/30 hover:scale-105 transition-transform"><Plus size={28} /></button></div>
        {showAddTask && (
          <form onSubmit={handleTaskSubmit} className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-white/50 mb-6 animate-in slide-in-from-top-4">
            <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">{editingTask ? t('edit_task') : t('quick_add')}</h3>
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2 hide-scrollbar">
               {['Water Plants', 'Fertilize', 'Pruning', 'Harvest'].map(s => (
                 <button type="button" onClick={() => addQuickTask(s)} key={s} className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap hover:bg-emerald-200">{s}</button>
               ))}
            </div>
            <div className="flex gap-3"><input type="text" placeholder="Task name..." className="flex-1 bg-gray-50 border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 text-lg" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} autoFocus /><button type="submit" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700">{editingTask ? t('update') : 'Add'}</button></div>
          </form>
        )}
        <h3 className="text-emerald-800 font-bold mb-4 px-2 uppercase tracking-wider text-sm opacity-70">{t('active')}</h3>
        {activeTasks.length > 0 ? activeTasks.map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditTask} />) : <div className="text-center py-12 text-gray-400">No active tasks</div>}
        <h3 className="text-emerald-800 font-bold mb-4 mt-8 px-2 uppercase tracking-wider text-sm opacity-70">{t('completed')}</h3>
        {completedTasks.length > 0 ? completedTasks.map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />) : <div className="text-center py-4 text-gray-400 text-sm">No history yet</div>}
      </div>
    );
  };

  const renderCrops = () => (
    <div className="pb-28 pt-4">
      <div className="flex justify-between items-center mb-8 px-2"><div><h1 className="text-3xl font-extrabold text-emerald-900">{t('crops')}</h1><p className="text-emerald-600 font-medium">{crops.length} {t('active')}</p></div><button onClick={() => setShowAddCrop(true)} className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-600/30 hover:scale-105 transition-transform"><Plus size={28} /></button></div>
      {showAddCrop && (
        <div className="fixed inset-0 bg-emerald-900/60 flex items-end sm:items-center justify-center z-50 p-4 backdrop-blur-sm">
          <form onSubmit={addCrop} className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"><h3 className="font-bold text-xl text-emerald-900">{t('add_new_crop')}</h3><button type="button" onClick={() => setShowAddCrop(false)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300"><X size={18}/></button></div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{t('select_crop_type')}</label>
                <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-emerald-500" value={isCustomCrop ? 'custom' : cropForm.type} onChange={(e) => { if (e.target.value === 'custom') { setIsCustomCrop(true); } else { setIsCustomCrop(false); setCropForm({...cropForm, type: e.target.value}); } }}>
                  {Object.keys(CROP_TYPES).map(type => <option key={type} value={type}>{CROP_TYPES[type].icon} {type}</option>)}
                  <option value="custom">➕ {t('custom_crop')}</option>
                </select>
                {!isCustomCrop && <p className="text-xs text-green-600 mt-1">🕒 Takes approx {CROP_TYPES[cropForm.type].days} days</p>}
              </div>
              {isCustomCrop && (<div className="space-y-4 animate-in slide-in-from-top-2"><div><label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{t('enter_crop_name')}</label><input type="text" className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" value={cropForm.customName} onChange={(e) => setCropForm({...cropForm, customName: e.target.value})} placeholder="e.g. Dragonfruit" /></div><div><label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{t('enter_days')}</label><input type="number" className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" value={cropForm.customDays} onChange={(e) => setCropForm({...cropForm, customDays: e.target.value})} /></div></div>)}
              <div><label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{t('planting_date')}</label><input type="date" required className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" value={cropForm.date} onChange={(e) => setCropForm({...cropForm, date: e.target.value})} /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{t('current_stage')}</label><select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500" value={cropForm.stage} onChange={(e) => setCropForm({...cropForm, stage: e.target.value})}><option value="Seedling">🌱 Seedling</option><option value="Vegetative">🌿 Vegetative</option><option value="Flowering">🌸 Flowering</option><option value="Fruiting">🍋 Fruiting</option></select></div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100"><button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-700 active:scale-95 transition-all">{t('plant_crop_btn')}</button></div>
          </form>
        </div>
      )}
      {crops.length === 0 ? (<div className="flex flex-col items-center justify-center h-[50vh] text-center opacity-60"><div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6"><Sprout size={48} className="text-emerald-400" /></div><p className="text-emerald-900 font-bold text-xl">No crops yet</p><p className="text-sm text-emerald-600">Start your farm journey!</p></div>) : (
        <div className="grid gap-4">{crops.map(crop => (
          <div key={crop.id} className="bg-white/70 backdrop-blur-md p-5 rounded-[2rem] shadow-sm border border-white/60 flex items-center justify-between hover:shadow-lg transition-all">
            <div className="flex items-center gap-4"><div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-gray-100">{CROP_TYPES[crop.name]?.icon || '🌱'}</div><div><h3 className="font-bold text-gray-800 text-lg">{crop.name}</h3><p className="text-xs text-gray-500 flex items-center gap-1 font-medium mt-1">📅 Harvest: {crop.harvestDate}</p></div></div>
            <div className="flex flex-col items-end gap-2"><div className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">{crop.stage}</div><button onClick={() => deleteCrop(crop.id)} className="p-2 rounded-full bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={18} /></button></div>
          </div>
        ))}</div>
      )}
    </div>
  );

  const renderGrowth = () => (
    <div className="pb-28 pt-4">
      <div className="mb-8 px-2"><h1 className="text-3xl font-extrabold text-emerald-900">{t('growth')}</h1><p className="text-emerald-600 font-medium">Track progress & notes</p></div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-5 text-white shadow-lg shadow-blue-500/20 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform h-32 border border-white/20" onClick={() => setShowDoctor(true)}>
           <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm"><Stethoscope size={20}/></div><div><h3 className="font-bold text-lg leading-tight">{t('plant_doctor')}</h3><p className="text-[10px] text-blue-100 leading-tight mt-1 opacity-80">{t('diagnose_desc')}</p></div>
        </div>
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-5 text-white shadow-lg shadow-orange-500/20 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform h-32 border border-white/20" onClick={() => setShowPestGuide(true)}>
           <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm"><BookOpen size={20}/></div><div><h3 className="font-bold text-lg leading-tight">{t('pest_guide')}</h3><p className="text-[10px] text-orange-100 leading-tight mt-1 opacity-80">Common pests & fixes</p></div>
        </div>
      </div>
      
      {showPestGuide && (
        <div className="fixed inset-0 bg-emerald-900/60 flex items-end sm:items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden h-[70vh] flex flex-col animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"><h3 className="font-bold text-xl text-orange-900">{t('pest_guide')}</h3><button onClick={() => setShowPestGuide(false)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300"><X size={18}/></button></div>
             <div className="p-4 overflow-y-auto flex-1 space-y-3">
                {PEST_DATA.map((pest, i) => (
                  <div key={i} className="border border-orange-100 rounded-2xl p-4 bg-orange-50/30 hover:bg-orange-50 transition-colors"><h4 className="font-bold text-orange-800 flex items-center gap-2 mb-1"><AlertTriangle size={18}/> {pest.name}</h4><p className="text-xs text-gray-500 mb-3 bg-white px-2 py-1 rounded-md inline-block border border-gray-100">Target: {pest.crop}</p><div className="bg-white p-3 rounded-xl text-sm text-gray-700 border border-orange-100 shadow-sm font-medium">💊 {pest.treat}</div></div>
                ))}
             </div>
          </div>
        </div>
      )}

      {showDoctor && (
        <div className="fixed inset-0 bg-emerald-900/60 flex items-end sm:items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"><h3 className="font-bold text-xl text-indigo-900">{t('plant_doctor')}</h3><button onClick={() => {setShowDoctor(false); setDoctorResultKey(null); setSelectedImage(null)}} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300"><X size={18}/></button></div>
             <div className="p-6 flex flex-col items-center text-center">
                {!selectedImage ? (
                   <div onClick={() => doctorInputRef.current.click()} className="w-full h-56 bg-gray-50 border-2 border-dashed border-indigo-200 rounded-3xl flex flex-col items-center justify-center text-indigo-400 cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-colors"><div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3"><Camera size={32} className="text-indigo-500"/></div><span className="text-base font-bold">{t('upload_photo')}</span></div>
                ) : (
                   <div className="w-full h-56 rounded-3xl overflow-hidden mb-6 border border-gray-200 relative shadow-inner"><img src={selectedImage} className="w-full h-full object-cover" />{doctorAnalyzing && <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm"><Activity className="animate-spin mb-3 w-10 h-10"/><span className="text-sm font-bold tracking-widest uppercase">{t('analyzing')}</span></div>}</div>
                )}
                <input type="file" ref={doctorInputRef} hidden accept="image/*" onChange={handleDoctorScan} />
                {doctorResultKey && (
                  <div className="mt-2 bg-indigo-50/80 p-5 rounded-3xl border border-indigo-100 text-left w-full animate-in fade-in slide-in-from-bottom-4">
                    <h4 className="font-bold text-indigo-900 text-xs uppercase tracking-wider mb-1">{t('doc_result')}</h4>
                    <p className="text-xl font-black text-red-500 mb-3 leading-tight">{t('disease_' + doctorResultKey + '_name')}</p>
                    <div className="bg-white/60 p-3 rounded-xl mb-3"><h4 className="font-bold text-indigo-900 text-[10px] uppercase tracking-wider mb-1">{t('symptoms')}</h4><p className="text-sm text-gray-600 italic">"{t('disease_' + doctorResultKey + '_symp')}"</p></div>
                    <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm"><h4 className="font-bold text-indigo-900 text-[10px] uppercase tracking-wider mb-1">{t('treatment')}</h4><p className="text-sm text-gray-800 font-bold">{t('disease_' + doctorResultKey + '_treat')}</p></div>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {activeCropId && (
        <div className="fixed inset-0 bg-emerald-900/60 flex items-end sm:items-center justify-center z-50 p-4 backdrop-blur-sm">
          <form onSubmit={addGrowthLog} className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"><h3 className="font-bold text-xl text-emerald-900">{t('add_growth_note')}</h3><button type="button" onClick={() => setActiveCropId(null)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300"><X size={18}/></button></div>
            <div className="p-6"><textarea placeholder={t('write_note')} className="w-full bg-gray-50 border-0 rounded-2xl px-4 py-3 h-32 focus:ring-2 focus:ring-emerald-500 resize-none text-base" value={noteText} onChange={(e) => setNoteText(e.target.value)} autoFocus></textarea>{selectedImage && (<div className="mt-4 relative rounded-2xl overflow-hidden h-40 w-full border border-gray-200 shadow-sm"><img src={selectedImage} alt="Preview" className="w-full h-full object-cover" /><button type="button" onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 backdrop-blur-md hover:bg-red-500 transition-colors"><X size={16}/></button></div>)}<input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => handleImageSelect(e, setSelectedImage)} /></div>
            <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex gap-3"><button type="button" onClick={() => fileInputRef.current.click()} className="flex-1 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm"><ImageIcon size={20}/> {t('upload_photo')}</button><button type="submit" className="flex-1 bg-emerald-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-emerald-700">{t('save')}</button></div>
          </form>
        </div>
      )}

      {crops.length === 0 ? (<div className="bg-white/50 border border-dashed border-emerald-200 p-8 rounded-[2rem] text-center"><p className="text-emerald-600/60 font-medium">No crops planted yet</p></div>) : (
        <div className="grid gap-6">{crops.map(crop => (
           <div key={crop.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4"><div><h3 className="font-bold text-emerald-900 text-xl">{crop.name}</h3><p className="text-xs text-gray-500 font-medium mt-1">{t('planting_date')}: {crop.plantedDate}</p></div><button onClick={() => setActiveCropId(crop.id)} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-100 transition-colors border border-emerald-100"><Plus size={16}/> {t('add_note')}</button></div>
             <div className="space-y-6 pl-2 border-l-2 border-emerald-100 ml-2">{crop.logs && crop.logs.length > 0 ? crop.logs.map((log, i) => (<div key={i} className="relative pl-6"><div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-200 border-4 border-white shadow-sm"></div><span className="text-xs font-bold text-gray-400 block mb-2 tracking-wide uppercase">{log.date}</span><div className="bg-gray-50 p-4 rounded-2xl text-sm text-gray-700 border border-gray-100 relative group shadow-sm hover:shadow-md transition-all"><div className="pr-6">{log.text}{log.image && <img src={log.image} alt="Growth Log" className="mt-3 rounded-xl w-full h-40 object-cover border border-white shadow-sm" />}</div><button onClick={() => deleteGrowthLog(crop.id, log.id)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors p-1"><Trash2 size={16} /></button></div></div>)) : <div className="text-center text-gray-400 text-sm py-2 italic opacity-60">Start tracking your plant's journey...</div>}</div>
           </div>
        ))}</div>
      )}
    </div>
  );

  const renderHarvest = () => (
    <div className="pb-28 pt-4">
      <div className="flex justify-between items-center mb-8 px-2"><div><h1 className="text-3xl font-extrabold text-emerald-900">{t('harvest_prediction')}</h1><p className="text-emerald-600 font-medium">Smart AI Forecasts</p></div><button onClick={() => setShowCalendar(!showCalendar)} className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${showCalendar ? 'bg-emerald-600 text-white shadow-emerald-500/30' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}><Calendar size={18}/> {t('calendar_view')}</button></div>
      {showCalendar ? (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-6 text-center animate-in fade-in zoom-in-95"><h3 className="font-bold text-gray-800 mb-6 text-lg">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3><div className="grid grid-cols-7 gap-2 text-xs mb-3 text-gray-400 font-bold uppercase tracking-wider">{['S','M','T','W','T','F','S'].map((d,i)=><div key={i}>{d}</div>)}</div><div className="grid grid-cols-7 gap-2 text-sm font-medium text-gray-600">{[...Array(30)].map((_, i) => { const day = i + 1; const hasHarvest = crops.some(c => new Date(c.harvestDate).getDate() === day); return <div key={i} className={`h-10 w-10 flex items-center justify-center rounded-full transition-all ${hasHarvest ? 'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30 scale-110' : 'hover:bg-gray-50'}`}>{day}</div> })}</div></div>
      ) : (
        <>{crops.length === 0 ? <div className="bg-white p-12 rounded-[2rem] border border-dashed border-emerald-100 text-center text-emerald-600/50 font-medium mb-6">No harvests pending</div> : (<div className="grid gap-4 mb-8">{crops.map(crop => { const daysLeft = getDaysLeft(crop.harvestIso || crop.harvestDate); return (<div key={crop.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"><div><h3 className="font-bold text-gray-800 text-lg">{crop.name}</h3><div className="flex items-center gap-1.5 text-sm text-orange-500 font-bold mt-1 bg-orange-50 px-2 py-1 rounded-lg w-fit"><Clock size={14} /><span>Due: {new Date(crop.harvestDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span></div></div><div className="text-right bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100"><div className="text-2xl font-black text-emerald-600">{daysLeft}</div><div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wide">{t('days_left')}</div></div></div>); })}</div>)}</>
      )}
      <div className="grid grid-cols-2 gap-4 mb-6"><div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center justify-center gap-1"><div className="text-emerald-500 mb-1"><TrendingUp size={28} /></div><span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('total_yield')}</span><div className="text-3xl font-black text-gray-800">{crops.reduce((acc, c) => acc + (c.yield || 0), 0)} <span className="text-sm font-medium text-gray-400">kg</span></div></div><div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center justify-center gap-1"><div className="text-orange-500 mb-1"><Calendar size={28} /></div><span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{t('upcoming')}</span><div className="text-3xl font-black text-gray-800">{crops.length} <span className="text-sm font-medium text-gray-400">Harv</span></div></div></div>
    </div>
  );

  const renderSettings = () => (
    <div className="pb-28 pt-4">
      <div className="mb-8 px-2"><h1 className="text-3xl font-extrabold text-emerald-900">{t('settings')}</h1><p className="text-emerald-600 font-medium">Manage your preferences</p></div>
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between mb-6 cursor-pointer hover:bg-gray-50 transition-colors"><div className="flex items-center gap-5"><div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border-4 border-white shadow-sm"><User size={32} /></div><div><h3 className="font-bold text-xl text-gray-900">{USERNAME}</h3><p className="text-sm text-gray-500 font-medium">{t('profile')}</p></div></div><div className="bg-gray-100 p-2 rounded-full"><ChevronRight size={20} className="text-gray-400" /></div></div>
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8"><h4 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider ml-1"><Globe size={16}/> {t('language')}</h4><div className="flex gap-3">{['en', 'ms', 'zh'].map(l => (<button key={l} onClick={() => setLang(l)} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${lang === l ? 'bg-emerald-600 text-white shadow-emerald-500/30 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>{l === 'en' ? 'English' : l === 'ms' ? 'Melayu' : '中文'}</button>))}</div></div>
      <button className="w-full bg-white border-2 border-red-100 text-red-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-50 hover:border-red-200 transition-all"><LogOut size={20} /> {t('logout')}</button>
      <div className="text-center mt-8 text-xs font-medium text-emerald-800/40">Farm Manager v2.0 Premium</div>
    </div>
  );

  return (
    <div className="font-sans min-h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden text-gray-800 bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-100">
      <div className="p-6 h-screen overflow-y-auto custom-scrollbar">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'crops' && renderCrops()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'growth' && renderGrowth()}
        {activeTab === 'harvest' && renderHarvest()}
        {activeTab === 'settings' && renderSettings()}
      </div>
      
      {/* FLOATING GLASS NAVIGATION 🛸 */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs px-4">
        <div className="bg-gray-900/85 backdrop-blur-xl rounded-[2.5rem] p-2 shadow-2xl border border-white/10 flex justify-between items-center">
          <button onClick={() => setActiveTab('home')} className={`p-4 rounded-full transition-all duration-300 ${activeTab === 'home' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white'}`}><Home size={20} strokeWidth={2.5} /></button>
          <button onClick={() => setActiveTab('crops')} className={`p-4 rounded-full transition-all duration-300 ${activeTab === 'crops' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white'}`}><Sprout size={20} strokeWidth={2.5} /></button>
          <button onClick={() => setActiveTab('tasks')} className={`p-4 rounded-full transition-all duration-300 ${activeTab === 'tasks' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white'}`}><Bell size={20} strokeWidth={2.5} /></button>
          <button onClick={() => setActiveTab('growth')} className={`p-4 rounded-full transition-all duration-300 ${activeTab === 'growth' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white'}`}><TrendingUp size={20} strokeWidth={2.5} /></button>
          <button onClick={() => setActiveTab('harvest')} className={`p-4 rounded-full transition-all duration-300 ${activeTab === 'harvest' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white'}`}><Calendar size={20} strokeWidth={2.5} /></button>
          <button onClick={() => setActiveTab('settings')} className={`p-4 rounded-full transition-all duration-300 ${activeTab === 'settings' ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-400 hover:text-white'}`}><Settings size={20} strokeWidth={2.5} /></button>
        </div>
      </div>
    </div>
  );
}
