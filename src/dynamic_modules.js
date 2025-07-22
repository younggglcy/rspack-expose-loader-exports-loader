export const dynamicModules = {
  lame: () => import(/* webpackChunkName: "lamejs" */'lamejs/lame.min.js'),
}
