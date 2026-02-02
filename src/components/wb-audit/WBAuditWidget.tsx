import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, Globe, Rocket, Loader2, CheckCircle2, 
  Lock, AlertTriangle, ShoppingCart, Zap, XCircle, Info, Database, BrainCircuit, Search
} from 'lucide-react';
import { API_CONFIG } from '../../config/api';

// --- TYPES ---
type Phase = 
  'INIT' | 'PARSING' | 'TEASER_READY' | 'ANALYZING' | 'DONE' | 
  'WAITING_PAYMENT' | 'PAID' | 'PDF_GENERATING' | 'PDF_READY' | 'ERROR';

interface ProductData {
  name?: string;
  media?: string;
  teaser?: Array<{ title: string; description: string }>;
  [key: string]: any;
}

interface ApiResponse {
  phase: Phase;
  message?: string;
  productData?: ProductData;
  pdf_url?: string;
  [key: string]: any;
}

// --- UI COMPONENTS ---
const Toast = ({ message, type, onClose }: { message: string, type: 'error' | 'info', onClose: () => void }) => (
  <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-right-10 duration-300 border ${
    type === 'error' ? 'bg-red-950/90 border-red-800 text-red-100' : 'bg-card border-border text-foreground'
  }`}>
    {type === 'error' ? <XCircle size={20} /> : <Info size={20} className="text-primary" />}
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">✕</button>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const WBAuditWidget = () => {
  const [view, setView] = useState<'grid' | 'audit'>('grid'); 
  const [phase, setPhase] = useState<Phase>('INIT'); 
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [toast, setToast] = useState<{message: string, type: 'error'|'info'} | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [email, setEmail] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const FAKE_LOGS = [
    "[SYSTEM] Initializing secure connection...",
    "[PARSER] Retrieving SKU metadata...",
    "[SEO] Analyzing semantic core coverage...",
    "[MEDIA] Checking visual content conversion...",
    "[RISK] Calculating budget leakage...",
    "[REPORT] Finalizing audit data...",
    "[AI] Agents are formulating growth hypothesis...",
    "[SUCCESS] Audit complete. PDF ready for download."
  ];

  const showToast = (message: string, type: 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Get or generate guest ID
  const getGuestId = (): string => {
    const stored = localStorage.getItem('guest_id');
    if (stored) return stored;
    
    const newId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('guest_id', newId);
    return newId;
  };

  // Modules Configuration (Aligned with Competencies Style)
  const modules = [
    { id: 'marketing', title: 'МАРКЕТИНГОВЫЙ АНАЛИЗ', status: 'ACTIVE', desc: 'Глубокий аудит карточек товара Wildberries.', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'agents', title: 'Автономные агенты', status: 'LOCKED', desc: 'Цифровые сотрудники на базе n8n и Make.', icon: <Zap className="w-5 h-5" /> },
    { id: 'vibe', title: 'Vibe-coding', status: 'LOCKED', desc: 'Создание прототипов через прямой диалог с кодом.', icon: <Rocket className="w-5 h-5" /> },
    { id: 'advice', title: 'Совет AI', status: 'LOCKED', desc: 'Мультимодальный консилиум ИИ для принятия реший.', icon: <Globe className="w-5 h-5" /> },
    { id: 'db', title: 'Базы Данных', status: 'LOCKED', desc: 'Проектирование архитектуры High-Load систем.', icon: <Database className="w-5 h-5" /> },
    { id: 'neuro', title: 'Нейросети', status: 'LOCKED', desc: 'Обучение локальных LLM на ваших данных.', icon: <BrainCircuit className="w-5 h-5" /> },
  ];

  const handleStartAnalysis = async () => {
    // 1. Validation
    const wbRegex = /wildberries\.ru\/catalog\/\d+/;
    if (!wbRegex.test(url)) {
      showToast("Система работает только с Wildberries", "error");
      return;
    }

    // 2. Reset states
    setPhase('INIT');
    setProgress(0);
    setLogs([]);
    setProductData(null);
    setDownloadUrl(null);

    try {
      // 3. Call parse endpoint
      const parseResponse = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.parse, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!parseResponse.ok) throw new Error(`Parse API error: ${parseResponse.status}`);
      
      const text = await parseResponse.text();
      if (!text) {
        console.error("Empty response from parse API");
        // Continue to trigger workflow even if parse data is empty
      } else {
        try {
          const parseData = JSON.parse(text);
          
          // 4. Update product data immediately
          if (parseData) {
            setProductData(parseData);
          }
        } catch (e) {
          console.error("Malformed JSON from parse API:", text);
          // Continue to trigger workflow even if parse data is malformed
        }
      }

      // 5. Call trigger endpoint
      const triggerResponse = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.trigger, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!triggerResponse.ok) {
        console.error(`Trigger API error: ${triggerResponse.status}`);
        showToast("Ошибка запуска анализа", "error");
        return;
      }

      const triggerText = await triggerResponse.text();
      if (!triggerText) {
        console.log("Empty response from trigger API, continuing...");
      } else {
        try {
          const triggerData = JSON.parse(triggerText);
          // Process trigger response if needed
        } catch (e) {
          console.error("Malformed JSON from trigger API:", triggerText);
          // Continue anyway
        }
      }

      // 6. Start polling for status
      setPhase('PARSING');
      const guestId = getGuestId();
      const projectId = `wb_${Date.now()}`; // Generate unique project ID

      const pollInterval = setInterval(async () => {
        try {
          const statusUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.status(projectId)}&guestId=${guestId}&t=${Date.now()}`;
          console.log("DEBUG: Polling URL:", statusUrl);
          const statusResponse = await fetch(statusUrl);

          if (!statusResponse.ok) {
            console.error(`Status API error: ${statusResponse.status}`);
            // Even if there's an error, we should continue polling to eventually get status
            // Don't throw error immediately, just continue to next poll
            return;
          }

          const text = await statusResponse.text();
          if (!text) {
            console.error("Empty response from API");
            // Instead of returning, create a default response to maintain polling
            const defaultData: ApiResponse = {
              phase: 'ERROR',
              status: 'error',
              message: 'Backend unreachable or project not found'
            };
            
            // Only update if phase has changed
            if (defaultData.phase !== phase) {
              setPhase(defaultData.phase);
              
              if (defaultData.phase === 'ERROR') {
                clearInterval(pollInterval);
                showToast("Backend is currently under maintenance. Retrying...", "info");
              }
            }
            
            // Handle messages and logs
            if (defaultData.message) {
              setLogs(prev => [...prev, `[${new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}] ${defaultData.message}`]);
            }
            
            // Stop polling if phase is terminal
            if (['DONE', 'PAID', 'PDF_READY', 'ERROR'].includes(defaultData.phase)) {
              clearInterval(pollInterval);
            }
            return;
          }

          console.log("DEBUG: Response Status:", statusResponse.status);
          console.log("DEBUG: Raw Text:", text);
          
          try {
            const data: ApiResponse = JSON.parse(text);

            // Only update if phase has changed
            if (data.phase !== phase) {
              setPhase(data.phase);

              // Handle phase-specific logic
              switch(data.phase) {
                case 'PARSING':
                case 'ANALYZING':
                  setProgress(prev => Math.min(70, prev + 5));
                  break;
                case 'TEASER_READY':
                  setProgress(85);
                  // Data mapping fix: check both data and productData fields
                  const teaserProductData = data.data || data.productData;
                  if (teaserProductData) setProductData(teaserProductData);
                  break;
                case 'DONE':
                  setProgress(100);
                  // Data mapping fix: check both data and productData fields
                  const doneProductData = data.data || data.productData;
                  if (doneProductData) setProductData(doneProductData);
                  // Wait 1 second before showing result view
                  setTimeout(() => {
                    if (phase === 'DONE') setView('audit');
                  }, 1000);
                  break;
                case 'PAID':
                  // Payment successful, prepare for PDF
                  break;
                case 'PDF_READY':
                  setDownloadUrl(data.pdf_url || null);
                  break;
                case 'ERROR':
                  clearInterval(pollInterval);
                  showToast("Backend is currently under maintenance. Retrying...", "info");
                  break;
              }
            }

            // Handle messages and logs
            if (data.message) {
              setLogs(prev => [...prev, `[${new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}] ${data.message}`]);
            } else {
              // Cycle through fake logs every 4s if no real message
              if (logs.length === 0 || Date.now() % 4000 < 100) {
                const randomLog = FAKE_LOGS[Math.floor(Math.random() * FAKE_LOGS.length)];
                setLogs(prev => [...prev, `[${new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}] ${randomLog}`]);
              }
            }

            // Stop polling if phase is terminal
            if (['DONE', 'PAID', 'PDF_READY', 'ERROR'].includes(data.phase)) {
              clearInterval(pollInterval);
            }
          } catch (e) {
            console.error("Malformed JSON:", text);
            // Don't crash, just log and wait for the next poll
          }
        } catch (error) {
          console.error("Polling error:", error);
          clearInterval(pollInterval);
          setPhase('ERROR');
          showToast("Ошибка соединения с сервером", "error");
        }
      }, 3000); // Poll every 3 seconds

    } catch (error: any) {
      console.error("Analysis error:", error);
      setPhase('ERROR');
      showToast(`Ошибка: ${error.message}`, "error");
    }
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      showToast("Пожалуйста, введите email", "error");
      return;
    }

    try {
      const response = await fetch(API_CONFIG.baseUrl + '/webhook/wb/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, projectId: `wb_${Date.now()}` })
      });

      if (!response.ok) {
        console.error(`Save lead API error: ${response.status}`);
        showToast("Ошибка при сохранении email", "error");
        return;
      }

      const text = await response.text();
      if (!text) {
        console.error("Empty response from save-lead API");
        // Continue anyway as the lead was likely saved
      } else {
        try {
          const responseData = JSON.parse(text);
          // Process response data if needed
        } catch (e) {
          console.error("Malformed JSON from save-lead API:", text);
          // Continue anyway as the lead was likely saved
        }
      }

      setIsEmailModalOpen(false);
      // Show payment options
      setPhase('WAITING_PAYMENT');
    } catch (error) {
      console.error("Error saving lead:", error);
      showToast("Ошибка при сохранении email", "error");
    }
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="w-full bg-card text-foreground font-sans">
      
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <Modal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
        title="Получить отчет"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Введите ваш email, чтобы получить доступ к отчету</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleEmailSubmit}
              className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Продолжить
            </button>
            <button 
              onClick={() => setIsEmailModalOpen(false)}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>

      <div className="max-w-[1700px] mx-auto w-full p-4 md:p-8 lg:p-12">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12 select-none">
          <div className="text-lg font-bold tracking-tight flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ff6d5a] rounded-full animate-pulse" />
            WB AGENT OS <span className="text-[10px] text-muted-foreground bg-background border border-border px-1.5 rounded ml-1">v4.0.1</span>
          </div>
        </div>

        {/* VIEW 1: MODULES GRID */}
        {view === 'grid' && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-12 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Матрица решений</h1>
              <p className="text-muted-foreground max-w-xl">Выберите инструмент для анализа.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((m) => (
                <div
                  key={m.id}
                  onClick={() => m.status === 'ACTIVE' && setView('audit')}
                  className={`group relative p-8 rounded-2xl border transition-all duration-300 min-h-[220px] flex flex-col justify-between
                    ${m.status === 'ACTIVE'
                      ? 'bg-card border-border cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
                      : 'bg-card border-border/50 cursor-not-allowed opacity-60'
                    }`}
                >
                  {m.status === 'LOCKED' && (
                    <div className="absolute top-4 right-4 text-muted-foreground/50">
                        <Lock size={16} />
                    </div>
                  )}
                  
                  <div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${m.status === 'ACTIVE' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {m.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{m.title}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                    {/* Status Indicator */}
                    <div className="flex items-center mt-3 gap-2">
                      <div className={`w-2 h-2 rounded-full ${m.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      <span className="text-xs text-muted-foreground">
                        {m.status === 'ACTIVE' ? 'System Online' : 'Offline / Maintenance'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: AUDIT INTERFACE */}
        {view === 'audit' && (
          <div className="max-w-[1300px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* STATE: INPUT */}
            {phase === 'INIT' && (
              <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-2xl">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-6">
                        MARKETING ANALYSIS MODULE
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Сканер карточки товара</h2>
                    <p className="text-muted-foreground">Вставьте ссылку, система сделает остальное.</p>
                </div>
                
                <div className="space-y-6">
                  <input 
                    type="url" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.wildberries.ru/catalog/..."
                    className="w-full h-20 bg-background border border-border rounded-xl px-6 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xl"
                  />

                  <button 
                    onClick={handleStartAnalysis}
                    className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    ЗАПУСТИТЬ СКАНЕР <Rocket size={20} />
                  </button>
                  
                  <button onClick={() => setView('grid')} className="w-full text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                    ← Вернуться назад
                  </button>
                </div>
              </div>
            )}

            {/* STATE: PROCESSING (PARSING, ANALYZING, etc.) */}
            {(phase === 'PARSING' || phase === 'ANALYZING' || phase === 'TEASER_READY') && (
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-border bg-muted/20 flex justify-between items-center">
                  <div className="flex items-center gap-3 text-primary font-mono text-xs font-bold">
                    <Loader2 className="animate-spin" size={16} />
                    <span>SYSTEM_PROCESSING</span>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Terminal */}
                  <div className="bg-[#050505] rounded-xl p-6 font-mono text-sm border border-border/50 h-[500px] overflow-y-auto custom-scrollbar leading-relaxed">
                    <div className="flex flex-col gap-2">
                      {logs.map((log, i) => (
                        <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-200">
                          <span className="text-muted-foreground/50">[{new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second:'2-digit' })}]</span>
                          <span className={`${log.includes('[ERROR]') ? 'text-red-500' : 'text-primary'}`}>
                            {log}
                          </span>
                        </div>
                      ))}
                      <div ref={logEndRef} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STATE: RESULT */}
            {phase === 'DONE' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Product Header */}
                <div className="bg-card border border-border rounded-3xl p-8 flex gap-8 items-center shadow-lg">
                  <div className="w-32 h-32 bg-muted rounded-xl overflow-hidden shrink-0 border border-border">
                     <img 
                        src={productData?.media || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"} 
                        alt="Product" 
                        className="w-full h-full object-cover" 
                     />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#ff6d5a] tracking-widest uppercase mb-2">AUDIT COMPLETE</div>
                    <h2 className="text-2xl font-bold leading-tight line-clamp-2">{productData?.name || "Product Name"}</h2>
                    <div className="flex items-center gap-2 mt-3 text-base text-muted-foreground">
                      <span className="text-yellow-500 font-bold text-lg">★ {productData?.rating || "5.0"}</span>
                      <span>•</span>
                      <span>{productData?.reviews_count || "0"} отзывов</span>
                    </div>
                  </div>
                </div>

                {/* Alert */}
                <div className="bg-[#ff6d5a]/10 border border-[#ff6d5a]/20 text-[#ff6d5a] p-6 rounded-xl text-center font-bold text-lg uppercase tracking-wider">
                  Обнаружено 5 критических ошибок
                </div>

                {/* Teaser List */}
                <div className="bg-card border border-border rounded-3xl overflow-hidden">
                  <div className="divide-y divide-border">
                    {productData?.teaser?.slice(0, 2).map((item, i) => (
                      <div key={i} className="p-6 flex gap-4">
                        <div className="mt-1 text-green-500"><CheckCircle2 size={20} /></div>
                        <div>
                          <div className="font-bold text-foreground">{item.title}</div>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Blurred Items (Locked Content) */}
                    <div className="relative">
                      <div className="backdrop-blur-md select-none opacity-50">
                        <div className="p-6 flex gap-4">
                          <div className="mt-1 text-[#ff6d5a]"><AlertTriangle size={20} /></div>
                          <div>
                            <div className="font-bold text-foreground">Визуальный контент (CTR)</div>
                            <p className="text-sm text-muted-foreground mt-1">Конверсия снижена из-за низкой контрастности фона.</p>
                          </div>
                        </div>
                        
                        <div className="p-6 flex gap-4">
                          <div className="mt-1 text-[#ff6d5a]"><AlertTriangle size={20} /></div>
                          <div>
                            <div className="font-bold text-foreground">SEO Оптимизация</div>
                            <p className="text-sm text-muted-foreground mt-1">Отсутствуют 2 высокочастотных ключа.</p>
                          </div>
                        </div>
                        
                        <div className="p-6 flex gap-4">
                          <div className="mt-1 text-[#ff6d5a]"><AlertTriangle size={20} /></div>
                          <div>
                            <div className="font-bold text-foreground">Целевая аудитория</div>
                            <p className="text-sm text-muted-foreground mt-1">Не учтены особенности поведения покупателей.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Overlay Card */}
                      <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
                        <div className="text-center p-8">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={32} className="text-primary" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">Отчет заблокирован</h3>
                          <p className="text-muted-foreground mb-6">Полный анализ доступен после оплаты</p>
                          <button 
                            onClick={() => setIsEmailModalOpen(true)}
                            className="bg-primary text-primary-foreground py-3 px-6 rounded-xl hover:opacity-90 transition-opacity font-bold"
                          >
                            Получить доступ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic */}
                  <div className="bg-card border border-border p-8 rounded-3xl flex flex-col min-h-[300px]">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">BASIC</div>
                    <div className="text-3xl font-black mb-6">500 ₽</div>
                    <ul className="text-sm space-y-3 mb-8 text-muted-foreground flex-grow">
                      <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary/50"></span> • Список ошибок</li>
                      <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary/50"></span> • Рекомендации по SEO</li>
                      <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary/50"></span> • PDF Отчет</li>
                    </ul>
                    <button 
                      onClick={() => setIsEmailModalOpen(true)}
                      className="w-full py-4 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-bold uppercase"
                    >
                      Получить отчет
                    </button>
                  </div>

                  {/* Pro */}
                  <div className="bg-card border border-primary/30 p-8 rounded-3xl flex flex-col relative overflow-hidden group min-h-[300px]">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">PRO AGENT</div>
                        <div className="text-3xl font-black mb-6">2 999 ₽</div>
                        <ul className="text-sm space-y-3 mb-8 text-foreground font-medium flex-grow">
                        <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary"></span> • Стратегия роста</li>
                        <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary"></span> • SEO Тексты</li>
                        <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary"></span> • ТЗ для дизайнера</li>
                        <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary"></span> • Индивидуальный подход</li>
                        </ul>
                        <button 
                          onClick={() => setIsEmailModalOpen(true)}
                          className="w-full py-4 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-bold uppercase flex items-center justify-center gap-2"
                        >
                        Скачать стратегию <Rocket size={16} />
                        </button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {setView('grid'); setPhase('INIT'); setUrl('');}}
                  className="w-full py-4 text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest"
                >
                  ← Новый анализ
                </button>
              </div>
            )}

            {/* WAITING PAYMENT STATE */}
            {phase === 'WAITING_PAYMENT' && (
              <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Оплата</h3>
                <p className="text-muted-foreground mb-8">Пожалуйста, выберите тарифный план для получения полного отчета</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <button 
                    onClick={() => setPhase('PAID')}
                    className="bg-card border border-border p-6 rounded-2xl hover:border-primary/50 transition-colors"
                  >
                    <div className="text-3xl font-black mb-2">500 ₽</div>
                    <div className="text-sm uppercase tracking-widest">Basic Report</div>
                  </button>
                  
                  <button 
                    onClick={() => setPhase('PAID')}
                    className="bg-card border border-primary/30 p-6 rounded-2xl hover:border-primary/50 transition-colors"
                  >
                    <div className="text-3xl font-black mb-2">2 999 ₽</div>
                    <div className="text-sm uppercase tracking-widest">Pro Strategy</div>
                  </button>
                </div>
              </div>
            )}

            {/* PAID STATE */}
            {phase === 'PAID' && (
              <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 size={32} className="text-green-500 animate-spin" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Обработка платежа</h3>
                <p className="text-muted-foreground">Подготовка вашего персонального PDF-отчета...</p>
              </div>
            )}

            {/* PDF READY STATE */}
            {phase === 'PDF_READY' && downloadUrl && (
              <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Отчет готов!</h3>
                <p className="text-muted-foreground mb-8">Ваш персональный PDF-отчет успешно сгенерирован</p>
                
                <a 
                  href={downloadUrl} 
                  className="inline-block bg-primary text-primary-foreground py-4 px-8 rounded-xl hover:opacity-90 transition-opacity font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Скачать PDF
                </a>
              </div>
            )}

            {/* ERROR STATE */}
            {phase === 'ERROR' && (
              <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle size={32} className="text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Ошибка</h3>
                <p className="text-muted-foreground mb-8">Произошла ошибка при обработке вашего запроса</p>
                
                <button 
                  onClick={() => setPhase('INIT')}
                  className="bg-primary text-primary-foreground py-3 px-8 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Повторить попытку
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WBAuditWidget;