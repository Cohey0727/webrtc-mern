"use client";
import React from "react";

type BaseErrorBoundaryProps = {
  fallback: (error: Error, reset: () => void) => React.ReactNode;
  refreshDependency?: any;
  children: React.ReactNode;
};

type BaseErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends React.Component<BaseErrorBoundaryProps, BaseErrorBoundaryState> {
  state: BaseErrorBoundaryState;

  constructor(props: BaseErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  componentDidUpdate(
    prevProps: Readonly<BaseErrorBoundaryProps>,
    prevState: Readonly<BaseErrorBoundaryState>,
  ): void {
    if (this.props.refreshDependency !== prevProps.refreshDependency && prevState.error !== null) {
      // URLの更新が画面の更新より先行するため、setTimeoutで遅延させる
      // refreshDependencyの値はなんでもよいが、URL更新用に特別対応
      setTimeout(() => this.setState({ error: null }), 100);
    }
  }

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (error) {
      return this.props.fallback(error, this.reset);
    }
    return this.props.children;
  }
}

export type { BaseErrorBoundaryProps, BaseErrorBoundaryState };
export default ErrorBoundary;
