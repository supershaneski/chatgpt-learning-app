import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useDataStore = create(
    persist(
        (set, get) => ({
            data: [],
            add: (item) => {

                let data = get().data.slice(0)
                data.push(item)

                set({ data })

            },
            clear: () => set({ data: [] }),
        }),
        {
            name: "chatgpt-learning-data-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useDataStore