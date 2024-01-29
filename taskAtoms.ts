import { atom } from "jotai";
import { Task } from './components/types/types'

const tasksInPrograss = atom<Task[]>([]);

export default tasksInPrograss