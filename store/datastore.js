import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useDataStore = create(
    persist(
        (set, get) => ({
            data: [],
            courses: [],
            topics: [],
            add: (item) => {

                let data = get().data.slice(0)
                data.push(item)

                set({ data })

            },
            clear: () => set({ data: [] }),
            addCourse: (item) => {

                let courses = get().courses.slice(0)
                courses.push(item)

                set({ courses })

            },
            addTopics: (item) => {

                let topics = get().topics.slice(0)
                topics.push(item)

                set({ topics })

            }
        }),
        {
            name: "chatgpt-learning-data-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useDataStore