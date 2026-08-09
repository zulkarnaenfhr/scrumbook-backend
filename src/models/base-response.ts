import { SUCCESS_STATUS_SUCCESS_RESPONSE } from "../static/static-response-success-messages.js";

export interface BaseErrorMessageResponse {
	en: string;
	id: string;
}

export interface BaseErrorResponse {
	error_code: string;
	error_message: BaseErrorMessageResponse;
}

export interface BaseResponse<T> {
	error_schema: BaseErrorResponse;
	output_schema?: T;
}

export function successResponse<T>(data: T): BaseResponse<T> {
	return {
		error_schema: SUCCESS_STATUS_SUCCESS_RESPONSE,
		output_schema: data,
	};
}

export function errorResponse(errorCode: string, errorMessageEn: string, errorMessageId: string): BaseResponse<null> {
	return {
		error_schema: {
			error_code: errorCode,
			error_message: {
				en: errorMessageEn,
				id: errorMessageId,
			},
		},
	};
}
