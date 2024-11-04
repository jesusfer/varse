import TopBar from '../../Library/TopBar/TopBar'
import ShareButton from '../../Library/ShareButton/ShareButton'
import useLoadDashboard from '../../../hooks/actions/useLoadDashboard'
import Button from '../../Library/Button/Button'
import useKeyList from '../../../hooks/state/useApiKeyList'
import { useState } from 'react'
import { Copy, Eye } from 'lucide-react'
import { DocsCodeBlock } from './DocsCodeBlock/DocsCodeBlock'
import useNav from '../../../hooks/utils/useNav'
import useKeyCreate from '../../../hooks/actions/useKeyCreate'

const Onboarding: React.FC = () => {
  useLoadDashboard()

  const nav = useNav()
  const createKey = useKeyCreate()

  const [createdKey, setCreatedKey] = useState<boolean>(false)
  const [showKey, setShowKey] = useState<boolean>(false)
  const [codeTab, setCodeTab] = useState<'javascript' | 'tsx'>('javascript')

  const keyList = useKeyList()
  const key = keyList[0]

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <TopBar>
        <div></div>
        <ShareButton />
      </TopBar>
      <div className="w-full flex flex-col items-center justify-start overflow-auto">
        <div className="w-[1000px] p-16 gap-16 flex flex-col items-start justify-start">
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <h2 className="text-[28px] font-semibold text-text-1">
              Add a variable to your app
            </h2>
            <p className="text-[14px] text-text-2">
              Follow these steps to put a variable live in your app.
            </p>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2 border border-panel-border rounded-[6px] p-4">
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <h3 className="text-[20px] font-medium text-text-1">
                Create an API Key
              </h3>
              <p className="text-[14px] text-text-2">
                Use this to authenticate your app with the API.
              </p>
            </div>
            {!createdKey && (
              <Button
                variant="cta"
                onClick={async () => {
                  await createKey('prod_key')
                  setCreatedKey(true)
                }}
              >
                Create API Key
              </Button>
            )}
            {createdKey && key && (
              <div className="w-full h-[36px] flex gap-2 justify-between items-center">
                <p className="text-[14px] text-text-2">
                  {showKey ? key.key : '••••••••••••••••••••••••••••••••••'}
                </p>
                <div className="flex gap-2">
                  <div
                    className="w-4 h-4 flex-none text-text-2 hover:text-text-1 cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(key.key)}
                  >
                    <Copy size={16} />
                  </div>
                  <div
                    className="w-4 h-4 flex-none text-text-2 hover:text-text-1 cursor-pointer"
                    onClick={() => setShowKey(!showKey)}
                  >
                    <Eye size={16} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-4 border border-panel-border rounded-[6px] p-4">
            <div className="w-full flex flex-col items-start justify-start gap-1">
              <h3 className="text-[20px] font-medium text-text-1">
                Use a variable
              </h3>
              <p className="text-[14px] text-text-2">
                Add a variable to your app.
              </p>
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-2">
              <div className="w-full flex items-center justify-start gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCodeTab('javascript')}
                >
                  JavaScript
                </Button>
                <Button variant="outline" onClick={() => setCodeTab('tsx')}>
                  TSX
                </Button>
              </div>

              <div className="w-full rounded-[6px]">
                <DocsCodeBlock
                  key={`${key?.key}-${codeTab}`}
                  language={codeTab}
                >
                  {getExample(key?.key || '', codeTab)}
                </DocsCodeBlock>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-start">
            <Button variant="outline" onClick={() => nav('variable-list')}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding

function getExample(key: string, codeTab: 'javascript' | 'tsx') {
  switch (codeTab) {
    case 'javascript':
      return getJavascriptExample(key)
    case 'tsx':
      return getTsxExample(key)
  }
}

function getJavascriptExample(key: string) {
  return `import { VarseClient } from "varse-io";

const client = new VarseClient({
  apiKey: "${key}",
  baseUrl: "https://api.varse.io",
});

const value = await client.getBool("new_variable");`
}

function getTsxExample(key: string) {
  return `// App.tsx
import { VarseProvider } from 'varse-io-react'

const App: React.FC = () => {
  const varseOptions = {
    apiKey: "${key}",
    baseUrl: "https://api.varse.io",
  }

  return (
    <VarseProvider {...varseOptions}>
      <Component />
    </VarseProvider>
  )
}

// Component.tsx
import { useVarseBool } from 'varse-io-react'

const Component: React.FC = () => {
  const value = useVarseBool('new_variable')

  return <div>{value ? 'True' : 'False'}</div>
}
`
}
