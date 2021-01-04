const vkAppId = process.env.vkAppId

if (vkAppId === undefined) {
  throw Error()
}

const environment = {
  vkAppId
}

export default environment
