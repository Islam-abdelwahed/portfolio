// src/components/LoadingOverlay.tsx
import React from 'react'

interface LoadingOverlayProps {
  isLoading: boolean
  error?: string | null
  onRetry?: () => void
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, error, onRetry }) => {
  if (!isLoading && !error) return null

  return (
    <div className="loading-overlay">
      <div className="loading-overlay__content">
        {error ? (
          <>
            <div className="loading-overlay__error-icon">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h2 className="loading-overlay__error-title">Connection Error</h2>
            <p className="loading-overlay__error-message">{error}</p>
            {onRetry && (
              <button className="loading-overlay__retry-btn" onClick={onRetry}>
                <i className="fas fa-redo-alt"></i>
                Retry
              </button>
            )}
            <p className="loading-overlay__fallback-note">
              Don't worry! We're showing cached content while trying to reconnect.
            </p>
          </>
        ) : (
          <>
            <div className="loading-spinner">
              <div className="loading-spinner__circle"></div>
              <div className="loading-spinner__circle"></div>
              <div className="loading-spinner__circle"></div>
            </div>
            <p className="loading-overlay__text">Loading amazing content...</p>
          </>
        )}
      </div>
    </div>
  )
}

export default LoadingOverlay
