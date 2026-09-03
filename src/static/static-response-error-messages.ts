export const ERR_STATUS_DATA_NOT_FOUND = {
	error_code: 'SCB400001',
	error_message: {
		en: 'Data Not Found',
		id: 'Data Tidak Ditemukan',
	},
};

export const ERR_STATUS_EMAIL_EXIST = {
	error_code: 'SCB400002',
	error_message: {
		en: 'Email Already Exists',
		id: 'Email Sudah Digunakan',
	},
};

export const ERR_STATUS_FIELD_REQUIRED_MISSING = {
	error_code: 'SCB400003',
	error_message: {
		en: 'Field Required Missing',
		id: 'Field yang Diperlukan tidak Ada',
	},
};

export const ERR_STATUS_DATA_EXIST = {
	error_code: 'SCB400004',
	error_message: {
		en: 'Data Already Exists',
		id: 'Data Sudah Digunakan',
	},
};

export const ERR_STATUS_ORGANIZATION_CONTEXT_MISSING = {
	error_code: 'SCB400005',
	error_message: {
		en: 'Organization Context Missing',
		id: 'Konteks Organisasi Tidak Ditemukan',
	},
};

// ================= error 401 =================
export const ERR_STATUS_INVALID_CREDENTIALS = {
	error_code: 'SCB401001',
	error_message: {
		en: 'Invalid email or password',
		id: 'Email atau password salah',
	},
};

export const ERR_STATUS_INVALID_REFRESH_TOKEN = {
	error_code: 'SCB401002',
	error_message: {
		en: 'Invalid or expired refresh token',
		id: 'Refresh token tidak valid atau kedaluwarsa',
	},
};

export const ERR_STATUS_UNAUTHORIZED = {
	error_code: 'SCB401003',
	error_message: {
		en: 'Unauthorized',
		id: 'Tidak Terautentikasi',
	},
};

// ================= error 403 =================
export const ERR_STATUS_FORBIDDEN = {
	error_code: 'SCB403001',
	error_message: {
		en: 'You do not have permission to perform this action',
		id: 'Anda tidak memiliki izin untuk melakukan aksi ini',
	},
};

// ================= error 500 =================
export const ERR_STATUS_INTERNAL_SERVER_ERROR = {
	error_code: 'SCB500001',
	error_message: {
		en: 'Internal Server Error',
		id: 'Terjadi Kesalahan Pada Server',
	},
};
