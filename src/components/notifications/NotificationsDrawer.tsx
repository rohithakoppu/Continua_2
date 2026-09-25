import React from 'react';
import { useContinua } from '../../context/ContinuaContext';
import { 
  X, 
  CheckCheck, 
  AlertTriangle, 
  Camera, 
  Repeat, 
  PlugZap, 
  Clock, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export function NotificationsDrawer() {
  const { 
    isNotificationsOpen, 
    setIsNotificationsOpen, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    setCurrentView,
    setSelectedProjectId,
    setSelectedConversationId,
    setActiveProjectTab
  } = useContinua();

  if (!isNotificationsOpen) return null;

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'session_limit': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'snapshot_created': return <Camera className="w-4 h-4 text-purple-600" />;
      case 'handoff_ready': return <Repeat className="w-4 h-4 text-emerald-600" />;
      case 'connector_connected': return <PlugZap className="w-4 h-4 text-blue-600" />;
      case 'conflict_detected': return <ShieldAlert className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-neutral-500" />;
    }
  };

  const handleAction = (n: any) => {
    markNotificationRead(n.id);
    if (n.targetView) {
      if (n.targetView === 'chat' && n.targetId) {
        setSelectedConversationId(n.targetId);
      } else if (n.targetView === 'project-detail' && n.targetId) {
        setSelectedProjectId(n.targetId);
        setActiveProjectTab('overview');
      }
      setCurrentView(n.targetView);
    }
    setIsNotificationsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-neutral-900/40 backdrop-blur-2xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-neutral-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Notifications</h3>
            <p className="text-[11px] text-neutral-500">Project alerts & continuity triggers</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 text-xs">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 hover:bg-neutral-50/80 transition-colors ${!n.read ? 'bg-neutral-50/40' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-white border border-neutral-200 rounded-lg shrink-0 mt-0.5 shadow-2xs">
                  {getNotifIcon(n.type)}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-xs ${!n.read ? 'font-bold text-neutral-900' : 'font-medium text-neutral-700'}`}>
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[11px]">
                    {n.message}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-400">
                    <span>{n.timestamp}</span>
                    {n.actionLabel && (
                      <button
                        onClick={() => handleAction(n)}
                        className="font-semibold text-neutral-900 hover:underline flex items-center gap-1"
                      >
                        <span>{n.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
