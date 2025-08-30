import { Tab, TabGroup, TabPanel } from '@headlessui/react'
import { Fragment, ReactNode, useState } from 'react'
import ManagementAssessmentLog from '@renderer/pages/management/assessment-log/ManagementAssessmentLog'
import IndividualTherapyLog from '@renderer/pages/management/IndividualTherapyLog'

const tabData: { title: string; content: ReactNode }[] = [
  {
    title: '심리평가',
    content: <ManagementAssessmentLog />,
  },
  {
    title: '심리치료 (개인)',
    content: <IndividualTherapyLog />,
  },
  {
    title: '심리치료 (집단)',
    content: <ManagementAssessmentLog />,
  },
  {
    title: '학술활동',
    content: <ManagementAssessmentLog />,
  },
  {
    title: '연구활동',
    content: <ManagementAssessmentLog />,
  },
  {
    title: ' 기타 수련 활동',
    content: <ManagementAssessmentLog />,
  },
];

export default function MyTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full">
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="flex gap-x-2 border-b border-gray-200">
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

        <div className="mt-2">
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
