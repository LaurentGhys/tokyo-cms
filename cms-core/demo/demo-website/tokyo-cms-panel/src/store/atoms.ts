import { atom } from 'recoil'

export const labelsState = atom({
    key: 'labelsState',
    default: []
})

export const originalLabelsState = atom({
    key: 'originalLabelsState',
    default: []
})