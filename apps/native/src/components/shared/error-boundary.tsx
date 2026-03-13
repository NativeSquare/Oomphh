import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { Pressable, View } from "react-native";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info.componentStack);
  }

  private handleGoBack = () => {
    this.setState({ hasError: false });
    router.back();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View className="flex-1 bg-background items-center justify-center px-6 gap-4">
          <Text className="text-lg font-medium text-foreground">
            Something went wrong
          </Text>
          <Text className="text-sm text-muted-foreground text-center">
            An unexpected error occurred. Please try again.
          </Text>
          <Pressable
            onPress={this.handleGoBack}
            className="mt-2 bg-primary px-6 py-3 rounded-lg active:opacity-70"
          >
            <Text className="text-sm font-medium text-primary-foreground">
              Go Back
            </Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}
