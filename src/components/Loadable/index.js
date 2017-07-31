/**
 * 将异步包装为异步加载组件
 * @export
 */
export default function Loadable(loaderFun, option) {
  return () => ({
    component: loaderFun(),
    ...option,
  });
}
