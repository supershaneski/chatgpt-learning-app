import AppHeader from './appheader'

export default {
  title: 'MyApp/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  argTypes: {
    //onConfirm: { action: 'onConfirm' },
    //onClose: { action: 'onClose' },
    //onStatus: { action: 'onStatus' },
  },
}

export const Primary = {
    args: {
      title: 'CS50 Introduction to Game Development',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
};
