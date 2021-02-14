const { vkAppId } = process.env;

if (vkAppId === undefined) {
  throw Error();
}

const environment = {
  vkAppId,
};

export default environment;
