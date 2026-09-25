import React, { useState } from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  Clock, 
  Play, 
  Pause, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function ScheduledView() {
  const { scheduledTasks, runScheduledTaskNow, toggleScheduledTask } = useContinua();
  const [runningTaskId, setRunningTaskId] = useState<string | null>(null);

  const handleRunNow = (id: string) => {
    setRunningTaskId(id);
    setTimeout(() => {
      runScheduledTaskNow(id);
      setRunningTaskId(null);
    }, 600);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            Scheduled Project Work
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Automated recurring memory synthesis, sprint reviews, and status checklists run on your project's permanent context.
          </p>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {scheduledTasks.map((task) => {
          const isActive = task.status === 'active';
          const isRunning = runningTaskId === task.id;

          return (
            <div
              key={task.id}
              className="bg-white border border-neutral-200/90 rounded-xl p-5 hover:border-neutral-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 text-xs max-w-2xl">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-neutral-900">
                    {task.title}
                  </h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                  }`}>
                    {isActive ? 'ACTIVE' : 'PAUSED'}
                  </span>
                </div>

                <p className="text-neutral-600 leading-relaxed">
                  {task.actionDescription}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-mono pt-1">
                  <span>Schedule: {task.schedule}</span>
                  <span>·</span>
                  <span>Next: {task.nextRun}</span>
                </div>

                <p className="text-[11px] text-emerald-700 font-medium">
                  {task.lastRunStatus}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleScheduledTask(task.id)}
                  className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isActive ? 'Pause' : 'Resume'}</span>
                </button>

                <button
                  disabled={isRunning}
                  onClick={() => handleRunNow(task.id)}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isRunning ? 'Running...' : 'Run Now'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
