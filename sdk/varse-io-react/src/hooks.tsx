import { useContext, useState } from 'react'
import { VarseContext } from './provider'
import { VariableValue, VarseClient } from 'varse-io'

type _UseVarseValueOptions<T> = string | { key: string; defaultValue?: T }

const _useVarseValueTyped = <T,>(
  options: _UseVarseValueOptions<T>,
  _getFunction: (key: string, client: VarseClient) => Promise<T>,
  _fallback: T
): T => {
  const keyOnly = typeof options === 'string'
  const key = keyOnly ? options : options.key
  const fallback = keyOnly ? _fallback : options.defaultValue ?? _fallback

  const [value, setValue] = useState<T>(fallback)

  const client = useContext(VarseContext)
  if (!client) {
    throw new Error('useVarseValue hooks must be used within a VarseProvider')
  }

  _getFunction(key, client).then((value) => setValue(value))

  return value
}

type UseVarseValueOptions = _UseVarseValueOptions<VariableValue>
const useVarseValue = (options: UseVarseValueOptions) =>
  _useVarseValueTyped<VariableValue>(
    options,
    (key, client) => client.get(key),
    ''
  )

type UseVarseBoolOptions = _UseVarseValueOptions<boolean>
const useVarseBool = (options: UseVarseBoolOptions) =>
  _useVarseValueTyped<boolean>(
    options,
    (key, client) => client.getBool(key),
    false
  )

type UseVarseStringOptions = _UseVarseValueOptions<string>
const useVarseString = (options: UseVarseStringOptions) =>
  _useVarseValueTyped<string>(
    options,
    (key, client) => client.getString(key),
    ''
  )

type UseVarseNumberOptions = _UseVarseValueOptions<number>
const useVarseNumber = (options: UseVarseNumberOptions) =>
  _useVarseValueTyped<number>(
    options,
    (key, client) => client.getNumber(key),
    0
  )

export {
  UseVarseBoolOptions,
  useVarseBool,
  UseVarseValueOptions,
  useVarseValue,
  UseVarseStringOptions,
  useVarseString,
  UseVarseNumberOptions,
  useVarseNumber,
}
