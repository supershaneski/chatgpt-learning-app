import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useDataStore = create(
    persist(
        (set, get) => ({
            data: [],
            courses: [],
            topics: [],
            quiz: [],
            add: (item) => {

                let data = get().data.slice(0)
                data.push(item)

                set({ data })

            },
            getData: (id) => get().data.slice(0).filter((item) => item.gid === id),
            delete: (id) => {
                
                let data = get().data.slice(0).filter((item) => item.gid !== id)

                set({ data })
            },
            deleteOne: (id) => {
                
                let data = get().data.slice(0).filter((item) => item.id !== id)

                set({ data })
            },
            clear: () => set({ data: [] }),
            addQuiz: (item) => {

                let quiz = get().quiz.slice(0)
                quiz.push(item)

                set({ quiz })

            },
            getQuiz: (id) => get().quiz.slice(0).find((item) => item.id === id),
            addCourse: (item) => {

                let courses = get().courses.slice(0)
                courses.push(item)

                set({ courses })

            },
            editCourse: (id, item) => {

                let courses = get().courses.slice(0).map((course) => {
                    return {
                        ...course,
                        category: item.id === id ? item.category : course.category,
                        name: item.id === id ? item.name : course.name,
                        description: item.id === id ? item.description : course.description,
                    }
                })

                set({ courses })

            },
            getCourse: (id) => get().courses.slice(0).find((item) => item.id === id),
            addTopic: (item) => {

                let topics = get().topics.slice(0)
                topics.push(item)

                set({ topics })

            },
            editTopic: (id, item) => {

                let topics = get().topics.slice(0).map((topic) => {
                    return {
                        ...topic,
                        topic: topic.id === id ? item.topic : topic.topic,
                        subtopics: topic.id === id ? item.subtopics : topic.subtopics,
                    }
                })
                
                set({ topics })

            },
            getTopics: (id) => get().topics.slice(0).filter((item) => item.gid === id),
            getTopic: (id) => get().topics.slice(0).find((item) => item.id === id),
        }),
        {
            name: "chatgpt-learning-data-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useDataStore