/**
 * Tạo slug từ chuỗi
 * @param {string} str - Chuỗi gốc cần chuyển đổi
 * @param {string} [separator="-"] - Ký tự phân cách trong slug
 * @returns {string} - Chuỗi slug đã chuẩn hóa
 */
export function slug_generation(str: string, separator: string = "-"): string {
    str = str
        .toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d")
        .replace(/\s+/g, separator)
        .replace(/[^A-Za-z0-9_-]/g, "")
        .replace(/-+/g, separator);

    return str;
}

/**
 * Lấy ID từ slug
 * @param {string} slug - Chuỗi slug có dạng "ten-bai-viet-123456"
 * @returns {string|null} - ID hợp lệ hoặc null nếu không tìm thấy
 */
export function get_id(slug: string): string | null {
    const parts = slug.split('-');
    const id = parts.pop();
    if (id && /^\d+$/.test(id)) {
        return id;
    }
    return null;
}