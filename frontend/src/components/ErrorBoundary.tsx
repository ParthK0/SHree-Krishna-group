import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, PhoneCall } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React tree:', error, errorInfo);
    this.setState({ errorInfo });

    // Handle ChunkLoadError caused by stale deployment assets
    const isChunkError =
      error.name === 'ChunkLoadError' ||
      /Loading chunk [\d]+ failed/i.test(error.message) ||
      /Failed to fetch dynamically imported module/i.test(error.message);

    if (isChunkError) {
      const storageKey = 'skg_chunk_reload_retry';
      const hasReloaded = sessionStorage.getItem(storageKey);
      if (!hasReloaded) {
        sessionStorage.setItem(storageKey, 'true');
        window.location.reload();
      }
    }
  }

  private handleReset = () => {
    sessionStorage.removeItem('skg_chunk_reload_retry');
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    sessionStorage.removeItem('skg_chunk_reload_retry');
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;

      return (
        <div className="min-h-screen bg-[#ECE6DD] text-[#1a1f1b] flex items-center justify-center p-4 sm:p-6 font-['Inter']">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-8 text-center animate-in fade-in zoom-in-95 duration-300">
            {/* Warning Icon Badge */}
            <div className="w-16 h-16 bg-amber-100 text-[#D97706] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
              <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mb-6 leading-relaxed">
              We ran into an unexpected issue rendering this page. You can try refreshing or returning to our homepage.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2D5A27] text-white font-medium hover:bg-[#23481f] transition shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 text-stone-800 font-medium hover:bg-stone-200 transition border border-stone-300 active:scale-98 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Return Home
              </button>
            </div>

            {/* Direct Support Contact */}
            <div className="border-t border-stone-100 pt-4 text-xs text-stone-500 flex items-center justify-center gap-2">
              <span>Need immediate fleet dispatch?</span>
              <a
                href="tel:+919828038575"
                className="inline-flex items-center gap-1 font-semibold text-[#2D5A27] hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Call +91 98280 38575
              </a>
            </div>

            {/* Technical Dev Info */}
            {isDev && this.state.error && (
              <details className="mt-6 text-left border border-red-200 bg-red-50/70 rounded-lg p-3 text-xs">
                <summary className="cursor-pointer font-mono font-medium text-red-700 select-none">
                  Technical Details (Visible in Dev Mode)
                </summary>
                <div className="mt-2 text-red-900 font-mono overflow-auto max-h-48 whitespace-pre-wrap">
                  <p className="font-bold">{this.state.error.toString()}</p>
                  {this.state.errorInfo?.componentStack && (
                    <p className="mt-1 text-stone-600 text-[11px]">
                      {this.state.errorInfo.componentStack}
                    </p>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
