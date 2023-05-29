import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useDataStore = create(
    persist(
        (set, get) => ({
            data: [],
            courses: [],
            add: (item) => {

                let data = get().data.slice(0)
                data.push(item)

                set({ data })

            },
            clear: () => set({ data: [] }),
            addCourse: (item) => {

                let courses = get().course.slice(0)
                courses.push(item)

                set({ courses })

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