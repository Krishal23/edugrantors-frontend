type Props = {
    description: string
  }
  
  const OverviewTab = ({ description }: Props) => {
    return (
      <p className="text-[18px] min-h-[10vh] text-zinc-800 dark:text-white whitespace-pre-line mb-auto">{description}</p>
    )
  }
  
  export default OverviewTab
  
  