import VK from 'vk-ts';

type State = {
  accessToken: string | null;
  vk: VK | null;
};

const state: State = {
  accessToken: null,
  vk: null,
};

export default state;
