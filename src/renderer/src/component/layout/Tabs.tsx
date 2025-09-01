import { Tab, TabGroup, TabPanel } from '@headlessui/react'
import { Fragment, ReactNode, useState } from 'react'

type Props = {
  tabData: { title: string; content: ReactNode }[]
}

export default function Tabs({ tabData }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full flex flex-col">
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} className="flex flex-col h-full">
        <div className="sticky top-0 z-10 bg-white flex gap-x-2 border-b border-gray-200">
          {tabData.map((tab) => (
            <Tab key={tab.title} as={Fragment}>
              <button
                className="rounded-t-lg px-4 py-2.5 text-sm font-medium
                  text-gray-500
                  hover:bg-gray-100
                  hover:text-gray-800
                  focus:outline-none
                  data-[selected]:border-blue-500
                  data-[selected]:border-b-2
                  data-[selected]:text-blue-600"
              >
                {tab.title}
              </button>
            </Tab>
          ))}
        </div>

        <div className="flex-1 overflow-auto">
          {tabData.map((tab, idx) => (
            <TabPanel
              key={idx}
              className="rounded-xl bg-white p-4 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              {tab.content}
            </TabPanel>
          ))}
        </div>
      </TabGroup>
    </div>
  );
}
