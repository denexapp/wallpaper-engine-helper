import { MessageKey } from '../localization';

const resolutionTypes = ['4K', '1440p', 'small', 'custom'] as const;

export type ResolutionType = typeof resolutionTypes[number];

type ResolutionTypeDescription = {
  messageId: MessageKey;
  postText: (width: number, height: number) => string | null;
  resolution: {
    width: number;
    height: number;
    exactResolution: boolean;
  };
};

export const resolutionTypeDescriptions: {
  [key in ResolutionType]: ResolutionTypeDescription;
} = {
  '4K': {
    messageId: 'resolutionType4K',
    postText: () => '4К',
    resolution: {
      width: 3840,
      height: 2160,
      exactResolution: true,
    },
  },
  '1440p': {
    messageId: 'resolutionType1440p',
    postText: () => '1440p',
    resolution: {
      width: 2560,
      height: 1440,
      exactResolution: true,
    },
  },
  small: {
    messageId: 'resolutionTypeSmall',
    postText: () => null,
    resolution: {
      width: 1920,
      height: 1080,
      exactResolution: false,
    },
  },
  custom: {
    messageId: 'resolutionTypeCustom',
    postText: (width, height) => `${width}x${height}`,
    resolution: {
      width: 3440,
      height: 1440,
      exactResolution: false,
    },
  },
};

export const getResolutionTypeFromResolution = (
  width: number,
  height: number
): ResolutionType => {
  const exactResolutionType = resolutionTypes.find((resolutionType) => {
    const {
      resolution: { exactResolution },
      resolution,
    } = resolutionTypeDescriptions[resolutionType];

    return (
      exactResolution &&
      width === resolution.width &&
      height === resolution.height
    );
  });

  if (exactResolutionType !== undefined) {
    return exactResolutionType;
  }

  const smallResolutionTypeDescription = resolutionTypeDescriptions.small;

  if (
    width <= smallResolutionTypeDescription.resolution.width &&
    height <= smallResolutionTypeDescription.resolution.height
  ) {
    return 'small';
  }

  return 'custom';
};
