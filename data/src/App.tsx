import { useState } from 'react'
import TabNav from './components/TabNav'
import TableView from './components/TableView'
import ClientsView from './components/ClientsView'
import LeadsView from './components/LeadsView'
import ApplicantsView from './components/ApplicantsView'
import VendorsView from './components/VendorsView'
import RecordView from './components/RecordView'
import InvoicesView from './components/InvoicesView'

type Tab = 'companies' | 'people' | 'clients' | 'leads' | 'applicants' | 'vendors' | 'invoices'

interface RecordSelection {
  table: Tab
  id: number
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('companies')
  const [selectedRecord, setSelectedRecord] = useState<RecordSelection | null>(null)

  const handleRecordClick = (table: Tab, id: number) => {
    setSelectedRecord({ table, id })
  }

  const handleBack = () => {
    setSelectedRecord(null)
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setSelectedRecord(null)
  }

  return (
    <div className="min-h-screen bg-snow">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <svg width="99" height="27" viewBox="0 0 99 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-graphite">
            <path d="M9.48 21L9.51 20.37L18.21 0H21.54V0.630001L12.84 21H9.48ZM0 21V0H3.45V21H0ZM9.51 21L0.78 0.630001V0H4.14L12.84 20.37V21H9.51ZM18.87 21V0H22.32V21H18.87Z" fill="currentColor"/>
            <path d="M30.2058 21.45C29.1658 21.45 28.2358 21.25 27.4158 20.85C26.6158 20.45 25.9858 19.89 25.5258 19.17C25.0658 18.45 24.8358 17.63 24.8358 16.71C24.8358 15.29 25.3258 14.16 26.3058 13.32C27.2858 12.46 28.6958 11.96 30.5358 11.82L36.4158 11.34V14.19L31.0458 14.64C30.0858 14.72 29.3958 14.92 28.9758 15.24C28.5558 15.56 28.3458 15.99 28.3458 16.53C28.3458 17.07 28.5858 17.51 29.0658 17.85C29.5458 18.19 30.1558 18.36 30.8958 18.36C31.6758 18.36 32.3758 18.17 32.9958 17.79C33.6358 17.39 34.1458 16.88 34.5258 16.26C34.9058 15.64 35.0958 14.97 35.0958 14.25V11.76C35.0958 10.8 34.7758 10.01 34.1358 9.39C33.4958 8.75 32.6558 8.43 31.6158 8.43C30.7358 8.43 30.0058 8.65 29.4258 9.09C28.8658 9.51 28.5058 10.04 28.3458 10.68H28.0158L25.0758 9.96C25.4358 8.6 26.1858 7.5 27.3258 6.66C28.4858 5.82 29.9258 5.4 31.6458 5.4C33.7858 5.4 35.4558 6.02 36.6558 7.26C37.8558 8.48 38.4558 10.21 38.4558 12.45V21H35.3958V16.59L36.6258 16.77C36.3858 17.63 35.9558 18.42 35.3358 19.14C34.7158 19.84 33.9658 20.4 33.0858 20.82C32.2258 21.24 31.2658 21.45 30.2058 21.45Z" fill="currentColor"/>
            <path d="M46.5548 27C44.5148 27 42.9148 26.6 41.7548 25.8C40.5948 25.02 40.0148 23.93 40.0148 22.53C40.0148 21.63 40.2548 20.84 40.7348 20.16C41.2348 19.48 41.9448 18.95 42.8648 18.57L44.5448 20.01C44.1248 20.19 43.7948 20.46 43.5548 20.82C43.3348 21.18 43.2248 21.57 43.2248 21.99C43.2248 22.57 43.4448 23.08 43.8848 23.52C44.3448 23.96 45.0848 24.18 46.1048 24.18H48.2048C49.2848 24.18 50.0948 24.02 50.6348 23.7C51.1748 23.4 51.4448 22.95 51.4448 22.35C51.4448 21.87 51.2448 21.5 50.8448 21.24C50.4648 20.98 49.9348 20.85 49.2548 20.85H45.5048C44.6248 20.85 43.8348 20.7 43.1348 20.4C42.4548 20.1 41.9148 19.69 41.5148 19.17C41.1148 18.63 40.9148 18.02 40.9148 17.34C40.9148 16.58 41.1448 15.91 41.6048 15.33C42.0848 14.73 42.7648 14.25 43.6448 13.89L45.5048 15.39C45.0248 15.43 44.6548 15.6 44.3948 15.9C44.1348 16.18 44.0048 16.48 44.0048 16.8C44.0048 17.2 44.1648 17.52 44.4848 17.76C44.8048 17.98 45.2948 18.09 45.9548 18.09H49.6148C51.1348 18.09 52.3448 18.47 53.2448 19.23C54.1648 19.99 54.6248 21 54.6248 22.26C54.6248 23.7 54.0448 24.85 52.8848 25.71C51.7248 26.57 50.1548 27 48.1748 27H46.5548ZM47.4548 16.17C46.2148 16.17 45.1248 15.94 44.1848 15.48C43.2448 15.02 42.5048 14.39 41.9648 13.59C41.4448 12.77 41.1848 11.83 41.1848 10.77C41.1848 9.71 41.4448 8.78 41.9648 7.98C42.5048 7.18 43.2448 6.55 44.1848 6.09C45.1248 5.63 46.2148 5.4 47.4548 5.4C48.6948 5.4 49.7748 5.63 50.6948 6.09C51.6348 6.55 52.3648 7.18 52.8848 7.98C53.4248 8.78 53.6948 9.71 53.6948 10.77C53.6948 11.83 53.4248 12.77 52.8848 13.59C52.3648 14.39 51.6348 15.02 50.6948 15.48C49.7748 15.94 48.6948 16.17 47.4548 16.17ZM47.4548 13.41C48.3548 13.41 49.0848 13.17 49.6448 12.69C50.2048 12.19 50.4848 11.55 50.4848 10.77C50.4848 9.99 50.2048 9.36 49.6448 8.88C49.0848 8.4 48.3548 8.16 47.4548 8.16C46.5348 8.16 45.7948 8.4 45.2348 8.88C44.6948 9.36 44.4248 9.99 44.4248 10.77C44.4248 11.55 44.6948 12.19 45.2348 12.69C45.7948 13.17 46.5348 13.41 47.4548 13.41ZM51.8348 8.07L49.6748 7.02C49.6748 6.14 49.8448 5.36 50.1848 4.68C50.5248 4 50.9848 3.47 51.5648 3.09C52.1648 2.69 52.8348 2.49 53.5748 2.49C53.7948 2.49 54.0048 2.5 54.2048 2.52C54.4048 2.52 54.5548 2.54 54.6548 2.58V5.49L54.5048 5.79C54.3048 5.73 54.0548 5.7 53.7548 5.7C53.1148 5.7 52.6348 5.92 52.3148 6.36C51.9948 6.8 51.8348 7.37 51.8348 8.07Z" fill="currentColor"/>
            <path d="M56.4352 21V5.85H59.6752V9.72L58.8052 9.66C59.1252 8.78 59.5852 8.03 60.1852 7.41C60.7852 6.77 61.4852 6.28 62.2852 5.94C63.0852 5.58 63.9552 5.4 64.8952 5.4C65.9752 5.4 66.9452 5.64 67.8052 6.12C68.6852 6.58 69.3752 7.27 69.8752 8.19C70.3952 9.09 70.6552 10.22 70.6552 11.58V21H67.2052V12.63C67.2052 11.67 67.0752 10.89 66.8152 10.29C66.5552 9.69 66.1752 9.25 65.6752 8.97C65.1952 8.69 64.6352 8.55 63.9952 8.55C63.3952 8.55 62.7752 8.7 62.1352 9C61.5152 9.3 60.9852 9.8 60.5452 10.5C60.1052 11.2 59.8852 12.15 59.8852 13.35V21H56.4352Z" fill="currentColor"/>
            <path d="M80.7262 21.45C79.1862 21.45 77.8262 21.11 76.6462 20.43C75.4862 19.75 74.5762 18.81 73.9162 17.61C73.2562 16.41 72.9262 15.01 72.9262 13.41C72.9262 11.83 73.2462 10.44 73.8862 9.24C74.5462 8.02 75.4463 7.08 76.5863 6.42C77.7463 5.74 79.0762 5.4 80.5762 5.4C82.0762 5.4 83.3762 5.75 84.4762 6.45C85.5962 7.13 86.4663 8.09 87.0863 9.33C87.7263 10.57 88.0462 12.02 88.0462 13.68V14.25L87.5963 14.7H74.5462V11.82H86.4863L84.6562 12.51C84.6362 11.67 84.4363 10.95 84.0563 10.35C83.6963 9.73 83.2162 9.26 82.6162 8.94C82.0362 8.6 81.3762 8.43 80.6362 8.43C79.8362 8.43 79.1063 8.62 78.4463 9C77.7863 9.36 77.2763 9.87 76.9163 10.53C76.5563 11.17 76.3763 11.92 76.3763 12.78V13.98C76.3763 14.8 76.5663 15.55 76.9463 16.23C77.3463 16.89 77.8762 17.42 78.5362 17.82C79.1962 18.22 79.9262 18.42 80.7262 18.42C81.4862 18.42 82.1762 18.22 82.7962 17.82C83.4362 17.4 83.9362 16.84 84.2962 16.14H84.6562L87.4463 17.34C86.8463 18.64 85.9562 19.65 84.7762 20.37C83.6162 21.09 82.2662 21.45 80.7262 21.45Z" fill="currentColor"/>
            <path d="M96.0448 21C94.5648 21 93.3848 20.54 92.5048 19.62C91.6248 18.68 91.1848 17.42 91.1848 15.84V1.92H94.6348V15.48C94.6348 16.28 94.8348 16.88 95.2348 17.28C95.6548 17.68 96.2548 17.88 97.0348 17.88H98.5948L98.7448 18.21V21H96.0448ZM88.6048 8.94V5.85H98.7448V8.94H88.6048Z" fill="currentColor"/>
          </svg>
          <nav className="flex items-center gap-6">
            <a 
              href="http://localhost:3000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-graphite hover:text-oxblood transition-colors"
            >
              Website
            </a>
            <a 
              href="http://localhost:3333" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-graphite hover:text-oxblood transition-colors"
            >
              Studio
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {selectedRecord ? (
          <RecordView
            table={selectedRecord.table}
            recordId={selectedRecord.id}
            onBack={handleBack}
            onNavigate={handleRecordClick}
          />
        ) : (
          <>
            <TabNav activeTab={activeTab} onTabChange={handleTabChange} />
            {activeTab === 'invoices' ? (
              <InvoicesView onRecordClick={(id) => handleRecordClick('invoices', id)} />
            ) : activeTab === 'clients' ? (
              <ClientsView 
                key={activeTab}
                onRecordClick={(id) => handleRecordClick('clients', id)}
              />
            ) : activeTab === 'leads' ? (
              <LeadsView 
                key={activeTab}
                onRecordClick={(id) => handleRecordClick('leads', id)}
              />
            ) : activeTab === 'applicants' ? (
              <ApplicantsView 
                key={activeTab}
                onRecordClick={(id) => handleRecordClick('applicants', id)}
              />
            ) : activeTab === 'vendors' ? (
              <VendorsView 
                key={activeTab}
                onRecordClick={(id) => handleRecordClick('vendors', id)}
              />
            ) : (
              <TableView 
                table={activeTab} 
                key={activeTab} 
                onRecordClick={(id) => handleRecordClick(activeTab, id)}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}
