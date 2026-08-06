interface TabNavigationProps {
  dishes: Record<string, { name: string }>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation = ({ dishes, activeTab, setActiveTab }: TabNavigationProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
      {Object.entries(dishes).map(([key, dish]) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-medium transition-all min-h-[44px] text-sm md:text-base ${activeTab === key
            ? "bg-primary-gradient text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {dish.name}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;