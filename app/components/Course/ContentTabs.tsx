type Props = {
    activeTab: number
    setActiveTab: (tab: number) => void
  }
  
  const ContentTabs = ({ activeTab, setActiveTab }: Props) => {
    const tabs = ["Overview", "Resources", "Q&A", "Quiz"]
  
    return (
      <div className="w-full p-4 flex text-zinc-800 dark:text-white items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded-lg shadow-inner">
        {tabs.map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${activeTab === index && "text-red-500"}`}
            onClick={() => setActiveTab(index)}
          >
            {text}
          </h5>
        ))}
      </div>
    )
  }
  
  export default ContentTabs
  
  