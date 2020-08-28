import { KeyedData } from 'global/models/KeyedData.model';
import { useState } from 'react';

export function useTrackedState<T extends KeyedData>(initialValue?: T) {
  const [originalValues, setOriginalValue] = useState(initialValue)
  const [currentValues, setCurrentValue] = useState(initialValue)

  const getChanges = (): Changes<T> => {
    let changes: Changes<T>
    const originalKeys = Object.keys(originalValues)
    for (let currentKey of Object.keys(currentValues)) {
      const currentValue = currentValues[currentKey]
      const currentJSON = JSON.stringify(currentValue)
      if (originalKeys.includes(currentKey)) {
        const originalJSON = JSON.stringify(originalValues[currentKey])
        if (currentJSON === originalJSON)
          changes = { ...changes, unchanged: { ...changes.unchanged, currentValue } }
        else
          changes = { ...changes, changed: { ...changes.changed, currentValue } }
      }
    }
    return changes
  }

  const setOriginal = (value: T, shouldSetCurrent = true): void => {
    setOriginalValue(value)
    if (shouldSetCurrent) setCurrentValue(value)
  }

  let returnArray
    : [T, (T) => void, () => Changes<T>, (T) => void]
    = [currentValues, setCurrentValue, getChanges, setOriginal]
  return returnArray
}

export type Changes<T extends KeyedData> = {
  unchanged?: T,
  changed?: T,
  deleted?: T,
  created?: T
  // for current of currents
  // 
}

// export type Change<T> = {
//   [id: string]: {
//     original: T,
//     current: T
//   }
// }