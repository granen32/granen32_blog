import React, { ReactNode, useEffect } from 'react';
import { TabItem, useTab } from '../../lib/contexts/TabContext';

interface TabsProps {
  tabs: TabItem[];
  defaultActiveId?: string;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
  tabHeaderClassName?: string;
  tabContentClassName?: string;
  onChange?: (id: string) => void;
}

export function Tabs({
  tabs,
  defaultActiveId,
  variant = 'default',
  className = '',
  tabHeaderClassName = '',
  tabContentClassName = '',
  onChange,
}: TabsProps) {
  const { activeTabId, setActiveTab, setTabs } = useTab();

  // Register tabs on mount
  useEffect(() => {
    setTabs(tabs);
    if (defaultActiveId) {
      setActiveTab(defaultActiveId);
    } else if (tabs.length > 0 && !activeTabId) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, defaultActiveId, setTabs, setActiveTab, activeTabId]);

  // Handle tab change
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (onChange) {
      onChange(id);
    }
  };

  // Get the active tab's content
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  // Variant styling
  const getVariantStyle = (isActive: boolean) => {
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-700';
      case 'underline':
        return isActive
          ? 'border-b-2 border-blue-600 text-blue-600'
          : 'border-b-2 border-transparent text-gray-600 hover:border-gray-300';
      default:
        return isActive
          ? 'border-b-2 border-blue-600 text-blue-600'
          : 'text-gray-600 hover:text-gray-800';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`mb-4 flex border-b ${tabHeaderClassName}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${getVariantStyle(
              tab.id === activeTabId
            )} ${tab.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            disabled={tab.disabled}
            aria-selected={tab.id === activeTabId}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`tab-content ${tabContentClassName}`}>{activeTab?.content}</div>
    </div>
  );
}

interface TabPanelProps {
  children: ReactNode;
  className?: string;
}

export function TabPanel({ children, className = '' }: TabPanelProps) {
  return <div className={`tab-panel ${className}`}>{children}</div>;
}
