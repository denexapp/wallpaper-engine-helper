import FormData from 'form-data';
import fetch from 'node-fetch';
import { JsonDecoder } from 'ts.data.json';

interface PublishedFileDetails {
  publishedfileid: string;
  title: string;
}

interface GetPublishedFileDetailsResponse {
  response: {
    publishedfiledetails: Array<PublishedFileDetails>;
  };
}

const publishedFileDetailsDecoder = JsonDecoder.object<PublishedFileDetails>(
  {
    publishedfileid: JsonDecoder.string,
    title: JsonDecoder.string,
  },
  'PublishedFileDetails'
);

const getPublishedFileDetailsResponseDecoder = JsonDecoder.object<GetPublishedFileDetailsResponse>(
  {
    response: JsonDecoder.object(
      {
        publishedfiledetails: JsonDecoder.array(
          publishedFileDetailsDecoder,
          'publishedfiledetails'
        ),
      },
      'response'
    ),
  },
  'GetPublishedFileDetailsResponse'
);

// eslint-disable-next-line import/prefer-default-export
export const getPublishedFileDetails = async (
  id: number
): Promise<PublishedFileDetails> => {
  const formData = new FormData();
  formData.append('itemcount', '1');
  formData.append('publishedfileids[0]', id.toString(10));

  const response = await fetch(
    `https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1`,
    {
      method: 'POST',
      body: formData,
    }
  );

  let json: unknown;
  try {
    json = await response.json();
  } catch (error) {
    throw new Error();
  }
  const result = await getPublishedFileDetailsResponseDecoder.decodePromise(
    json
  );
  return result.response.publishedfiledetails[0];
};
