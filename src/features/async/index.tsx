import { AsyncStatus } from "../../app/interface";

export interface AsyncWrapperProps {
  shouldInitialize: boolean;
  status: AsyncStatus;
  asyncAction: Function;
  children: JSX.Element;
}
export const AsyncWrapper = (props: AsyncWrapperProps) => {
  if (props.shouldInitialize && props.status === AsyncStatus.NONE) {
    props.asyncAction();
    return <Loading />
  }

  if (props.status === AsyncStatus.LOADING) {
    return <Loading />
  }

  if (props.status === AsyncStatus.FAILED) {
    return <LoadingError />
  }

  return props.children;
}

export const Loading = () => {
  return <h1>Loading ...</h1>
}

export const LoadingError = () => {
  return <h1>Whoops! We had an error when trying to load this page.</h1>
}