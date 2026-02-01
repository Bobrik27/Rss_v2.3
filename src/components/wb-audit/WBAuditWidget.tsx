import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, Rocket, Loader2, CheckCircle2, 
  Lock, AlertTriangle, Zap, XCircle, Info, Database, BrainCircuit, Search
} from 'lucide-react';
import { API_CONFIG } from '../../config/api';

// --- UI HELPERS ---
const Toast = ({ message, type, onClose }: { message: string, type: 'error' | 'info', onClose: () => void }) => (
  <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-right-10 duration-300 border ${
    type === 'error' ? 'bg-red-950/90 border-red-800 text-red-100' : 'bg-card border-border text-foreground'
  }`}>
    {type === 'error' ? <XCircle size={20} /> : <Info size={20} className="text-primary" />}
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">✕</button>
  </div>
);

const WBAuditWidget = () => {
  const [view, setView] = useState<'grid' | 'audit'>('grid'); 
  const [auditState, setAuditState] = useState<'IDLE' | 'PROCESSING' | 'RESULT'>('IDLE'); 
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [toast, setToast] = useState<{message: string, type: 'error'|'info'} | null>(null);
  const [productData, setProductData] = useState<any>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, type: 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Modules Configuration (Aligned with Competencies Style)
  const modules = [
    { id: 'marketing', title: 'МАРКЕТИНГОВЫЙ АНАЛИЗ', status: 'ACTIVE', desc: 'Глубокий аудит карточек товара Wildberries.', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'agents', title: 'Автономные агенты', status: 'LOCKED', desc: 'Цифровые сотрудники на базе n8n и Make.', icon: <Zap className="w-5 h-5" /> },
    { id: 'vibe', title: 'Vibe-coding', status: 'LOCKED', desc: 'Создание прототипов через прямой диалог с кодом.', icon: <Rocket className="w-5 h-5" /> },
    { id: 'neuro', title: 'Нейросети', status: 'LOCKED', desc: 'Обучение локальных LLM на ваших данных.', icon: <BrainCircuit className="w-5 h-5" /> },
    { id: 'db', title: 'Базы Данных', status: 'LOCKED', desc: 'Проектирование архитектуры High-Load систем.', icon: <Database className="w-5 h-5" /> },
    { id: 'search', title: 'SEO Разведка', status: 'LOCKED', desc: 'Анализ семантического ядра конкурентов.', icon: <Search className="w-5 h-5" /> },
  ];

  const handleStartAnalysis = async () => {
    // 1. Validation
    const wbRegex = /wildberries\.ru\/catalog\/(\d+)/;
    const match = url.match(wbRegex);
    if (!match) {
      showToast("Введите корректную ссылку на товар Wildberries", "error");
      return;
    }

    // 2. Extract SKU and generate projectId
    const sku = match[1];
    const projectId = `wb_${sku}`;
    
    setAuditState('PROCESSING');
    setProgress(0);
    setLogs([]);
    
    try {
      // 3. Call parse endpoint (Workflow A) to get product info
      const parseResponse = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.parse, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!parseResponse.ok) {
        throw new Error(`Parse API error: ${parseResponse.status}`);
      }

      const parseData = await parseResponse.json();
      // Update productData immediately when parse returns
      if (parseData) {
        setProductData(parseData);
      }

      // 4. Call trigger endpoint (Workflow B) to start Python analysis
      await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.trigger, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, projectId })
      });

      // 5. Start polling for status
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.status(projectId)}`);
          
          if (!statusResponse.ok) {
            throw new Error(`Status API error: ${statusResponse.status}`);
          }
          
          const statusData = await statusResponse.json();
          
          // Map stages to terminal logs
          let logMessage = "";
          switch(statusData.stage) {
            case 'initializing':
              logMessage = "[SYSTEM] Initializing secure connection...";
              break;
            case 'parsing':
              logMessage = "[PARSER] Retrieving SKU metadata...";
              break;
            case 'ai_analysis':
              logMessage = "[SEO] AI Agents are formulating growth hypothesis...";
              break;
            case 'done':
              logMessage = "[SUCCESS] Audit complete. PDF ready for download.";
              break;
            default:
              logMessage = `[${statusData.stage.toUpperCase()}] Processing...`;
          }
          
          // Add log if it's not a duplicate of the last one
          if (logs.length === 0 || logs[logs.length - 1] !== logMessage) {
            setLogs(prev => [...prev, logMessage]);
          }
          
          if (statusData.status === 'completed') {
            // Set download URL from API response
            setProductData((prev: any) => ({
              ...prev,
              downloadUrl: statusData.downloadUrl || statusData.pdf_url
            }));
            
            setProgress(100);
            
            // Clear the interval
            clearInterval(pollInterval);
            
            // Wait 1 second then set auditState to 'RESULT'
            setTimeout(() => {
              setAuditState('RESULT');
            }, 1000);
          } else if (statusData.status === 'not_found') {
            // Stay in initializing stage
            if (logs.length === 0 || logs[logs.length - 1] !== "[SYSTEM] Initializing secure connection...") {
              setLogs(["[SYSTEM] Initializing secure connection..."]);
            }
          } else {
            // Update progress based on stage
            let progressValue = 0;
            switch(statusData.stage) {
              case 'initializing':
                progressValue = 10;
                break;
              case 'parsing':
                progressValue = 30;
                break;
              case 'ai_analysis':
                progressValue = 60;
                break;
              case 'done':
                progressValue = 90;
                break;
              default:
                progressValue = Math.min(90, progress + 5);
            }
            setProgress(progressValue);
          }
        } catch (err) {
          console.error("Polling error:", err);
          clearInterval(pollInterval);
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          showToast(`Ошибка получения статуса: ${errorMessage}`, "error");
          setAuditState('IDLE');
        }
      }, 3000); // Poll every 3 seconds
      
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showToast(`Ошибка: ${errorMessage}`, "error");
      setAuditState('IDLE');
    }
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="w-full bg-background text-foreground font-sans">
      
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-[1700px] mx-auto w-full p-4 md:p-8 lg:p-12">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12 select-none">
          <div className="text-lg font-bold tracking-tight flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ff6d5a] rounded-full animate-pulse" />
            WB AGENT OS <span className="text-[10px] text-muted-foreground bg-card border border-border px-1.5 rounded ml-1">v4.0.1</span>
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
            {auditState === 'IDLE' && (
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
                    ЗАПУСТИТЬ СКАНЕР <Rocket size={18} />
                  </button>
                  
                  <button onClick={() => setView('grid')} className="w-full text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest mt-4">
                    ← Вернуться назад
                  </button>
                </div>
              </div>
            )}

            {/* STATE: PROCESSING */}
            {auditState === 'PROCESSING' && (
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
                      className="h-full bg-primary transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Terminal */}
                  <div className="bg-[#050505] rounded-xl p-6 font-mono text-sm border border-border/50 h-[500px] overflow-y-auto custom-scrollbar leading-relaxed">
                    <div className="flex flex-col gap-2">
                      {logs.map((log, i) => (
                        <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-200">
                          <span className="text-muted-foreground/50">[{new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second:'2-digit' })}]</span>
                          <span className={`${log.includes('[RISK]') ? 'text-[#ff6d5a]' : 'text-primary'}`}>
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
            {auditState === 'RESULT' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Product Header */}
                <div className="bg-card border border-border rounded-3xl p-8 flex gap-8 items-center shadow-lg">
                  <div className="w-32 h-32 bg-muted rounded-xl overflow-hidden shrink-0 border border-border">
                     <img src={productData?.image_url} alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#ff6d5a] tracking-widest uppercase mb-2">AUDIT COMPLETE</div>
                    <h2 className="text-2xl font-bold leading-tight line-clamp-2">{productData?.name}</h2>
                    <div className="flex items-center gap-2 mt-3 text-base text-muted-foreground">
                        <span className="text-yellow-500 font-bold text-lg">★ {productData?.rating}</span>
                        <span>•</span>
                        <span>{productData?.reviews_count} отзывов</span>
                    </div>
                  </div>
                </div>

                {/* Alert */}
                <div className="bg-[#ff6d5a]/10 border border-[#ff6d5a]/20 text-[#ff6d5a] p-6 rounded-xl text-center font-bold text-lg uppercase tracking-wider">
                  Обнаружено 5 критических ошибок
                </div>

                {/* Issues List */}
                <div className="bg-card border border-border rounded-3xl overflow-hidden">
                  <div className="divide-y divide-border">
                    <div className="p-6 flex gap-4">
                      <div className="mt-1 text-green-500"><CheckCircle2 size={20} /></div>
                      <div>
                        <div className="font-bold text-foreground">SEO Оптимизация</div>
                        <p className="text-sm text-muted-foreground mt-1">Отсутствуют 2 высокочастотных ключа.</p>
                      </div>
                    </div>
                    {/* Blurred Item */}
                    <div className="p-6 flex gap-4 relative">
                      <div className="mt-1 text-[#ff6d5a]"><AlertTriangle size={20} /></div>
                      <div className="w-full blur-[4px] select-none opacity-50">
                        <div className="font-bold">Визуальный контент (CTR)</div>
                        <p className="text-sm mt-1">Конверсия снижена из-за низкой контрастности фона.</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Lock size={20} className="text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic */}
                  <div className="bg-card border border-border p-8 rounded-3xl flex flex-col min-h-[300px]">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">BASIC</div>
                    <div className="text-3xl font-black mb-6">500 ₽</div>
                    <ul className="text-sm space-y-3 mb-8 text-muted-foreground flex-grow">
                      <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary/50"></span> • Полный список ошибок</li>
                      <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary/50"></span> • Рекомендации по SEO</li>
                      <li className="flex items-start gap-2"><span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary/50"></span> • PDF Отчет</li>
                    </ul>
                    {productData?.downloadUrl ? (
                      <a
                        href={productData.downloadUrl}
                        className="w-full py-4 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-bold uppercase text-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Скачать отчет
                      </a>
                    ) : (
                      <button className="w-full py-4 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-bold uppercase flex items-center justify-center">
                        <div className="w-4 h-4 border-t-2 border-r-2 border-primary rounded-full animate-spin mr-2"></div>
                        Генерация...
                      </button>
                    )}
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
                        {productData?.downloadUrl ? (
                          <a
                            href={productData.downloadUrl}
                            className="w-full py-4 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-bold uppercase flex items-center justify-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                          Скачать стратегию <Rocket size={16} />
                          </a>
                        ) : (
                          <button className="w-full py-4 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-bold uppercase flex items-center justify-center">
                            <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                            Генерация...
                          </button>
                        )}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {setView('grid'); setAuditState('IDLE'); setUrl('');}}
                  className="w-full py-4 text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest"
                >
                  ← Новый анализ
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