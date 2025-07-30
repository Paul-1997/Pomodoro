export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

export class PomodoroError extends Error {
  public code: string;

  public details?: any;

  public timestamp: number;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.name = 'PomodoroError';
    this.code = code;
    this.details = details;
    this.timestamp = Date.now();
  }
}

export const ErrorCodes = {
  TIMER_ERROR: 'TIMER_ERROR',
  STORAGE_ERROR: 'STORAGE_ERROR',
  AUDIO_ERROR: 'AUDIO_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export const createError = (code: keyof typeof ErrorCodes, message: string, details?: any): PomodoroError => {
  return new PomodoroError(ErrorCodes[code], message, details);
};

export const handleError = (error: unknown, context?: string): AppError => {
  let appError: AppError;

  if (error instanceof PomodoroError) {
    appError = {
      code: error.code,
      message: error.message,
      details: error.details,
      timestamp: error.timestamp,
    };
  } else if (error instanceof Error) {
    appError = {
      code: ErrorCodes.UNKNOWN_ERROR,
      message: error.message,
      details: { originalError: error.name, stack: error.stack },
      timestamp: Date.now(),
    };
  } else {
    appError = {
      code: ErrorCodes.UNKNOWN_ERROR,
      message: 'An unknown error occurred',
      details: error,
      timestamp: Date.now(),
    };
  }

  // Log error for debugging
  console.error(`[${context || 'App'}] Error:`, appError);

  // You can add more error handling logic here:
  // - Send to error tracking service
  // - Show user notification
  // - Save to local storage for debugging

  return appError;
};

export const showUserError = (error: AppError): void => {
  // Show user-friendly error message
  // This could be integrated with a toast notification system
  console.warn('User Error:', error.message);

  // Example: Show toast notification
  // toast.error(error.message);
};

export const isRecoverableError = (error: AppError): boolean => {
  const recoverableCodes = [ErrorCodes.TIMER_ERROR, ErrorCodes.AUDIO_ERROR, ErrorCodes.VALIDATION_ERROR];

  return recoverableCodes.includes(error.code as any);
};
