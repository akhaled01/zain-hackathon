export type ConvexResponse<T = any> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
      code?: string;
    };

export const createSuccessResponse = <T>(data: T): ConvexResponse<T> => ({
  success: true,
  data,
});

export const createErrorResponse = (
  error: string,
  code?: string
): ConvexResponse => ({
  success: false,
  error,
  code,
});

export const ErrorCodes = {
  ALREADY_EXISTS: "ALREADY_EXISTS",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  TEAM_FULL: "TEAM_FULL",
  ALREADY_SUBMITTED: "ALREADY_SUBMITTED",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;
