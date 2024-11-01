import { useContext, useState } from 'react'
import { VarseContext } from './provider'
import { VariableValue } from 'varse-io'

type UseVarseValueOptions = {
  key: string
  defaultValue?: VariableValue
}

const useVarseValue = ({
  key,
  defaultValue,
}: UseVarseValueOptions): VariableValue => {
  const [value, setValue] = useState<VariableValue>(defaultValue ?? '')

  const client = useContext(VarseContext)
  if (!client) {
    throw new Error('useVarseValue must be used within a VarseProvider')
  }

  client.getString(key).then(setValue)

  return value
}

type UseVarseBoolOptions = {
  key: string
  defaultValue?: boolean
}

const useVarseBool = ({ key, defaultValue }: UseVarseBoolOptions): boolean => {
  const [value, setValue] = useState<boolean>(defaultValue ?? false)

  const client = useContext(VarseContext)
  if (!client) {
    throw new Error('useVarseBool must be used within a VarseProvider')
  }

  client.getBool(key).then(setValue)

  return value
}

type UseVarseStringOptions = {
  key: string
  defaultValue?: string
}

const useVarseString = ({
  key,
  defaultValue,
}: UseVarseStringOptions): string => {
  const [value, setValue] = useState<string>(defaultValue ?? '')

  const client = useContext(VarseContext)
  if (!client) {
    throw new Error('useVarseString must be used within a VarseProvider')
  }

  client.getString(key).then(setValue)

  return value
}

type UseVarseNumberOptions = {
  key: string
  defaultValue?: number
}

const useVarseNumber = ({
  key,
  defaultValue,
}: UseVarseNumberOptions): number => {
  const [value, setValue] = useState<number>(defaultValue ?? 0)

  const client = useContext(VarseContext)
  if (!client) {
    throw new Error('useVarseNumber must be used within a VarseProvider')
  }

  client.getNumber(key).then(setValue)

  return value
}

export {
  UseVarseBoolOptions,
  UseVarseStringOptions,
  UseVarseNumberOptions,
  useVarseBool,
  useVarseValue,
  useVarseString,
  useVarseNumber,
}
