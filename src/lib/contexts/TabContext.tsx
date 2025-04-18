import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types
export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabContextType {
  tabs: TabItem[];
  activeTabId: string | null;
  setTabs: (tabs: TabItem[]) => void;
  setActiveTab: (id: string) => void;
  registerTab: (tab: TabItem) => void;
  unregisterTab: (id: string) => void;
}

// Create context with default value
const TabContext = createContext<TabContextType>({
  tabs: [],
  activeTabId: null,
  setTabs: () => {},
  setActiveTab: () => {},
  registerTab: () => {},
  unregisterTab: () => {},
});

// Props type for the provider
interface TabProviderProps {
  children: ReactNode;
  defaultTabs?: TabItem[];
  defaultActiveTabId?: string;
}

export const TabProvider: React.FC<TabProviderProps> = ({
  children,
  defaultTabs = [],
  defaultActiveTabId,
}) => {
  const [tabs, setTabs] = useState<TabItem[]>(defaultTabs);
  const [activeTabId, setActiveTabId] = useState<string | null>(
    defaultActiveTabId || (defaultTabs.length > 0 ? defaultTabs[0].id : null)
  );

  // Set active tab
  const setActiveTab = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  // Register a new tab
  const registerTab = useCallback(
    (tab: TabItem) => {
      setTabs(prevTabs => {
        // Check if tab with this ID already exists
        const exists = prevTabs.some(t => t.id === tab.id);
        if (exists) {
          return prevTabs.map(t => (t.id === tab.id ? tab : t));
        }
        // Add new tab
        return [...prevTabs, tab];
      });

      // If no active tab, set this one as active
      if (activeTabId === null) {
        setActiveTabId(tab.id);
      }
    },
    [activeTabId]
  );

  // Unregister a tab
  const unregisterTab = useCallback(
    (id: string) => {
      setTabs(prevTabs => prevTabs.filter(tab => tab.id !== id));

      // Update active tab if the removed one was active
      if (activeTabId === id) {
        setActiveTabId(prev => {
          const remainingTabs = tabs.filter(tab => tab.id !== id);
          return remainingTabs.length > 0 ? remainingTabs[0].id : null;
        });
      }
    },
    [activeTabId, tabs]
  );

  return (
    <TabContext.Provider
      value={{
        tabs,
        activeTabId,
        setTabs,
        setActiveTab,
        registerTab,
        unregisterTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

// Custom hook to use tab context
export const useTab = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};
