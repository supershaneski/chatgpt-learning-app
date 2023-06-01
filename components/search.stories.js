import Search from './search'

export default {
  title: 'MyApp/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'onSearch' },
  },
}

export const Primary = {
  args: {},
}
