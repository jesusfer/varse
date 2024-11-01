import hljs from 'highlight.js'
import { Check, Clipboard } from 'lucide-react'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import './CodeColors.css'

interface DocsCodeBlockProps extends PropsWithChildren {
  language?: string
}

export const DocsCodeBlock: React.FC<DocsCodeBlockProps> = ({
  children,
  language,
}) => {
  const codeRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (codeRef.current) {
      if (language) {
        hljs.highlightElement(codeRef.current)
      } else {
        hljs.highlightAuto(codeRef.current.textContent || '')
      }
    }
  }, [children, language])

  const handleCopy = async () => {
    if (codeRef.current?.textContent) {
      await navigator.clipboard.writeText(codeRef.current.textContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative">
      <pre className="bg-background overflow-x-auto rounded-[6px] p-2">
        <code
          ref={codeRef}
          className={`${
            language ? `language-${language}` : ''
          } text-xs leading-5 block !bg-transparent`}
        >
          {children}
        </code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded text-xs bg-panel-border hover:bg-panel-border-hover transition-colors"
      >
        {copied ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <Clipboard size={14} />
        )}
      </button>
    </div>
  )
}
