import { DefaultValue } from 'recoil'

type AtomOptions<T> = {
  key: string
  default: T
  effects?: any[]
  persistMode?: 'session' | 'local'
}

export default function persistAtom<T>({
  key,
  default: defaultValue,
  effects,
  persistMode,
}: AtomOptions<T>) {
  const storage = persistMode === 'local' ? localStorage : sessionStorage
  const item = storage.getItem(key)
  let storedValue: T | null

  if (item === null || item === 'undefined') {
    storedValue = defaultValue
  } else {
    storedValue = JSON.parse(item)
  }

  return {
    key,
    default: storedValue || defaultValue,
    effects: [
      ({ setSelf, onSet }: any) => {
        onSet((newValue: any) => {
          if (newValue instanceof DefaultValue) {
            storage.removeItem(key)
          } else if (newValue === undefined) {
            storage.setItem(key, 'undefined')
          } else {
            storage.setItem(key, JSON.stringify(newValue))
          }
        })
      },
      ...(effects || []),
    ],
  }
}
